import CComplex from './CComplex';

export default class Fractal {
	constructor() {
		this.lastZ = null;
		this.colorsService = null;
		this.lastDz = null;
		this.minResult = Infinity;
		// step size for numerical derivative
		const dh = 0.00001;
		this.cDerivative = new CComplex(dh, dh);
		this.minLp = Infinity;
		this.maxLp = 0;
	}
	initResults() {
		this.lastZ = null;
		this.minResult = Infinity;
		this.minLp = Infinity;
		this.maxLp = 0;
	}
	setMinLp(z) {
		if (z && this.params.lpNb > 0) {
			const lp = z.LyapunovExponent(this.params.lpNb);
			if (Math.abs(lp) < Math.abs(this.minLp)) {
				this.minLp = lp;
			}
			if (Math.abs(lp) > Math.abs(this.maxLp)) {
				this.maxLp = lp;
			}
		}
	}
	setResult(result) {
		if (result < this.minResult) {
			this.minResult = result;
		}
		return result;
	}
	saveZ(z) {
		if (z) {
			this.lastZ = new CComplex(z.r, z.i, z.t);
			this.setMinLp(z);
		}
	}
	saveDz(dZ) {
		if (dZ) {
			this.lastDz = new CComplex(dZ.r, dZ.i);
		}
	}
	addNoise(z, i) {
		if (z && this.params.noise) {
			return z.addValuesIn(this.params.noise[0] * i, this.params.noise[1] * i, this.params.noise[2] * i)
		}
		return z;
	}
	get3DValue(i){
		let z = null;
		if (this.params.render3D) {
			if (this.params.zThresholds && this.params.zValues) {
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
		return z;
	}
	getLastMagnitude() { return this.lastZ == null ? 0 : this.lastZ.getMagnitude(); }
	getLastArgument() { return this.lastZ == null ? 0 : this.lastZ.getArgument(); }
	getLastSquaresSum() { return this.lastZ == null ? 0 : this.lastZ.squaresSum(); }
	getDzSquaresSum() { return this.lastDz == null ? 0 : this.lastDz.squaresSum(); }
	getDzMagnitude() { return this.lastDz == null ? 0 : this.lastDz.getMagnitude(); }
	getV = (method, i, x, y) => {
		switch (method) {
			case 11:
				return this.getLastMagnitude();
			case 12:
				return this.getLastArgument();
			case 13:
				return this.getLastMagnitude();
			case 14:
				return this.getLastSquaresSum();
			case 16:
				// orbit trap
				//return this.minResult == Infinity ? 10000 : Math.log(Math.sqrt(this.minResult * 100));
				return this.minResult == Infinity ? 10000 : Math.sqrt(this.minResult * 100);
			case 17:
				return this.getLastArgument() * this.getLastSquaresSum();
			case 18:
				// derivative
				return Math.tanh((this.getLastMagnitude() * Math.log(this.getLastMagnitude()) / this.getDzMagnitude()) * 1000) * 100;
			case 19:
				// derivative
				return Math.log(this.getDzMagnitude());
			case 20:
				return Math.abs(Math.sin(this.getLastSquaresSum() * Math.PI));
			case 21:
				return Math.log(this.getLastArgument());
			case 22:
				return Math.log(this.getLastSquaresSum());
			case 25:
				return this.lastZ.i / 2 / Math.PI - 0.09;
			case 26:
				return this.colorsService.lerpForPoint(x, y + i / 10, 0.1);
			case 27:
				return this.colorsService.lerpForPoint(x + this.getLastSquaresSum() * 2, y + this.getLastSquaresSum() * 2, 0.1);
			case 28:
				if (this.minLp == Infinity) {
					return (Math.sin(Math.log(i)) + 1) / 2;
				}
				return Math.abs(this.minLp) / (Math.sqrt(Math.pow(this.params.x2 - this.params.x1, 2) + Math.pow(this.params.y2 - this.params.y1, 2))) * 4
			case 29:
				if (this.minLp == Infinity) {
					return (Math.sin(Math.log(i)) + 1) / 2;
				}
				return Math.log(1 + Math.abs(this.minLp)) * 10;
			case 32:
				if (this.minLp == Infinity) {
					return Math.log(1 + i);
				}
				const m = Math.log10(1 + Math.abs(this.minLp)) * 10;
				if (m > 10) {
					return Math.log(1 + i);
				}
				return m;
			case 31:
				if (this.maxLp == 0) {
					return (Math.sin(Math.log(i)) + 1) / 2;
				}
				return Math.abs(this.maxLp) / (Math.sqrt(Math.pow(this.params.x2 - this.params.x1, 2) + Math.pow(this.params.y2 - this.params.y1, 2))) * 4
			case 50:
				return Math.floor(Math.random() * i);
			default:
				return i;
		}
	}
}