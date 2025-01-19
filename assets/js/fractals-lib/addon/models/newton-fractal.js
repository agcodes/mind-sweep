import CComplex from './CComplex';
import NewtonFractalParameters from './newton-fractal-parameters';
import Fractal from './fractal';

export default class NewtonFractal extends Fractal {
	constructor() {
		super();
		this.params = new NewtonFractalParameters();

		this.c2_0 = new CComplex(2, 0);
		this.params.multiple = new CComplex(1, 0);
		this.iterations = 0;
		this.errorLimit = 0.01;
		this.iFunction = null;
		this.derivativeFunction = null;
	}
	setParameters(params) {
		this.params = params;
		if (this.params.multiple == null) {
			this.params.multiple = new CComplex(1, 0);
		}
	}
	initialize(colorsService_) {
		this.colorsService = colorsService_;
	}
	getPt(x, y) {
		this.initResults();
		const i = (this.params.ifsParams && this.params.ifsParams.mode > 0) ?
			this.getIFSn(x, y, 0) :
			this.getI(x, y);

		if (i === null) {
			return null;
		}

		const z = this.get3DValue(i);
		const v = this.getV(this.params.method, i, x, y);

		let vIn0 = v;
		let vIn1 = v;
		let vIn2 = v;
		let vIn3 = v;
		let vOut0 = v;
		let vOut1 = v;
		let vOut2 = v;
		let vOut3 = v;

		if (this.params.out === true && i < this.params.maxIterations && i >= this.params.minIterations) {
			return [x, y, z, this.params.getDrColor(i, v, vOut0, vOut1, vOut2, vOut3), i, v];
		}

		if (this.params.inner === true && i === this.params.maxIterations) {
			if (this.params.innerMethod > 0) {
				vIn0 = this.getV(this.params.innerMethod, i, x, y);
				vIn1 = vIn0;
				vIn2 = vIn0;
				vIn3 = vIn0;
			}
			return [x, y, z, this.params.getInnerColor(v, vIn0, vIn1, vIn2, vIn3, false), i, v];
		}
		return null;
	}
	getI(x0, y0, z0, pts) {
		// Newton iteration
		// The Nova fractal is the addition of a value c2 at each step:
		// The "Julia" variant of the Nova fractal keeps c2 constant over the image and initializes z to the pixel coordinates.
		//  The "Mandelbrot" variant of the Nova fractal initializes c2 to the pixel coordinates (relativeC2) and sets z to a critical point
		let z = this.params.zOrigin === null ? new CComplex(x0, y0, z0) : this.params.zOrigin;
		const c = this.params.c0 === null ? new CComplex(x0, y0, z0) : this.params.c0;
		const c2 = this.params.c2 === null ? new CComplex(x0, y0, z0) : this.params.c2;

		let eps = 0;
		let i = 0;
		const maxIterations = this.params.maxIterations;
		const limit = this.errorLimit;

		do {
			const zI = this.getNewZ(z, c, c2, i);
			if (zI === null) {
				break;
			}

			eps = Math.abs(zI.sub(z).r);

			z = zI;

			this.setResult(z.squaresSum());
			if (pts) {
				pts.push([z.i, z.r, 0, null, i]);
			}
			i++;
		}
		while (eps > limit && i < maxIterations);

		this.saveZ(z);
		return i;
	}
	getNewZ(z, c, c2, i) {
		// generalization of the Newton fractal with the addition of a value c (Nova fractal)
		// z - m*(f(z)/f'(z)) + c
		return z.sub(
			this.fZ_DerivativefZ(z, c, i).mul(this.params.multiple)
		).addIn(c2);
	}
	fZ_DerivativefZ(z, c, i) {
		// f(z)/f'(z))

		// f(z)
		const fz = this.fZ(z, c, this.params.base, i);

		if ((this.params.derivativeFunction === null)) {
			// derivative approximation
			// f'(z) = f(z+0.01)-f(z)/0.01)
			return fz.div(this.fZ(z.add(this.cDerivative), c, this.params.base, i).sub(fz).div(this.cDerivative));
		}

		// real derivatives
		// (f(z)/f'(z))
		return fz.div(this.derivativefZ(z, c, this.params.base));
	}
	derivativefZ(z, c, n) {
		if (this.params.derivativeFunction) return this.params.derivativeFunction(z, n, this.params.f, c);
		return z;
	}
	fZ(z, c, n, i) {
		if (this.params.currentFunction) {
			if (this.params.breakPtParams && i > this.params.breakPtParams.min) {
				return this.addNoise(this.params.currentFunction(
					z,
					n,
					this.params.breakPtParams.f,
					new CComplex(this.params.breakPtParams.a, this.params.breakPtParams.b, this.params.breakPtParams.c),
					this.c2_0,
					this.params.args), i);
			}
			else {
				return this.addNoise(this.params.currentFunction(z, n, this.params.f, c, this.c2_0, this.params.args), i);
			}
		}

		// by default
		return z;
	}
	getIFSn(x0, y0, z0) {
		this.it = 0;
		// start to 0 or current point

		// 
		const z = this.params.zFromOrigin ? new CComplex(0, 0, 0) : new CComplex(x0, y0, z0);
		const c = this.params.c0 === null ? new CComplex(x0, y0, z0) : this.params.c0;
		const c2 = this.params.c2 === null ? new CComplex(x0, y0, z0) : this.params.c2;

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
