/*
 * https://github.com/justinlubin/newton-js
 * https://github.com/infusion/Complex.js/blob/master/complex.js
 */
export default class Complex {
	// r + i
	// t is an experimental dimension
	constructor(r, i, t) {
		this.x = r;
		this.y = i;
		this.r = r; // real
		this.i = i; // imaginary
		this.t = (typeof t === "number") ? t : 0;
		this.square = 0;
	}
	rot(theta) {
		const cosA = Math.cos(theta);
		const sinA = Math.sin(theta);
		return new Complex(
			this.r * cosA - this.i * sinA,
			this.r * sinA + this.i * cosA
		);
	}
	bfor_aa(z0, c0, maxNewtonIters, epsSquared) {
		let z = z0;
		for (let i = 0; i < maxNewtonIters; i++) {
			const nextZ = z.sub(
				((z.pow(2).sub(z).add(c0)).div((
					new Complex(2, 0).mul(z.pow(2 - 1)).add(new Complex(-1, 0))
				)))
			).add(new Complex(1,0));

			if (nextZ.sub(z).squaresSum() < epsSquared) {
				nextZ.it = i;
				return nextZ;
			}
			z = nextZ;
		}
		return null;
	}
	bfor__(z0, c0, maxNewtonIters, epsSquared) {
		let z = z0;
		for (let i = 0; i < maxNewtonIters; i++) {
			const nextZ = z.sub(
				((z.pow(2).add(z)).div((
					z.mul(new Complex(2,0))
				)))
			).add(new Complex(1,0));

			if (nextZ.sub(z).squaresSum() < epsSquared) {
				return nextZ;
			}
			z = nextZ;
		}
		return null;
	}
	bfor_(z0, c0, maxNewtonIters, epsSquared) {
		let z = z0;
		for (let i = 0; i < maxNewtonIters; i++) {
			const nextZ = z.sub(
				((z.pow(2).add(new Complex(1,0))).div((
					z.mul(new Complex(2,0))
				)))
			).add(new Complex(1,0));

			if (nextZ.sub(z).squaresSum() < epsSquared) {
				return nextZ;
			}
			z = nextZ;
		}
		return null;
	}

	bforNewton(z0, c0, maxNewtonIters, epsSquared) {
		let z = z0;
		for (let i = 0; i < maxNewtonIters; i++) {
			const nextZ = z.sub(
				((z.pow(2).sub(new Complex(1,0))).div((
					z.mul(new Complex(2,0))
				)))
			).add(new Complex(1,0));

			if (nextZ.sub(z).squaresSum() < epsSquared) {
				nextZ.it = i;
				return nextZ;
			}
			z = nextZ;
		}
		return null;
	}
	bforNewtonc0(z0, c0, maxNewtonIters, epsSquared) {
		let z = z0;
		for (let i = 0; i < maxNewtonIters; i++) {
			const nextZ = z.sub(
				((z.pow(2).sub(c0)).div((
					z.mul(new Complex(2,0))
				)))
			).add(new Complex(1,0));

			if (nextZ.sub(z).squaresSum() < epsSquared) {
				nextZ.it = i;
				return nextZ;
			}
			z = nextZ;
		}
		return null;
	}
	transform(args) {
		if (args === null || args.length === 0) {
			return this;
		}

		this.r += args[0];
		if (args.length == 1) {
			return this;
		}

		this.i += args[1];
		if (args.length == 2) {
			return this;
		}

		this.t += args[2];
		if (args.length == 3) {
			return this;
		}

		if (args.length > 3) {
			this.r *= args[3];
		}

		if (args.length > 4) {
			this.i *= args[4];
		}

		if (args.length > 5) {
			this.t *= args[5];
		}
		return this;
	}
	setSquare() {
		this.square = this.squaresSum();
		return this.square;
	}
	getArgument() {
		return Math.atan2(this.i, this.r);
	}
	squaresSum() {
		return this.r * this.r + this.i * this.i;
	}
	getMagnitude() {
		return Math.sqrt(this.squaresSum());
	}
	LyapunovExponent(n, lpLimit) {
		let r = 0;
		let i = 0;
		let sum = 0;

		if (this.i == 0 && this.r == 0) {
			return -1;
		}

		for (let j = 0; j < n; j++) {
			// Calculer la nouvelle valeur complexe
			// r
			const rTemp = r * r - i * i + this.r;
			i = 2 * r * i + this.i;
			r = rTemp;

			const p = r * r + i * i;

			if (p >= lpLimit) {
				// Divergence confirmed if |z|^2 >= limit
				return sum / (j + 1); // Return average exponent up to this point
			}

			if (p > 0) {
				// Calculer la dérivée actuelle : pour z^2 + c, la dérivée est 2*z
				// Ajouter le log de la dérivée à la somme de Lyapunov
				sum += Math.log(Math.abs(2 * Math.sqrt(p)));
				// Math.log10(Math.abs(2 * Math.sqrt(p)));
				// Math.log(Math.abs(3*Math.sqrt(p))); : 2-burningship-4-zoom-2-12-2
			}
		}

		// Calculer l'exposant de Lyapunov moyen
		return sum / n;
	}
	LyapunovExponentInc(n, lpLimit) {
		let r = 0;
		let i = 0;
		let p = 0;
		if (this.i == 0 && this.r === 0) {
			return -1;
		}
		for (let j = 0; j < n; j++) {
			const rTemp = r * r - i * i + this.r;
			i = 2 * r * i + this.i;
			r = rTemp;
			p = r * r + i * i;
			if (p >= lpLimit) {
				break;
			}
		}
		return Math.log10(Math.sqrt(p));
	}
	signR() {
		if (this.r < 0) {
			return -1;
		}
		if (this.r === 0) {
			return 0;
		}
		if (this.r > 0) {
			return 1;
		}
	}
	addValues(r, i, t) {
		return new Complex(
			this.r + r,
			this.i + i,
			this.t + t
		)
	}
	addValuesIn(r, i, t) {
		this.r += r;
		this.i += i;
		this.t += t;
		return this;
	}
	addReal(r) {
		return new Complex(
			this.r + r,
			this.i,
			this.t
		)
	}
	addIn(c) {
		this.r += c.r;
		this.i += c.i;
		this.t += c.t;
		return this;
	}
	add(c) {
		return new Complex(
			this.r + c.r,
			this.i + c.i,
			this.t + c.t
		);
	}
	sub(c) {
		return new Complex(
			this.r - c.r,
			this.i - c.i,
			this.t - c.t
		);
	}
	subIn(c) {
		this.r -= c.r;
		this.i -= c.i;
		this.t -= c.t;
		return this;
	}
	mulValues(r, i) {
		this.r = this.r * r - this.i * i;
		this.i = this.i * r + this.r * i;
		return this;
	}
	mul(z) {
		return new Complex(
			this.r * z.r - this.i * z.i,
			this.i * z.r + this.r * z.i,
			this.t
		);
	}
	mulReal(r) {
		return new Complex(
			this.r * r,
			this.i * r,
			this.t * r
		)
	}
	mulRReal(r) {
		return new Complex(
			this.r * r,
			this.i,
			this.t
		)
	}
	div(z) {
		const denominator = z.r * z.r + z.i * z.i + z.t * z.t;
		return new Complex(
			(this.r * z.r + this.i * z.i) / denominator,
			(this.i * z.r - this.r * z.i) / denominator,
			this.t
		);
		//return r0.mulReal(-1);
	}
	inverse() {
		this.setSquare();
		const c1 = new Complex(1, 0, 0);
		const denominator = this.square + this.t * this.t;
		return new Complex(
			(c1.r * this.r + c1.i * this.i) / denominator,
			(c1.i * this.r - c1.r * this.i) / denominator
		);
	}
	iAbs() {
		return new Complex(
			this.r,
			Math.abs(this.i),
			this.t
		);
	}
	rAbs() {
		return new Complex(
			Math.abs(this.r),
			this.i,
			this.t
		);
	}
	abs() {
		return new Complex(
			Math.abs(this.r),
			Math.abs(this.i),
			Math.abs(this.t)
		);
	}
	opposite() {
		return new Complex(
			-this.r,
			-this.i,
			-this.t
		);
	}
	conjugate() {
		return new Complex(
			this.r,
			-this.i,
			this.t
		);
	}
	pow(n) {
		if (typeof this.t === "number" && this.t !== 0) {
			if (n > 1 && n % 2 === 0) {
				return this.pow3d(n);
			}
		}

		switch (n) {
			case 0:
				return new Complex(
					1,
					0,
					0
				);
			case 1:
				return new Complex(
					this.r,
					this.i,
					this.t
				);
			case 2:
				return new Complex(
					// r2 – i2
					this.r * this.r - this.i * this.i,
					// (2ri)
					2 * this.r * this.i
				);
			case 3:
				return new Complex(
					//  a3 – 3ab2
					Math.pow(this.r, 3) - 3 * this.r * this.i * this.i,
					// (3a2b – b3)
					3 * this.r * this.r * this.i - Math.pow(this.i, 3)
				);
			case 4:
				return new Complex(
					//  a4 – 6a2b2 + b4
					Math.pow(this.r, 4) - 6 * this.r * this.r * this.i * this.i + Math.pow(this.i, 4),
					// (4a3b – 4ab3)
					4 * Math.pow(this.r, 3) * this.i - 4 * this.r * Math.pow(this.i, 3)
				);
			default:
		}

		// generic formula
		const arg = this.getArgument();
		const magnitude = this.getMagnitude();
		return new Complex(
			Math.cos(n * arg) * (Math.pow(magnitude, n)),
			Math.sin(n * arg) * (Math.pow(magnitude, n))
		);
	}
	pow3d(n) {
		let z = new Complex(
			this.r,
			this.i,
			this.t
		);

		for (let j = 0; j < (n / 2); j++) {
			// z*z
			z = z.square3d();
		}
		return z;
	}
	powComplex(z) {
		// (r + bi) ^ (c + di) = e^((c + di) * log(r + bi))
		const r = Math.sqrt(this.r ** 2 + this.i ** 2);
		const theta = Math.atan2(this.i, this.r);

		const newR = Math.exp(z.r * Math.log(r) - z.i * theta);
		const newTheta = z.r * theta + z.i * Math.log(r);

		// Convertir le résultat en forme rectangulaire
		return new Complex(newR * Math.cos(newTheta), newR * Math.sin(newTheta));
	}
	expComplex() {
		const expReal = Math.exp(this.r);
		return new Complex(expReal * Math.cos(this.i), expReal * Math.sin(this.i));
	}
	square3d() {
		/*this.setSquare();
		return new Complex(
			(this.square - this.t * this.t) * (this.r * this.r - this.i * this.i) / (this.square),
			2 * (this.square - this.t * this.t) * this.r * this.i / (this.square),
			-2 * this.t * Math.sqrt(this.square)
		);*/

		return new Complex(
			this.r * this.r - this.i * this.i - this.t * this.t,
			2 * this.r * this.i,
			2 * this.r * this.t
		)
	}
	isZero() {
		return this.i === 0 && this.r === 0;
	}
	getC(f) {
		switch (f) {
			case '':
			case '0':
				return this;
			case 'rAbs':
				return this.rAbs();
			case 'iAbs':
				return this.rAbs();
			case 'abs':
				return this.abs();
			case 'inverse':
				return this.inverse();
			case 'conjugate':
				return this.conjugate();
			case 'opposite':
				return this.opposite();
			case 'sin':
				return this.sin();
			case 'cos':
				return this.cos();
			case 'cosh':
				return this.cosh();
			case 'sinh':
				return this.sinh();
			case 'tan':
				return this.tan();
			case 'tanh':
				return this.tanh();
			case 'cot':
				return this.cot();
			case 'coth':
				return this.coth();
			case 'sec':
				return this.sec();
			case 'sech':
				return this.sech();
			case 'csc':
				return this.csc();
			case 'csch':
				return this.csch();
			case 'atan':
				return this.atan();
			case 'acos':
				return this.acos();
			case 'acosh':
				return this.acosh();
			case 'acot':
				return this.acot();
			case 'acoth':
				return this.acoth();
			case 'asin':
				return this.asin();
			case 'asinh':
				return this.asinh();
			case 'asec':
				return this.asec();
			case 'asech':
				return this.asech();
			case 'acsc':
				return this.acsc();
			case 'log':
				return this.log();
			case 'exp':
				return this.expComplex();
			case 'ln':
				return this.ln();
			case 'sqrt':
				return this.sqrt();
			case 'pow2':
				return this.pow(2);
			case 'cosCoshSinSinh':
				return this.cosCoshSinSinh();
			case 'cosCoshSinSinh2':
				return this.cosCoshSinSinh2();
			case 'squareDiv':
				return this.squareDiv();
			case 'squareTan':
				return this.squareTan();
			case 'squareAtan':
				return this.squareAtan();
			case 'expDiv':
				return this.expDiv();
			case 'expDivSinh':
				return this.expDivSinh();
			default:
				return this;
		}
	}
	sqrt() {
		const d = Math.sqrt(this.squaresSum());
		const r = Math.sqrt((d + this.r) / 2);
		const i = (d / Math.abs(d)) * Math.sqrt((d - this.r) / 2);
		return new Complex(r, i);
	}
	log() {
		return new Complex(
			this.logHypot(this.r, this.i),
			Math.atan2(this.i, this.r));
	}
	logHypot(r, i) {
		const rTemp = Math.abs(r);
		const iTemp = Math.abs(i);

		if (r === 0) {
			return Math.log(iTemp);
		}
		if (i === 0) {
			return Math.log(rTemp);
		}
		if (rTemp < 3000 && iTemp < 3000) {
			return Math.log(r * r + i * i) * 0.5;
		}
		return Math.log(r / Math.cos(Math.atan2(i, r)));
	}
	sin() {
		// sin(r).cosh(i)+i cos(r).sinh(i)
		return new Complex(
			Math.cosh(this.i) * Math.sin(this.r),
			Math.sinh(this.i) * Math.cos(this.r)
		);
	}
	sinh() {
		// sinh(r+bi)=sinh(r).cos(i)+i cosh(r).sin(i)
		return new Complex(
			Math.sinh(this.r) * Math.cos(this.i),
			Math.cosh(this.r) * Math.sin(this.i)
		);
	}
	cos() {
		// cos(r).cosh(i) − i sin(r).sinh(i)
		return new Complex(
			Math.cosh(this.i) * Math.cos(this.r),
			-Math.sinh(this.i) * Math.sin(this.r)
		);
	}
	cosh() {
		// cosh(r+bi)=cosh(r).cos(i) + i sinh(r).sin(i)
		return new Complex(
			Math.cosh(this.r) * Math.cos(this.i),
			Math.sinh(this.r) * Math.sin(this.i)
		);
	}
	tan() {
		const d = Math.cos(2 * this.r) + Math.cosh(2 * this.i);
		return new Complex(
			Math.sin(2 * this.r) / d,
			Math.sinh(2 * this.i) / d
		);
	}
	tanh() {
		const d = Math.cosh(2 * this.r) + Math.cos(2 * this.i);
		return new Complex(
			Math.sinh(2 * this.r) / d,
			Math.sin(2 * this.i) / d);
	}
	cot() {
		// cot(c) = i(e^(ci) + e^(-ci)) / (e^(ci) - e^(-ci))
		const d = Math.cos(2 * this.r) - Math.cosh(2 * this.i);
		return new Complex(
			-Math.sin(2 * this.r) / d,
			Math.sinh(2 * this.i) / d
		);
	}
	coth() {
		const d = Math.cosh(2 * this.r) - Math.cos(2 * this.i);
		return new Complex(
			Math.sinh(2 * this.r) / d,
			-Math.sin(2 * this.i) / d);
	}
	sec() {
		// (cos(r).cosh(i) + i sin(r).sinh(i)) / cos2(r).cosh2(i)+sin2(r).sinh2(i)
		const d = 0.5 * Math.cosh(2 * this.i) + 0.5 * Math.cos(2 * this.r);
		return new Complex(
			Math.cos(this.r) * Math.cosh(this.i) / d,
			Math.sin(this.r) * Math.sinh(this.i) / d
		);
	}
	sech() {
		const d = Math.cos(2 * this.i) + Math.cosh(2 * this.r);
		return new Complex(
			2 * Math.cosh(this.r) * Math.cos(this.i) / d,
			-2 * Math.sinh(this.r) * Math.sin(this.i) / d);
	}
	csc() {
		const d = 0.5 * Math.cosh(2 * this.i) - 0.5 * Math.cos(2 * this.r);
		return new Complex(
			Math.sin(this.r) * Math.cosh(this.i) / d,
			-Math.cos(this.r) * Math.sinh(this.i) / d);
	}
	csch() {
		const d = Math.cos(2 * this.i) - Math.cosh(2 * this.r);
		return new Complex(
			-2 * Math.sinh(this.r) * Math.cos(this.i) / d,
			2 * Math.cosh(this.r) * Math.sin(this.i) / d);
	}
	acos() {
		const t1 = new Complex(
			this.i * this.i - this.r * this.r + 1,
			-2 * this.r * this.i).pow(1 / 2);

		const t2 = new Complex(
			t1.r - this.i,
			t1.i + this.r).log();

		return new Complex(Math.PI / 2 - t2.i, t2.r);
	}
	acosh() {
		let res = this.acos();
		let tmp = 0;
		if (res.i <= 0) {
			tmp = res.r;
			res.r = -res.i;
			res.i = tmp;
		} else {
			tmp = res.i;
			res.i = -res.r;
			res.r = tmp;
		}
		return res;
	}
	asinh() {
		let tmp = this.i;
		this.i = -this.r;
		this.r = tmp;
		let res = this.asin();

		this.r = -this.i;
		this.i = tmp;
		tmp = res.r;

		res.r = -res.i;
		res.i = tmp;
		return res;
	}
	acoth() {
		if (this.r === 0 && this.i === 0) {
			return new Complex(0, Math.PI / 2);
		}

		if (this.setSquare() === 0) {
			return new Complex(Infinity, Infinity);
		}

		return new Complex(
			this.r / this.square,
			-this.i / this.square).atanh();
	}
	acsch() {
		if (this.i === 0) {
			return new Complex(
				(this.r !== 0) ?
					Math.log(this.r + Math.sqrt(this.r * this.r + 1)) :
					Infinity, 0);
		}

		if (this.setSquare() === 0) {
			return new Complex(Infinity, Infinity);
		}
		return new Complex(
			this.r / this.square,
			-this.i / this.square).asinh();
	}
	asech() {
		if (this.setSquare() === 0) {
			return new Complex(Infinity, Infinity);
		}
		return new Complex(
			this.r / this.square,
			-this.i / this.square).acosh();
	}
	asin() {
		// asin(c) = -i * log(ci + sqrt(1 - c^2))

		const t1 = new Complex(
			this.i * this.i - this.r * this.r + 1,
			-2 * this.r * this.i).pow(1 / 2);

		const t2 = new Complex(
			t1.r - this.i,
			t1.i + this.r).log();

		return new Complex(t2.i, -t2.r);
	}
	acot() {
		if (this.setSquare() === 0) {
			return new Complex(Math.atan2(1, this.r), 0);
		}

		return new Complex(
			this.r / this.square,
			-this.i / this.square).atan();
	}
	asec() {
		if (this.setSquare() === 0) {
			return new Complex(0, Infinity);
		}

		return new Complex(
			this.r / this.square,
			-this.i / this.square).acos();
	}
	acsc() {
		if (this.setSquare() === 0) {
			return new Complex(Math.PI / 2, Infinity);
		}

		return new Complex(
			this.r / this.square,
			-this.i / this.square).asin();
	}
	atan() {
		if (this.r === 0) {
			if (this.i === 1) {
				return new Complex(0, Infinity);
			}

			if (this.i === -1) {
				return new Complex(0, -Infinity);
			}
		}

		const d = this.r * this.r + (1.0 - this.i) * (1.0 - this.i);

		const t1 = new Complex(
			(1 - this.i * this.i - this.r * this.r) / d,
			-2 * this.r / d).log();

		return new Complex(-0.5 * t1.i, 0.5 * t1.r);
	}
	ln() {
		this.setSquare();
		//0.5 * ln(x² + y²) + 
		// i atan(x / y)
		return new Complex(
			0.5 * Math.log10(this.square),
			Math.atan(this.r / this.i)
		);
	}
	/*special functions*/
	cosCoshSinSinh2() {
		return new Complex(
			Math.cosh(this.i) * Math.sin(this.r),
			-Math.sinh(this.i) * Math.cos(this.r),
			0
		);
	}
	cosCoshSinSinh() {
		return new Complex(
			Math.cosh(-this.i) * Math.cos(this.r),
			Math.sinh(-this.i) * Math.sin(this.r),
			0
		);
	}
	expDiv() {
		return new Complex(
			0.5 * Math.exp(this.squaresSum()),
			this.r / this.i,
			0
		);
	}
	expDivSinh() {
		return new Complex(
			0.5 * Math.exp(this.squaresSum()),
			Math.sinh(this.r / this.i),
			0
		);
	}
	squareDiv() {
		return new Complex(
			this.squaresSum(),
			this.r / this.i,
			0
		);
	}
	squareAtan() {
		return new Complex(
			this.squaresSum(),
			Math.atan(this.r / this.i),
			0
		);
	}
	squareTan() {
		return new Complex(
			this.squaresSum(),
			Math.tan(this.r / this.i),
			0
		);
	}
}