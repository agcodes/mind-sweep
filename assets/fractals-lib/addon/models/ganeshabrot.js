import Complex from './Complex';
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
		return pts.flatMap(pt => {
			const iterationsPts = this.handlePt(pt);
			return iterationsPts ? iterationsPts.filter(Boolean) : [];
		});
	}
	handlePt(pt) {
		return (this.params.ifsParams.mode > 0) ?
			this.getIfsPts(pt) :
			this.getIterationsPts(pt);
	}
	getIterationsPts(pt) {
		this.initResults();
		let i = 0;
		this.it = 0;
		const pts = [];

		let z = this.params.zFromOrigin ? new Complex(0, 0, 0) : new Complex(pt[1], pt[0], this.params.t0);

		const c = (this.params.c0 === null) ? new Complex(pt[1], pt[0], this.params.t0) : this.params.c0;

		const maxIterations = this.params.maxIterations;
		const target = this.params.target;

		let dZ = (this.derivativeCalculation) ? new Complex(1, 0) : null;
		do {
			z = this.fZ(z, c, i);
			if (this.derivativeCalculation) dZ = this.derivativeZ(z, c, i).mul(dZ);
			this.addIterationPt(z, i, pts);
			this.saveZ(z);
			i++;
		}
		while (this.setResult(z) < target && i < maxIterations);

		this.saveZ(z);
		this.saveDz(dZ);

		return this.setIterationsPts(z, i, pts, pt);
	}
	getIfsPts(pt) {
		let z = (this.params.ifsParams.mode === 1) ? new Complex(0, 0, 0) : new Complex(pt[1], pt[0], this.params.t0);

		const i = this.getIFSn(pt[1], pt[0], this.params.t0);
		return this.setIterationsPts(z, i, this.iterationsPts, pt);
	}
	addIterationPt(z, i, pts) {
		if (z) {
			pts.push([z.i, z.r, 0, null, this.getIterationValue(z, i)]);
		}
	}
	setIterationsPts(z, i, pts, pt) {
		if (z === null) {
			return pts;
		}

		switch (this.params.selectMode) {
			case 1:
				// classic rendering with 
				pts = [];
				if (i <= this.params.maxIterations) {
					pts.push([pt[0], pt[1], 0, null, this.getIterationValue(z, i)]);

					pts.push([z.r, z.i, 0, null, this.getIterationValue(z, i)]);
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
					pts.push([pt[0], pt[1], 0, this.getIterationValue(new Complex(pt[0], pt[1]), i), i]);
					return pts;
				}
				break;
			case 11:
				pts = [];
				if (i >= this.params.minIterations) {
					// push initial point (mandelbrot point)
					pts.push([pt[0], pt[1], 0, this.getIterationValue(new Complex(pt[0], pt[1]), i), i]);
					pts.push([z.i, z.r, 0, this.getIterationValue(z, i), i]);
					return pts;
				}
				break;
			case 12:
				return pts;
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
			case 12:
				return Math.abs(z.getArgument());
			case 17:
				return Math.abs(z.getArgument()) * z.squaresSum();
			case 20:
				return (Math.abs(Math.sin(z.squaresSum() * Math.PI)));
			default:
				// cf parent method
				return this.getV(this.params.method, i, z.r, z.i);
		}
	}
	addSymetricPoints(pts) {
		if (this.params.xSymetry) {
			let ptsSymetric = [];
			for (let i = 0; i < pts.length; i++) {
				if (pts[i][0] >= 0 && pts[i][1] >= 0) {

					const ptSymetric = this.gridAdapter.getXSymetricPoint(pts[i]);
					if (ptSymetric) {
						ptSymetric[4] = pts[i][4];
						ptSymetric[3] = pts[i][3];
						ptsSymetric.push(ptSymetric);
						if (pts[i][3]) {
							this.gridAdapter.incrementInGrid(ptSymetric, -1);
						} else {
							this.gridAdapter.incrementInGrid(ptSymetric, pts[i][4] * 1000);
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
		ptsIn.forEach(pt => {
			if (pt[0] >= 0 && pt[1] >= 0) {
				this.gridAdapter.incrementInGrid(pt, (pt[3] ? -1 : pt[4] * 1000));
			}
		});

		this.addSymetricPoints(ptsIn);

		const pts = ptsIn.filter(pt => pt[0] > 0 && pt[1] > 0).map(pt => {
			if (pt[3]) {
				return pt;
			} else {
				const o = this.gridAdapter.getValueInGrid(pt) / 1000;
				const colorPt = this.getColor(o, this.params.minOccurrences, this.params.maxOccurrences,
					(this.params.selectMode === 3 || this.params.selectMode === 8) ? 0 : 100);
				if (colorPt) {
					pt[3] = colorPt;
					pt[4] = o;
					return pt;
				}
			}
			return null;
		}).filter(Boolean);

		return pts;
	}
	getColor(o, min, max, minLog) {
		if (o > min && o < max) {
			const l = (o < minLog) ? o / 10 : Math.log10(o);
			if (this.params.lch == true) {
				return this.colorsService.lchToRgb([
					this.params.drColor[2] + l * this.params.drColor[6],
					this.params.drColor[1] + l * this.params.drColor[5],
					this.params.drColor[0] + l * this.params.drColor[4]
				]);
			}

			return this.colorsService.hslToRgb([
				this.params.drColor[0] + l * this.params.drColor[4],
				this.params.drColor[1] + l * this.params.drColor[5],
				this.params.drColor[2] + l * this.params.drColor[6],
				this.params.drColor.length >= 8 ? this.params.drColor[3] + l * this.params.drColor[7] : 100
			]);
		}
		return null;
	}
}
