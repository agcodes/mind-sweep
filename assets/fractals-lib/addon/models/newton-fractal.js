import Complex from './Complex';
import NewtonFractalParameters from './newton-fractal-parameters';
import Fractal from './fractal';

export default class NewtonFractal extends Fractal {
	constructor() {
		super();
		this.params = new NewtonFractalParameters();

		this.c2_0 = new Complex(2, 0);
		this.params.multiple = new Complex(1, 0);
		this.iterations = 0;
		this.errorLimit = 0.01;
		this.iFunction = null;
	}
	setParameters(params) {
		this.params = params;
		this.derivativeCalculation = (this.params.method == 18 || this.params.method == 19);
		if (this.params.multiple == null) {
			this.params.multiple = new Complex(1, 0);
		}
	}
	initialize(colorsService_) {
		this.colorsService = colorsService_;
	}
	getPt(x, y, t, adT, inner) {
		this.initResults();
		const i = (this.params.ifsParams && this.params.ifsParams.mode > 0) ?
			this.getIFSn(x, y, t) :
			this.getI(x, y);

		if (i === null) {
			return null;
		}
		if (adT !== 0) {
			return this.getColorPt(x, y, i * adT, i, inner);
		}
		return this.getColorPt(x, y, t, i, inner);
	}
	getI(x, y, t, pts) {
		// Newton iteration
		// The Nova fractal is the addition of a value c2 at each step:
		// The "Julia" variant of the Nova fractal keeps c2 constant over the image and initializes z to the pixel coordinates.
		//  The "Mandelbrot" variant of the Nova fractal initializes c2 to the pixel coordinates (relativeC2) and sets z to a critical point
		let z = this.params.zOrigin === null ? new Complex(x, y, t) : this.params.zOrigin;
		// relative or fixed
		const c = this.params.c0 === null ? new Complex(x, y, t) : this.params.c0;
		// relative or fixed
		const c2 = this.params.c2 === null ? new Complex(x, y, t) : this.params.c2;
		let eps = 0;
		let i = 0;
		const maxIterations = this.params.maxIterations;
		const limit = this.errorLimit;

		do {
			const nextZ = this.getNewZ(z, c, c2, i);
			if (nextZ === null) {
				break;
			}

			eps = (this.params.limitMethod == 2) ? nextZ.sub(z).squaresSum() : Math.abs(nextZ.sub(z).r);

			z = nextZ;

			this.setResult(z);

			if (pts) {
				pts.push([z.i, z.r, 0, null, i]);
			}
			i++;
		}
		while (eps > limit && i < maxIterations);

		this.setSecondFractalEscape(z, i >= maxIterations);
		this.saveZ(z);

		return i;
	}
	getColorPt(x, y, t, i, inner) {
		t = this.get3DValue(i);
		const coefs = this.getColorsCoefs(this.params.method, i, x, y, false);
		const v = coefs[0];

		// inner
		if (this.params.inner === true && (i === this.params.maxIterations || inner == true)) {
			const innerCoefs = this.params.innerMethod == 0 ? coefs : this.getColorsCoefs(this.params.innerMethod, i, x, y, true);
			return [
				x,
				y,
				t,
				(this.params.method == 90 || this.params.innerMethod == 90) ?
					this.getFractalEscapeColor()
					: this.params.getInnerColor(v, innerCoefs[0], innerCoefs[1], innerCoefs[2], innerCoefs[3], false),
				i,
				coefs[0]
			];
		}

		// out
		if (this.params.out === true && i < this.params.maxIterations && i >= this.params.minIterations) {
			return [
				x,
				y,
				t,
				(this.params.method == 90) ?
					this.getFractalEscapeColor()
					: this.params.getDrColor(i, v, coefs[0], coefs[1], coefs[2], coefs[3]),
				i,
				coefs[0]
			];
		}

		return null;
	}
	setResult(z) {
		let squareSum = z.squaresSum();
		if (squareSum < this.minSquareSum) {
			this.minSquareSum = squareSum;
		}
		this.setSumResult(squareSum);
		this.setMinLp(z);
		this.setTrapDistance(z);
		return squareSum;
	}
	getNewZ(z, c, c2, i) {
		// generalization of the Newton fractal with the addition of value c2 (Nova fractal)
		// multiple : optional ((1,0) by default)
		// c2 : optional ((0,0) by default) or relative to point
		// z - multiple*(f(z)/f'(z)) + c2
		return z.sub(
			this.fZ_DerivativefZ(z, c, i).mul(this.params.multiple)
		).addIn(c2);
	}
	fZ_DerivativefZ(z, c, i) {
		// f(z)/f'(z))

		// f(z)
		const fz = this.fZ(z, c, i);

		if ((this.params.derivativeFunction === null)) {
			// derivative approximation
			// f'(z) = f(z+0.01)-f(z)/0.01)
			return fz.div(this.fZ(z.add(this.cDerivative), c, i).sub(fz).div(this.cDerivative));
		}

		// real derivatives
		// (f(z)/f'(z))
		return fz.div(this.derivativefZ(z, c, this.params.base));
	}
	derivativefZ(z, c, n) {
		if (this.params.derivativeFunction) return this.params.derivativeFunction(z, n, this.params.f, c, this.c2_0);
		return z;
	}
	fZ(z, c, i) {
		if (this.params.currentFunction) {
			if (this.params.breakPtParams && i > this.params.breakPtParams.min) {
				return this.addNoise(this.params.currentFunction(
					z,
					this.params.breakPtParams.base,
					this.params.breakPtParams.f,
					new Complex(this.params.breakPtParams.a, this.params.breakPtParams.b, this.params.breakPtParams.c),
					this.c2_0,
					this.params.args), i);
			}
			else {
				return this.addNoise(this.params.currentFunction(z, this.params.base, this.params.f, c, this.c2_0, this.params.args), i);
			}
		}

		// by default
		return z;
	}
	getIFSn(x, y, t) {
		this.it = 0;
		// start to 0 or current point

		const z = this.params.zFromOrigin ? new Complex(0, 0, 0) : new Complex(x, y, t);
		const c = this.params.c0 === null ? new Complex(x, y, t) : this.params.c0;
		const c2 = this.params.c2 === null ? new Complex(x, y, t) : this.params.c2;

		// return result
		return this.getIFSi(z, this.getNewZ(z, c, c2, false), c, c2, 0);
	}
	getIFSi(z, z1, c, c2, n) {
		this.it++;
		if (this.it >= this.params.maxIterations || n >= this.params.ifsParams.maxIterations) {
			// iterations limit
			this.saveZ(z);
			// in : mark 1 or 0
			return 0;
		}

		if ((Math.abs(z1.sub(z).r)) < this.errorLimit) {
			// end by reaching target
			this.saveZ(z);
			// out : mark 0 or 1
			return 1;
		}

		// recursive call
		return this.getIFSi(z1, this.getNewZ(z, c, c2), c, c2, n + 1) + this.getIFSi(z1, this.getIfsZ(z, c), c, c2, n + 1)
	}
	getIfsZ(z, c) {
		const fz = this.fZ_ifs(z, c);
		if (this.params.ifsParams.mode == 3) {
			// z - f(z)/(f(z+0.01)-f(z)/0.01)
			return z.sub(
				fz.div(this.fZ_ifs(z.add(this.cDerivative), c, this.params.base).sub(fz).div(this.cDerivative))
			);
		}
		else if (this.params.ifsParams.currentFunction) {
			return fz;
		}
	}
	fZ_ifs(z, c) {
		return this.params.ifsParams.currentFunction(
			z,
			this.params.ifsParams.base,
			this.params.ifsParams.f,
			this.params.ifsParams.c0 !== null ? this.params.ifsParams.c0 : c,
			this.c2_0,
			this.params.ifsParams.args
		)
	}
}
