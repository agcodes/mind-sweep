import Complex from './Complex';
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
		this.secondFractal = null;
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
		this.nOccurrences = new Array(this.params.maxIterations + 1).fill(0);
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
	getRandomPoints(nb, adT) {
		Array.from({ length: nb }).forEach(() => {
			const randomPt = this.setRandomPoint();
			const pt = this.getPt(randomPt[0], randomPt[1], this.params.t0, adT);
			if (pt) {
				this.ptsTmp.push(pt);
			}
		});
		return this.ptsTmp;
	}
	getPt(x, y, t, adT, inner) {
		this.initResults();
		const i = (this.params.ifsParams.mode > 0) ?
			this.getIFSn(x, y, t, []) :
			this.getI(x, y, t);

		this.nOccurrences[i]++;
		if (adT !== 0) {
			return this.getColorPt(x, y, i * adT, i, inner);
		}
		return this.getColorPt(x, y, t, i, inner);
	}
	getI(x, y, t) {
		const origin = new Complex(x, y, t);
		// classic mandelbrot : set c from start point
		// else use defined c (especially for julia set)
		let c = this.params.c0 === null ? new Complex(x, y, t) : this.params.c0;

		// new z
		let z = this.params.zFromOrigin ? new Complex(0, 0, 0) : new Complex(x, y, t);

		let dZ = (this.derivativeCalculation) ? new Complex(1, 0) : null;

		let i = 0;
		const maxIterations = this.params.maxIterations;
		const target = this.params.target;

		do {
			z = this.fZ(z, c, i, origin);
			if (z === null) {
				break;
			}
			if (this.derivativeCalculation) dZ = this.derivativeZ(z, c, i, origin).mul(dZ);
			i++;
		}
		while (this.setResult(z) < target && i < maxIterations);

		this.setSecondFractalEscape(z, i >= maxIterations);
		this.saveZ(z);
		this.saveDz(dZ);

		this.it++;

		return i;
	}
	getColorPt(x, y, t, i, inner) {
		if (this.params.itInterval !== null && (i < this.params.itInterval[0] || i > this.params.itInterval[1])) {
			// out of iterations intervals
			return null;
		}

		if (this.params.render3D == true) {
			t = this.get3DValue(i, x, y);
		}

		const coefs = this.getColorsCoefs(this.params.method, i, x, y, false);
		const v = coefs[0];

		if (this.params.varInterval !== null && (v < this.params.varInterval[0] || v > this.params.varInterval[1])) {
			// out of limits
			return null;
		}

		// inner
		if (this.params.inner === true && (i >= this.params.maxIterations || inner == true)) {
			const innerCoefs = this.params.innerMethod == 0 ? coefs : this.getColorsCoefs(this.params.innerMethod, i, x, y, true);
			return [
				x,
				y,
				t,
				(this.params.method == 90 || this.params.innerMethod == 90) ?
					this.getFractalEscapeColor()
					: this.params.getInnerColor(v, innerCoefs[0], innerCoefs[1], innerCoefs[2], innerCoefs[3], false),
				i
			];
		}

		// escape : out
		if (this.params.out === true && i < this.params.maxIterations && i >= this.params.minIterations) {
			return [
				x,
				y,
				t,
				(this.params.method == 90) ?
					this.getFractalEscapeColor()
					: this.params.getDrColor(i, v, coefs[0], coefs[1], coefs[2], coefs[3]),
				i,
				v
			];
		}

		return null;
	}
	getIFSn(x, y, t) {
		const origin = new Complex(x, y, t);
		this.iterationsPts = [];
		this.it = 0;

		this.saveDz(new Complex(1, 0));

		// return result
		return this.getIFSi(
			// z :start to 0 or current point
			(this.params.zFromOrigin) ? new Complex(0, 0, 0) : new Complex(x, y, t),
			(this.params.c0 === null) ? new Complex(x, y, t) : this.params.c0,
			0,
			1, origin);
	}
	getIFSi(z, c, n, index, origin) {
		this.it++;

		if (this.it > this.params.maxIterations || n >= this.params.ifsParams.maxIterations) {
			// iterations limit
			if (index == 1) this.saveZ(z);
			if (this.derivativeCalculation && index == 1) this.saveDz(this.derivativeZ(z, c, this.it, origin).mul(this.lastDz));

			// in : mark 1 or 0
			return this.params.selectMode === 11 ? 1 : 0;
		}

		const square = z.squaresSum();
		if (index == 1) this.setResult(z);
		if (square > this.params.target) {
			// end by reaching target
			if (index == 1) this.saveZ(z);
			if (this.derivativeCalculation && index == 1) this.saveDz(this.derivativeZ(z, c, this.it, origin).mul(this.lastDz));

			// out : mark 0 or 1
			return this.params.selectMode === 11 ? 0 : 1;
		}

		// recursive call
		return this.getIFSi(this.fZ(z, c, n + 1, origin), c, n + 1, 1, origin) + this.getIFSi(this.getIfsZ(z, c, n + 1), c, n + 1, 2, origin)
	}
	fZ(z, c, i, origin) {
		if (this.params.breakPtParams && i > this.params.breakPtParams.min) {
			// apply new c after x iterations
			z = this.addNoise(this.params.currentFunction(
				z,
				this.params.breakPtParams.base,
				(typeof this.params.breakPtParams.a == "undefined") ? origin : new Complex(this.params.breakPtParams.a, this.params.breakPtParams.b, this.params.breakPtParams.c),
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
