export default class Mandelbulb {
	constructor() {
		this.xMin = -2;
		this.xMax = 2;
		this.yMin = -2;
		this.yMax = 2;
		this.zMin = -2;
		this.zMax = 1.5;
		this.nb = 100;
		this.step = 1 / 1000;
		this.xI = this.xMin;
		this.power = 2;
		this.maxIterations = 150;
		this.colorsService = null;
	}
	initialize(colorsService) {
		this.xI = this.xMin;
		this.colorsService = colorsService;
	}
	getInterval() {
		return [
			[this.xMin, this.yMin, 0],
			[this.xMax, this.yMin, 0],
			[this.xMin, this.yMax, 0],
			[this.xMax, this.yMax, 0],
			[this.xMin, this.yMin, -2],
			[this.xMax, this.yMin, 2],
			[this.xMin, this.yMax, 0.5],
			[this.xMax, this.yMax, 0]
		]
	}
	getNextPts() {
		this.xI += this.step;
		if (this.xI > this.xMax) {
			return null;
		}
		return this.getPts(this.nb, this.xI, this.xI, this.step * 5)
	}
	getInitPts() {
		const pts = [];
		this.getPoint(0, 0, 0, pts);
		this.getPoint(this.xMin, this.yMin, 0, pts);
		this.getPoint(this.xMax, this.yMax, pts);
		this.getPoint(this.xMin, this.yMax, pts);
		return pts;
	}
	getPts(nb, x0, x1, step) {
		const pts = [];
		for (let x = x0; x <= x1; x += step) {
			let y = this.yMin;
			while (y <= this.yMax) {
				for (let z = this.zMin; z <= this.zMax; z += step) {
					this.getPoint(x, y, z, pts);
				}
				y += step;
			}
		}
		return pts;
	}
	getPoint(x, y, z, pts) {
		let real = x;
		let imag = y;
		let comp = z;
		let i = 0;

		while (i < this.maxIterations) {
			const nextReal = Math.pow(real, this.power) - Math.pow(imag, this.power);//+ x;
			const nextImag = 2 * real * imag;//+ y;
			//const nextComp = 2 * comp * real + z;
			const square = nextReal * nextReal + nextImag * nextImag;

			if (Math.abs(square) > 2) {
				break;
			}

			real = nextReal;
			imag = nextImag;
			//comp = nextComp;

			i++;
		}

		if (i === this.maxIterations) {
			pts.push([x, y, z]);
		}
	}
}
