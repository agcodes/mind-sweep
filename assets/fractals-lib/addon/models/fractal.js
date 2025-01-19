import Complex from './Complex';

export default class Fractal {
	constructor() {
		this.lastZ = null;
		this.colorsService = null;
		this.lastDz = null;
		this.minSquareSum = Infinity;
		this.minResult = Infinity;
		this.sumResult = 0;
		// step size for numerical derivative
		const dh = 0.00001;
		this.cDerivative = new Complex(dh, dh);
		this.minLp = Infinity;
		this.maxLp = 0;
		this.derivativeCalculation = false;
		this.trapDistance = Infinity;
		this.secondFractalEscape = null;
		this.secondFractal = null;
		this.phi = (1 + Math.sqrt(5)) / 2;
		this.logPhi4 = 4 * Math.log(this.phi);
	}
	initResults() {
		this.trapDistance = Infinity;
		this.sumResult = 0;
		this.lastZ = null;
		this.minSquareSum = Infinity;
		this.minResult = Infinity;
		this.minLp = Infinity;
		this.maxLp = 0;
		this.secondFractalEscape = null;
	}
	setSecondFractalEscape(z, inner) {
		if (this.secondFractal) {
			this.secondFractalEscape = this.secondFractal.getPt(z.r, z.i, z.t, 0, inner);
		}
	}
	setMinLp(z) {
		if (z && this.params.lpNb > 0) {
			const lp = z.LyapunovExponent(this.params.lpNb, this.params.lpLimit);
			if (Math.abs(lp) < Math.abs(this.minLp)) {
				this.minLp = lp;
			}
			if (Math.abs(lp) > Math.abs(this.maxLp)) {
				this.maxLp = lp;
			}
			this.countLp++;
		}
	}
	setResult(z) {
		let result = z.squaresSum();
		if (result < this.minSquareSum) {
			this.minSquareSum = result;
		}

		this.setMinLp(z);
		result = this.setSumResult(result);
		this.setTrapDistance(z);
		return result;
	}
	saveZ(z) {
		if (z) {
			this.lastZ = new Complex(z.r, z.i, z.t);
			this.setMinLp(z);
			this.setTrapDistance(z);
		}
	}
	setTrapDistance(z) {
		// pickover stalk
		if (this.params.transformationVector != null) {
			const distanceToX = Math.abs(z.r + this.params.transformationVector.r);
			const distanceToY = Math.abs(z.i + this.params.transformationVector.i);
			const smallestDistance = Math.min(distanceToX, distanceToY);
			this.trapDistance = Math.min(this.trapDistance, smallestDistance);
		}
	}
	setSumResult(result) {
		if (this.params.method >= 60 && this.params.method <= 69) {
			this.sumResult += Math.log(Math.sqrt(0.5 * result));
			if (this.params.method == 62) {
				if (this.sumResult > 30) {
					return this.params.target + 1;
				}
				if (this.sumResult < -30) {
					return this.params.target + 1;
				}
			}
		}
		return result;
	}
	saveLastZ(z) {
		this.lastZ = new Complex(z.r, z.i, z.t);
	}
	saveDz(dZ) {
		if (dZ) {
			this.lastDz = new Complex(dZ.r, dZ.i);
		}
	}
	derivativeZ(z, c, i, origin) {
		if (this.params.derivativeFunction) return this.params.derivativeFunction(z, this.params.base, c);

		// f'(z) = f(z+0.01)-f(z)/0.01)
		return this.fZ(z.add(this.cDerivative), c, i, origin).sub(this.fZ(z, c, i, origin)).div(this.cDerivative);
	}
	addNoise(z, i) {
		if (z && this.params.noise) {
			return z.addValuesIn(this.params.noise[0] * i, this.params.noise[1] * i, this.params.noise[2] * i)
		}
		return z;
	}
	get3DValue(i, x, y) {
		let t = null;
		if (this.params.render3D) {
			if (this.params.zThresholds && this.params.zValues) {
				for (let j = 0; j < this.params.zThresholds.length; j++) {
					if (this.params.zThresholds[j] >= i) {
						t = this.params.zValues[j];
						break;
					}
				}
			}
			else if (this.params.zMethod === 0) {
				t = -Math.log10(i);
			}
			else {
				t = this.getV(this.params.zMethod, i, x, y);
			}
		}
		return t;
	}
	getLastMagnitude() { return this.lastZ == null ? 0 : this.lastZ.getMagnitude(); }
	getLastArgument() { return this.lastZ == null ? 0 : this.lastZ.getArgument(); }
	getLastSquaresSum() { return this.lastZ == null ? 0 : this.lastZ.squaresSum(); }
	getDzSquaresSum() { return this.lastDz == null ? 0 : this.lastDz.squaresSum(); }
	getDzMagnitude() { return this.lastDz == null ? 0 : this.lastDz.getMagnitude(); }
	getColorsCoefs = (method, i, x, y, inner) => {
		const v = this.getV(method, i, x, y);
		switch (method) {
			case 13:
				return [i, v, v, v];
			case 15:
				return [this.lastZ.getArgument(), i, i, i];
			case 80:
				// %1 : normalize in [0,1]
				const hue = (this.lastZ.getArgument() / (2 * Math.PI) + 1) % 1;
				const trap = this.goldenRatioTrap(this.lastZ);
				const saturation = Math.min(1, 2 * trap);
				const brightness = Math.max(0, Math.min(1, 2 * (1 - trap)));
				return [hue, saturation, brightness, i];
			case 82:
				const hue2 = (this.lastZ.getArgument() / (2 * Math.PI) + 1) % 1;
				const trap2 = this.goldenRatioTrap(this.lastZ);
				const saturation2 = Math.min(1, 2 * trap2);
				return [hue2, saturation2, i, hue2];
			default:
				return [v, v, v, v];
		}
	}
	getFractalEscapeColor() {
		if (this.secondFractalEscape && this.secondFractalEscape.length > 2) {
			// return calculated color with second fractal
			return this.secondFractalEscape[3];
		}
		return [0, 0, 0, 0];
	}
	// Function for the Golden Ratio Spiral orbit trap
	goldenRatioTrap(z) {
		const absZ = z.getMagnitude();
		const argZ = z.getArgument();
		const r = Math.log(absZ) / (this.logPhi4) - argZ / (2 * Math.PI);
		return 4 * Math.abs(r - Math.round(r));
	}
	getV = (method, i, x, y) => {
		switch (method) {
			case 1:
				// iterations
				return i;
			case 2:
				// log(i)
				return i === 0 ? 0 : Math.log(i);
			case 3:
				return 1 / i * 100;
			case 4:
				return i === 0 ? 0 : Math.sin(Math.log(i)) + 1;
			case 5:
				return i % 2 === 0 ? 0 : 10;
			case 6:
				return Math.ceil(i / 10) * 10;
			case 7:
				return 1;
			case 8:
				return i === 0 ? 0 : Math.atan2(i, this.maxIterations / 2);
			case 10:
				return i === 0 ? 0 : Math.log10(i);
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
				return this.minSquareSum == Infinity ? 10000 : Math.sqrt(this.minSquareSum * 100);
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
				// lerp
				return this.colorsService.lerpForPoint(x, y + i / 10, 0.1);
			case 27:
				return this.colorsService.lerpForPoint(x + this.getLastSquaresSum() * 2, y + this.getLastSquaresSum() * 2, 0.1);
			case 28:
				// lp
				if (this.minLp >= 3) {
					return (Math.sin(Math.log(i)) + 1) / 10;
				}
				return Math.abs(this.minLp) / (Math.sqrt(Math.pow(this.params.x2 - this.params.x1, 2) + Math.pow(this.params.y2 - this.params.y1, 2))) * 4
			case 29:
				// lp
				if (this.minLp == Infinity) {
					return (Math.sin(Math.log(i)) + 1) / 2;
				}
				return Math.log(1 + Math.abs(this.minLp)) * 10;
			case 31:
				if (this.maxLp == 0) {
					return (Math.sin(Math.log(i)) + 1) / 2;
				}
				return Math.abs(this.maxLp) / (Math.sqrt(Math.pow(this.params.x2 - this.params.x1, 2) + Math.pow(this.params.y2 - this.params.y1, 2))) * 4
			case 32:
				return Math.log10(1 + Math.abs(this.minLp)) * ((this.minLp > 0.1) ? 10 : 18);
			case 33:
				if (this.minLp > 0.1) {
					return Math.log10(1 + Math.abs(this.minLp)) * 1;
				}
				return Math.log10(1 + Math.abs(this.minLp)) * 20;
			case 34:
				if (this.minLp > 0.1) {
					return Math.sin(Math.log(this.minLp)) * 1;
				}
				return Math.sin(Math.log(this.minLp)) * 10;
			case 36:
				return this.minLp;
			case 35:
				return Math.log10(1 + Math.abs(this.maxLp)) * ((this.maxLp > 0.1) ? 10 : 18);
			case 50:
				// random
				return Math.floor(Math.random() * i);
			case 60:
				// sum results
				return Math.abs(Math.round(this.sumResult));
			case 62:
				// same as 60 but see function setSumResult
				return Math.abs(Math.round(this.sumResult));
			case 63:
				return this.sumResult === 0 ? 0 : 1 / this.sumResult * 100;
			case 64:
				return this.sumResult === 0 ? 0 : Math.sin(Math.log(Math.abs(this.sumResult))) + 1;
			case 70:
				// Pickover stalk with transform vector
				return this.trapDistance;
			case 73:
				return this.trapDistance === 0 ? 0 : 1 / this.trapDistance;
			case 74:
				return this.trapDistance === 0 ? 0 : Math.sin(Math.log(this.trapDistance)) + 1;
			case 83:
				return this.goldenRatioTrap(this.lastZ);
			case 84:
				// %1 : normalize in [0,1]
				return (this.lastZ.getArgument() / (2 * Math.PI) + 1) % 1;
			case 115:
				return Math.tan(i);
			default:
				return i;
		}
	}
}