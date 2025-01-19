import CComplex from './CComplex';
import Mandelbrot from './mandelbrot';
import GridAdapterService from 'calc-utils/models/grid-adapter-service';

export default class Ganeshabrot extends Mandelbrot {
	constructor() {
		super();
		this.grid = null;
		this.gridAdapter = new GridAdapterService();
		this.w = 0;
		this.h = 0;
		this.derivativeCalculation = false;
	}
	setParameters(params) {
		this.params = params;
		this.derivativeCalculation = (this.params.method == 18 || this.params.method == 19);
		this.params.setC0();
	}
	initGrid(w, h) {
		this.gridAdapter.setSize(w, h);
		this.gridAdapter.setLimits(w, h);
		this.gridAdapter.initPtsMem(32);
	}
	getPts(pts) {
		const ptsOut = [];
		for (let j = 0; j < pts.length; j++) {
			const iterationsPts = this.handlePt(pts[j]);
			if (iterationsPts && iterationsPts.length > 0) {
				for (let j = 0; j < iterationsPts.length; j++) {
					if (iterationsPts[j]) {
						ptsOut.push(iterationsPts[j]);
					}
				}
			}
		}
		return ptsOut;
	}
	handlePt(pt) {
		return (this.params.ifsParams.mode > 0) ?
			this.getIfsPts(pt) :
			this.getIterationsPts(pt);
	}
	getIfsPts(pt) {
		let z = (this.params.ifsParams.mode === 1) ? new CComplex(0, 0, 0) : new CComplex(pt[1], pt[0], this.params.z0);

		const i = this.getIFSn(pt[1], pt[0], this.params.z0);
		return this.setIterationsPts(z, i, this.iterationsPts, pt);
	}
	getIterationsPts(pt) {
		this.initResults();
		let i = 0;
		this.it = 0;
		const pts = [];

		let z = this.params.zFromOrigin ? new CComplex(0, 0, 0) : new CComplex(pt[1], pt[0], this.params.z0);

		const c = (this.params.c0 === null) ? new CComplex(pt[1], pt[0], this.params.z0) : this.params.c0;

		const maxIterations = this.params.maxIterations;
		const target = this.params.target;

		let dZ = (this.derivativeCalculation) ? new CComplex(1, 0) : null;

		do {
			z = this.fZ(z, c, i);
			this.setMinLp(z);
			if (this.derivativeCalculation) dZ = this.derivativeZ(z, c, i).mul(dZ);
			this.addIterationPt(z, i, pts);
			i++;
		}
		while (this.setResult(z.squaresSum()) < target && i < maxIterations);

		this.saveZ(z);

		return this.setIterationsPts(z, i, pts, pt);
	}
	addIterationPt(z, i, pts) {
		if (z) {
			pts.push([z.i, z.r, 0, null, this.getIterationValue(z, i)]);
		}
		return pts;
	}
	setIterationsPts(z, i, pts, pt) {
		if (z === null) {
			return pts;
		}

		switch (this.params.selectMode) {
			case 1:
				pts = [];
				if (i <= this.params.maxIterations) {
					pts.push([pt[0], pt[1], 0, null, this.getIterationValue(z, i)]);
				}
				return pts;
			case 4:
				// inner
				if (i === this.params.maxIterations) {
					pts.push([pt[0], pt[1], 0, null, this.getIterationValue(z, i)]);
					return pts;
				}
				break;
			case 5:
				if ((z.squaresSum() < this.params.target && i >= this.params.minIterations) || i >= this.maxIterations) {
					// return pts when final iteration number reaches max iterations
					return pts;
				}
				break;
			case 6:
				// buddhabrot
				if (i >= this.params.minIterations && i < this.params.maxIterations) {
					pts.push([pt[0], pt[1], 0, null, this.getIterationValue(z, i)]);
					return pts;
				}
				break;
			case 7:
				// buddhabrot variation with mid target
				if (z.squaresSum() > (this.params.target - 2) && i >= this.params.minIterations) {
					return pts;
				}
				break;
			case 9:
				if (i < this.params.maxIterations) {
					// push initial point (mandelbrot point)
					pts.push([pt[0], pt[1], 0, this.colorsService.hslToRgb([
						this.params.drColor[0],
						this.params.drColor[1],
						this.params.drColor[2] + i * 5
					]), i]);
					// return iteration points
					return pts;
				} else {
					return pts;
				}
			case 10:
				if (i >= this.params.minIterations) {
					// push initial point (mandelbrot point)
					pts.push([pt[0], pt[1], 0, this.getIterationValue(new CComplex(pt[0], pt[1]), i)
						, i]);
					return pts;
				}
				break;
			default:
				// case 3, 8
				if (i >= this.params.minIterations) {
					pts.push([pt[0], pt[1], 0, null, this.getIterationValue(z, i)]);
					return pts;
				}
				break;
		}

		return null;
	}
	getIterationValue(z, i) {
		switch (this.params.method) {
			case 1:
				return i;
			case 2:
				return i === 0 ? 0 : Math.log(i);
			case 3:
				return 1 / i * 100;
			case 4:
				return i === 0 ? 0 : Math.sin(Math.log(i)) + 1;
			case 5:
				return i % 2 === 0 ? 0 : 10;
			case 7:
				return 1;
			case 9:
				return Math.tan(i);
			case 11:
				return z.getMagnitude();
			case 12:
				return Math.abs(z.getArgument());
			case 14:
				return z.squaresSum();
			case 17:
				return Math.abs(z.getArgument()) * z.squaresSum();
			case 18:
				return this.getV(18, i);
			case 19:
				return Math.floor(Math.random() * i);
			case 20:
				return (Math.abs(Math.sin(z.squaresSum() * Math.PI)));
			case 21:
				return Math.log(Math.abs(z.getArgument()));
			case 22:
				return Math.log(z.squaresSum());
			case 23:
				return Math.sin(Math.log(i)) + 1;
			case 26:
				return this.colorsService.lerpForPoint(z.r, z.i + i / 10, 0.1);
			case 32:
				return this.getV(32, i);
			default:
				return 1;
		}
	}
	addSymetricPoints(pts) {
		if (this.params.xSymetry) {
			let ptsSymetric = [];
			for (let index = 0; index < pts.length; index++) {
				if (pts[index][0] >= 0 && pts[index][1] >= 0) {

					const ptSymetric = this.gridAdapter.getXSymetricPoint(pts[index]);
					if (ptSymetric) {
						ptSymetric[4] = pts[index][4];
						ptSymetric[3] = pts[index][3];
						ptsSymetric.push(ptSymetric);
						if (pts[index][3]) {
							this.gridAdapter.incrementInGrid(ptSymetric, -1);
						} else {
							this.gridAdapter.incrementInGrid(ptSymetric, pts[index][4] * 1000);
						}
					}
				}
			}

			for (let index = 0; index < ptsSymetric.length; index++) {
				pts.push(ptsSymetric[index]);
			}
		}
		return pts;
	}
	handleIterationsPoints(ptsIn) {
		const pts = [];
		for (let index = 0; index < ptsIn.length; index++) {
			if (ptsIn[index][0] >= 0 && ptsIn[index][1] >= 0) {
				if (ptsIn[index][3]) {
					this.gridAdapter.incrementInGrid(ptsIn[index], -1);
				} else {
					this.gridAdapter.incrementInGrid(ptsIn[index], ptsIn[index][4] * 1000);
				}
			}
		}

		this.addSymetricPoints(ptsIn);

		for (let index = 0; index < ptsIn.length; index++) {
			if (ptsIn[index][0] > 0 && ptsIn[index][1] > 0) {
				if (ptsIn[index][3]) {
					pts.push(ptsIn[index]);
				} else {
					// get occurrence of point
					const o = this.gridAdapter.getValueInGrid(ptsIn[index]) / 1000;
					const colorPt = this.getColor(o, this.params.minOccurrences, this.params.maxOccurrences, (this.params.selectMode === 3 || this.params.selectMode === 8) ? 0 : 100);
					if (colorPt) {
						ptsIn[index][3] = colorPt;
						ptsIn[index][4] = o;
						pts.push(ptsIn[index]);
					}
				}
			}
		}
		return pts;
	}
	getColor(o, min, max, minLog) {
		if (o > min && o < max) {
			const l = (o < minLog) ? o / 10 : Math.log10(o);
			return this.colorsService.hslToRgb([
				this.params.drColor[0] + l * this.params.drColor[4],
				this.params.drColor[1] + l * this.params.drColor[5],
				this.params.drColor[2] + l * this.params.drColor[6]
			]);
		}
		return null;
	}
}
