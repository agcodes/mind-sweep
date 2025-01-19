import FractalProcess from './fractal-process';
import MandelbrotParameters from "./mandelbrot-parameters";
import Mandelbrot from './mandelbrot';

export default class NewtonFractalProcess extends FractalProcess {
	constructor() {
		super();
		this._jobs = [];
		this._jobsInProgress = 0;
		this._nbWorkers = 3;
		this.dataParams = [];
		this.canvasService = null;
	}
	setData(dataParams) {
		this.dataParams = dataParams;
		const that = this;
		this._jobs = [];
		for (let i = 0; i < this._nbWorkers; i++) {
			this._jobs[i] = { 'worker': new Worker('assets/js/newton-fractal-worker.bundle.js', { type: "module" }), 'status': 0, 'params': null };
			this._jobs[i].worker.addEventListener('message', function (e) {
				that.jobHandler(e);
			}, false);
		}
	}
	defGrid() {
		this.gridAdapter.defParameters(this.params.getInterval(), [0, 0]);
	}
	getPts() {
		const pts = [];
		const nb = (this.params.ifsParams && this.params.ifsParams.mode > 0) ? 10000 : 10000;
		for (let index = 0; index < nb; index++) {
			const ptCanvas = this.gridAdapter.getNewPoint(0);
			if (ptCanvas != null) {
				const pt = this.gridAdapter.getPointFromPlan(ptCanvas, false, 10);
				const newtonPt = this.fractal.getPt(pt[0], pt[1], 0, 0, false);
				if (newtonPt != null) {
					pts.push([
						ptCanvas[0],
						ptCanvas[1],
						newtonPt[2],
						newtonPt[3],
						newtonPt[4]
					]);
				}
			}
		}
		//this.getPtsWithWorker();
		return pts;
	}
	getPtsWithWorker() {
		if (this._jobsInProgress < 1) {
			// Prepare workers
			for (let i = 0; i < this._nbWorkers; i++) {
				const pts = [];
				const ptsCanvas = [];
				const nb = (this.params.ifsParams && this.params.ifsParams.mode > 0) ? 2000 : 10000;
				for (let index = 0; index < nb; index++) {
					// get new point in canvas
					const ptCanvas = this.gridAdapter.getNewPoint(0);
					const pt = this.gridAdapter.getPointFromPlan(ptCanvas, false, 10);
					if (ptCanvas != null) {
						ptsCanvas.push(ptCanvas);
						pts.push(pt);
					}
				}
				this._jobs[i].ptsCanvas = ptsCanvas;
				this._jobs[i].params = {
					'pts': pts,
					'ptsCanvas': ptsCanvas,
					'i': i,
					'data': this.dataParams
				};

				this._jobsInProgress++;
				this._jobs[i].worker.postMessage(this._jobs[i].params);
			}
		}
	}
	jobHandler(e) {
		const results = JSON.parse(e.data);
		if (results) {
			for (let index = 0; index < results.length; index++) {
				if (results[index] && results[index][5]) {
					const i = results[index][4];
					const v = results[index][5];
					const color = this.params.getDrColor(i, v, v, v, v, v);
					results[index][3] = color;
				}
			}

			if (results.length > 0) {
				this.canvasService.processCanvas.addPointsInData(results, null, 1);
			}
		}
		this._jobsInProgress--;
	}
	getPts_() {

	}
}