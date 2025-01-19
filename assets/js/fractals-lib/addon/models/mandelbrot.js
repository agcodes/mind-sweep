import CComplex from './CComplex';
import MersenneTwister from 'calc-utils/models/MersenneTwister';
import FractalParameters from './fractal-parameters';
import Fractal from './fractal';

export default class Mandelbrot extends Fractal {
	constructor() {
		super();
		this.params = new FractalParameters();
		this.mersenneTwister = new MersenneTwister();
		this.colorsService = null;
		this.grid = [];
		this.tmp = [];
		this.ptsTmp = [];
		this.iterationsPts = null;
		this.it = 0;
		this.n = 0;
		this.z = null;
		this.limitWidth = 0;
		this.initialMaxIterations = 0;
		this.nOccurrences = [];
		this.currentFunction = null;
		this.functionDefinition = "";
		this.ifsFunctionDefinition = "";
		this.derivativeCalculation = false;
	}
	setParameters(params) {
		this.params = params;
		this.derivativeCalculation = (this.params.method == 18 || this.params.method == 19);
		this.params.setC0();
	}
	clearPtsTmp() {
		this.ptsTmp = [];
	}
	initialize(colorsService, mandelbrotParams) {
		this.colorsService = colorsService;
		this.params = mandelbrotParams;
		this.ptsTmp = [];
		this.it = 0;
		this.nOccurrences = [];
		for (let index = 0; index < this.params.maxIterations + 1; index++) {
			this.nOccurrences.push(0);
		}
		return (typeof this.params.currentFunction == "function");
	}
	randomBetween(min, max, d) {
		min -= d;
		max += d;
		return Math.round((this.mersenneTwister.rand() * (max - min) + min) * (100000)) / (100000);
	}
	setRandomPoint() {
		const precision = 1 / 10000000;
		return [
			Math.round(this.randomBetween(this.params.x1, this.params.x2, 0) * (1 / precision)) / (1 / precision),
			Math.round(this.randomBetween(this.params.y1, this.params.y2, 0) * (1 / precision)) / (1 / precision),
			1
		];
	}
	getRandomPoints(nb, adZ) {
		for (let index = 0; index < nb; index++) {
			const randomPt = this.setRandomPoint();
			const pt = this.getPt(randomPt[0], randomPt[1], this.params.z0, adZ);
			if (pt) {
				this.ptsTmp.push(pt);
			}
		}
		return this.ptsTmp;
	}
	getPt(x0, y0, z0, adZ) {
		this.initResults();
		const i = (this.params.ifsParams.mode > 0) ?
			this.getIFSn(x0, y0, z0, []) :
			this.getI(x0, y0, z0);

		this.nOccurrences[i]++;
		if (adZ !== 0) {
			return this.getMandelbrotPt(x0, y0, i * adZ, i);
		}
		return this.getMandelbrotPt(x0, y0, z0, i);
	}
	getI(x0, y0, z0) {
		// classic mandelbrot : set c from start point
		// else use defined c (especially for julia set)
		let c = this.params.c0 === null ? new CComplex(x0, y0, z0) : this.params.c0;

		// new z
		let z = this.params.zFromOrigin ? new CComplex(0, 0, 0) : new CComplex(x0, y0, z0);

		let dZ = (this.derivativeCalculation) ? new CComplex(1, 0) : null;

		let i = 0;
		const maxIterations = this.params.maxIterations;
		const target = this.params.target;

		do {
			z = this.fZ(z, c, i);
			if (z === null) {
				break;
			}
			if (this.derivativeCalculation) dZ = this.derivativeZ(z, c, i).mul(dZ);
			this.setMinLp(z);
			i++;
		}
		while (this.setResult(z.squaresSum()) < target && i < maxIterations);

		this.saveZ(z);
		this.saveDz(dZ);

		this.it++;

		return i;
	}
	getMandelbrotPt(x, y, z, i) {
		if (this.params.itInterval !== null && (i < this.params.itInterval[0] || i > this.params.itInterval[1])) {
			// out of iterations intervals
			return null;
		}

		if (this.params.render3D) {
			if (this.params.zMethod === 1) {

			}
			else if (this.params.zThresholds && this.params.zValues) {
				for (let j = 0; j < this.params.zThresholds.length; j++) {
					if (this.params.zThresholds[j] >= i) {
						z = this.params.zValues[j];
						break;
					}
				}
			} else {
				z = -Math.log10(i);
			}
		}

		const v = this.getV(this.params.method, i, x, y);

		let vIn0 = v;
		let vIn1 = v;
		let vIn2 = v;
		let vIn3 = v;
		let vOut0 = v;
		let vOut1 = v;
		let vOut2 = v;
		let vOut3 = v;

		if (this.params.innerMethod > 0) {
			vIn0 = this.getV(this.params.innerMethod, i);
			vIn1 = vIn0;
			vIn2 = vIn0;
			vIn3 = vIn0;
		}

		if (this.params.zMethod === 3) {
			z = Math.log10(i);
		}

		switch (this.params.method) {
			case 13:
				vIn0 = i;
				vIn1 = this.getLastMagnitude();
				vIn2 = vIn1;
				vIn3 = vIn1;

				vOut0 = i;
				vOut1 = this.getLastMagnitude();
				vOut2 = vOut1;
				vOut3 = vOut1;
				break;
		}

		if (this.params.varInterval !== null && (v < this.params.varInterval[0] || v > this.params.varInterval[1])) {
			// out of limits
			return null;
		}

		// inner
		if (this.params.inner === true && i === this.params.maxIterations) {
			return [
				x,
				y,
				z,
				this.params.getInnerColor(v, vIn0, vIn1, vIn2, vIn3, false),
				i
			];
		}

		// out
		if (this.params.out === true && i < this.params.maxIterations && i >= this.params.minIterations) {
			return [
				x,
				y,
				z,
				this.params.getDrColor(i, v, vOut0, vOut1, vOut2, vOut3),
				i,
				v
			];
		}

		return null;
	}
	getIFSn(x0, y0, z0) {
		this.iterationsPts = [];
		this.it = 0;

		this.saveDz(new CComplex(1, 0));

		// return result
		return this.getIFSi(
			// z :start to 0 or current point
			(this.params.zFromOrigin) ? new CComplex(0, 0, 0) : new CComplex(x0, y0, z0),
			(this.params.c0 === null) ? new CComplex(x0, y0, z0) : this.params.c0,
			0,
			1);
	}
	getIFSi(z, c, n, index) {
		this.it++;

		if (this.it > this.params.maxIterations || n >= this.params.ifsParams.maxIterations) {
			// iterations limit
			if (index == 1) this.saveZ(z);
			if (this.derivativeCalculation && index == 1) this.saveDz(this.derivativeZ(z, c, this.it).mul(this.lastDz));

			// in : mark 1 or 0
			return this.params.selectMode === 11 ? 1 : 0;
		}

		const square = z.squaresSum();
		if (index == 1) this.setResult(square);
		if (square > this.params.target) {
			// end by reaching target
			if (index == 1) this.saveZ(z);
			if (this.derivativeCalculation && index == 1) this.saveDz(this.derivativeZ(z, c, this.it).mul(this.lastDz));

			// out : mark 0 or 1
			return this.params.selectMode === 11 ? 0 : 1;
		}

		// recursive call
		return this.getIFSi(this.fZ(z, c, n + 1), c, n + 1, 1) + this.getIFSi(this.getIfsZ(z, c, n + 1), c, n + 1, 2)
	}
	fZ(z, c, i) {
		if (this.params.breakPtParams && i > this.params.breakPtParams.min) {
			// break point
			z = this.addNoise(this.params.currentFunction(
				z,
				this.params.breakPtParams.base,
				new CComplex(this.params.breakPtParams.a, this.params.breakPtParams.b, this.params.breakPtParams.c),
				this.params.breakPtParams.f,
				this.params.args,
				i), i);
		}
		else {
			z = this.addNoise(this.params.currentFunction(z, this.params.base, c, this.params.f, this.params.args, i), i);
		}

		if (this.iterationsPts !== null) {
			this.addIterationPt(z, this.it, this.iterationsPts);
		}
		return z;
	}
	derivativeZ(z, c, i) {
		if (this.params.derivativeFunction) return this.params.derivativeFunction(z, this.params.base, c);

		// f'(z) = f(z+0.01)-f(z)/0.01)
		return this.fZ(z.add(this.cDerivative), c, i).sub(this.fZ(z, c, i)).div(this.cDerivative);
	}
	getIfsZ(z, c, i) {
		if (this.params.ifsParams.currentFunction) {
			z = this.params.ifsParams.currentFunction(
				z,
				this.params.ifsParams.base,
				this.params.ifsParams.c0 !== null ? this.params.ifsParams.c0 : c,
				this.params.ifsParams.f,
				this.params.ifsParams.args
			);

			if (z && this.params.ifsParams.noise) {
				// add noise 
				return z.addValuesIn(
					this.params.ifsParams.noise[0] * i,
					this.params.ifsParams.noise[1] * i,
					this.params.ifsParams.noise[2] * i
				)
			}
			return z;
		}

		// default function
		return z;
	}
	addIterationPt() {
		// not used here
	}
}
