import Complex from './Complex';

export default class FractalParameters {
	modelID = "";
	a = null;
	b = null;
	c = null;
	c0 = null;
	args = null;
	c2 = null;
	multiple = null;
	min = 4;
	min_o = 4;
	type = "";
	f = "";
	base = 1;
	method = 1;
	selectMode = 6;
	render3D = false;
	minOccurrences = 0;
	maxOccurrences = 360;
	inner = false;
	out = true;
	autoAdjust = true;
	multiRandom = false;
	r = 2.5;
	zThresholds = null;
	edgeDetect = 0;
	gaussianFilter = 0;
	t0 = 0;
	x1 = -2.5;
	y1 = -2.5;
	x2 = 2.5;
	y2 = 2.5;
	x1_o = -2;
	y1_o = -2;
	x2_o = 2;
	y2_o = 2;
	ySymetry = false;
	xSymetry = false;
	drColor = null;
	innerColor = null;
	bgColor = null;
	innerColor_o = null;
	bgColor2 = null;
	varInterval = null;
	innerMethod = 0;
	fixedInnerColor = null;
	noise = null;
	d3 = 0;
	colorsI = null;
	target = 4;
	minIterations = 0;
	maxIterations = 0;
	itInterval = null;
	dH = false;
	dW = false;
	ifs = 0;
	ifsIterations = 25;
	ifsMultiple = 2;
	ifsParams = null;
	breakPtParams = null;
	zValues = null;
	areas = null;
	setAB_OnClick = false;
	zMethod = 0;
	zOrigin = null;
	colorsService = null;
	animation = [];
	mode = 0;
	zFromOrigin = false;
	derivativeFunction = null;
	derivativeParams = null;
	colorsLevels = null;
	colorsThresholds = null;
	relativeC2 = false;
	lpNb = 0;
	lpLimit = 0;
	lch = false;
	transformationVector = null;
	position3D = null;
	maxProgress = 100;
	limitMethod = 0;
	constructor() {
		this.colorsI = [];
	}
	setData(data) {
		this.ifsParams = null;
		this.target = 4;
		this.a = null;
		this.b = null;
		this.c = 0;
		this.x1 = -2.5;
		this.x2 = 2.5;
		this.y1 = -2.5;
		this.y2 = 2.5;
		this.zThresholds = null;
		this.bgColor = null;
		this.drColor = [210, 50, 50];
		this.innerColor = [210, 50, 50];
		this.position3D = [1, 1, 1];

		if (data) {
			this.modelID = data.id;

			if ((typeof data.c0 === 'object')) {
				this.a = data.c0.a;
				this.b = data.c0.b;
				this.c = data.c0.c;
			}
			else {
				if (typeof data.a === 'number') {
					this.a = data.a;
				}

				if (typeof data.b === 'number') {
					this.b = data.b;
				}

				if (typeof data.c === 'number') {
					this.c = data.c;
				}
			}

			if (typeof data.target === 'number') {
				this.target = data.target;
			}
			this.initLimits(data);

			this.type = (typeof data.type === 'string') ? data.type : "j_o";
			this.inner = (typeof data.inner === 'boolean') ? data.inner : false;
			this.out = (typeof data.out === 'boolean') ? data.out : true;
			this.method = (typeof data.method === 'number') ? data.method : 1;
			this.lch = (typeof data.lch === 'boolean') ? data.lch : false;
			this.maxIterations = (typeof data.iterations === 'number') ? data.iterations : 50;
			this.maxProgress = (typeof data.maxProgress === 'number') ? data.maxProgress : 100;
			this.limitMethod = (typeof data.limitMethod === 'number') ? data.limitMethod : 0;
			this.f = (typeof data.f === 'string') ? data.f : "";
			this.derivativeParams = (typeof data.derivativeParams === 'object') ? data.derivativeParams : null;

			if (data.drColor !== null && typeof data.drColor === 'object') {
				this.drColor = data.drColor;
			}

			if (data.innerColor !== null && typeof data.innerColor === 'object') {
				this.innerColor = data.innerColor;
			} else {
				this.innerColor = this.drColor;
			}

			this.innerMethod = (typeof data.innerMethod === 'number') ? data.innerMethod : 0;
			if (this.innerMethod > 0) {
				this.inner = true;
			}

			this.ifsParams = this.getNew();
			if (data.ifsParams) {
				this.ifsParams.setData(data.ifsParams);
			}
			else {
				this.ifsParams.mode = (typeof data.ifs === 'number') ? data.ifs : 0;
				if (this.ifsParams.mode > 0) {
					this.ifsParams.maxIterations = (typeof data.ifsIterations === 'number') ? data.ifsIterations : 25;
					this.ifsParams.type = "multiple";
					this.ifsParams.f = "";
					this.ifsParams.args = [2, 0];
					this.ifsParams.setC0();
					this.ifsParams.setFunctions();
				}
			}

			this.selectMode = (typeof data.selectMode === 'number') ? data.selectMode : 6;
			this.min = (typeof data.min === 'number') ? data.min : 0;
			this.base = (typeof data.base === 'number') ? data.base : 2;
			this.minOccurrences = (typeof data.minOccurrences === 'number') ? data.minOccurrences : 0;
			this.maxOccurrences = (typeof data.maxOccurrences === 'number') ? data.maxOccurrences : 360;
			this.itInterval = (typeof data.itInterval === 'object') ? data.itInterval : null;
			this.bgColor = (typeof data.bgColor === 'object') ? data.bgColor : null;
			this.bgColor2 = (typeof data.bgColor2 === 'object') ? data.bgColor2 : null;
			this.args = (typeof data.args === 'object') ? data.args : [];
			this.lpNb = (typeof data.lpNb === 'number') ? data.lpNb : 0;
			this.lpLimit = (typeof data.lpLimit === 'number') ? data.lpLimit : 10000;
			this.varInterval = (typeof data.varInterval === 'object') ? data.varInterval : null;

			this.relativeC2 = (typeof data.relativeC2 === 'boolean') ? data.relativeC2 : false;
			if (this.relativeC2) {
				// relative to point
				this.c2 = null;
			}
			else {
				// if not defined, (0,0,0)
				this.c2 = (typeof data.c2 === "undefined") ? new Complex(0, 0, 0) : new Complex(data.c2.a, data.c2.b);
			}

			this.zFromOrigin = (typeof data.zFromOrigin === 'boolean') ? data.zFromOrigin : false;
			if (this.zFromOrigin) {
				this.zOrigin = new Complex(0, 0, 0);
			}
			else {
				this.zOrigin = (typeof data.zOrigin === "undefined") ? null : new Complex(data.zOrigin.a, data.zOrigin.b);
			}

			this.multiple = (typeof data.multiple === "undefined") ? null : new Complex(data.multiple.r, data.multiple.i);
			this.d3 = (typeof data.d3 === 'number') ? data.d3 : 0;
			this.t0 = (typeof data.t0 === 'number') ? data.t0 : 0;
			this.zMethod = (typeof data.zMethod === 'number') ? data.zMethod : 0;
			this.edgeDetect = (typeof data.edgeDetect === 'number') ? data.edgeDetect : 0;
			this.gaussianFilter = (typeof data.gaussianFilter === 'number') ? data.gaussianFilter : 0;
			this.dW = (typeof data.dW === 'boolean') ? data.dW : false;
			this.dH = (typeof data.dH === 'boolean') ? data.dH : false;
			this.areas = (typeof data.areas === 'object') ? data.areas : null;
			this.noise = (typeof data.noise === 'object') ? data.noise : null;
			this.transformationVector = (typeof data.transformationVector === 'object') ? data.transformationVector : null;

			this.breakPtParams = (typeof data.breakPtParams === 'object') ? data.breakPtParams : null;
			if (this.breakPtParams && typeof this.breakPtParams.base == "undefined") {
				this.breakPtParams.base = this.base;
				this.breakPtParams.f = this.f;
			}

			this.bgAuto = (typeof data.bgAuto === 'boolean') ? data.bgAuto : false;
			this.render3D = (typeof data.render3D === 'boolean') ? data.render3D : false;
			this.multiRandom = (typeof data.multiRandom === 'boolean') ? data.multiRandom : false;
			this.mode = (typeof data.mode === 'number') ? data.mode : 0;
			this.colorsLevels = (typeof data.colorsLevels === 'object') ? data.colorsLevels : null;
			this.colorsThresholds = (typeof data.colorsThresholds === 'object') ? data.colorsThresholds : null;
			this.xSymetry = (typeof data.xSymetry === 'boolean') ? data.xSymetry : false;
			this.ySymetry = (typeof data.ySymetry === 'boolean') ? data.ySymetry : false;
			this.setAB_OnClick = (typeof data.setAB_OnClick === 'boolean') ? data.setAB_OnClick : false;

			if (data.animation) {
				this.animation = data.animation;
			}
			if (typeof data.animation === "undefined" || data.animation === null) {
				this.animation = [];
				this.animation.t0 = 0;
				this.animation.mode = 0;
			}

			if (data.zThresholds !== null && typeof data.zThresholds === 'object') {
				this.zThresholds = data.zThresholds;
				this.render3D = true;
			}

			this.zValues = (typeof data.zValues === 'object') ? data.zValues : null;

			this.pt = null;
			this.setOriginPoints();

			this.min_o = this.min;
			this.minIterations = this.min;
			this.innerColor_o = [this.innerColor[0], this.innerColor[1], this.innerColor[2], this.innerColor[3]];

			if (this.method === 1) {
				if (typeof this.drColor[6] !== "number") {
					this.drColor[6] = 7;
					this.drColor[2] = 1;
				}
			}

			if (typeof this.drColor[3] !== "number") {
				this.drColor[3] = 100;
			}
			if (typeof this.drColor[4] !== "number") {
				this.drColor[4] = 1;
			}
			if (typeof this.drColor[5] !== "number") {
				this.drColor[5] = 1;
			}
			if (typeof this.drColor[6] !== "number") {
				this.drColor[6] = 1;
			}
			if (typeof this.drColor[7] !== "number") {
				this.drColor[7] = 0;
			}

			this.setInitPoints();
			this.setC0();

			return this.setFunctions();
		}

		return false;
	}
	initLimits(data) {
		this.autoAdjust = (typeof data.autoAdjust === 'boolean') ? data.autoAdjust : false;

		if (typeof data.r === 'number') {
			if (this.autoAdjust === true) {
				data.r = data.r * 1.05;
			}
			this.x1 = -parseFloat(data.r);
			this.y1 = -this.x1;
		}

		if (typeof data.x1 === 'number') {
			this.x1 = data.x1;
		}

		if (typeof data.y1 === 'number') {
			this.y1 = data.y1;
		}

		if (typeof data.x2 === 'number') {
			this.x2 = data.x2;
		} else {
			this.x2 = -this.x1;
		}

		if (typeof data.y2 === 'number') {
			this.y2 = data.y2;
		} else {
			this.y2 = -this.y1;
		}
		this.setOriginPoints();
	}
	setFunctions() {
		// defined in child
	}
	getNew() {
		return new FractalParameters();
	}
	setC0() {
		if (this.a === null || this.relativeC === true) {
			this.c0 = null;
		} else {
			if (this.b === null) {
				this.b = 0;
			}
			this.c0 = new Complex(this.a, this.b, this.c);
		}
	}
	setDrColor(color, colorsService) {
		this.colorsService = colorsService;
		if (colorsService) {
			this.drColor = color;
			if (this.drColor === null) {
				this.drColor = [0, 0, 0];
			}

			this.colorsI = [];
			this.fixedDrColor = colorsService.hslToRgb(this.drColor);

			if (this.getIColorValue(1) !== null) {
				for (let i = 0; i <= this.maxIterations + 10; i++) {
					// prepare colors array
					const v = this.getIColorValue(i);

					if (this.lch == true) {
						this.colorsI.push(colorsService.lchToRgb([
							this.drColor[2] + v * this.drColor[6],
							this.drColor[1] + v * this.drColor[5],
							this.drColor[0] + v * this.drColor[4]
						]));
					}
					else {
						this.colorsI.push(colorsService.hslToRgb([
							this.drColor[0] + v * this.drColor[4],
							this.drColor[1] + v * this.drColor[5],
							this.drColor[2] + v * this.drColor[6],
							this.drColor.length >= 8 ? this.drColor[3] + v * this.drColor[7] : null
						]));
					}

				}
			}
		}
		return null;
	}
	getDrColor(i, v, vOut0, vOut1, vOut2, vOut3) {
		if (this.colorsService) {
			if (this.colorsI.length === 0) {
				if (this.lch == true) {
					return this.colorsService.lchToRgb([
						this.drColor[2] + vOut2 * this.drColor[6],
						this.drColor[1] + vOut1 * this.drColor[5],
						this.drColor[0] + vOut0 * this.drColor[4]
					]);
				}
				return (v === 0) ? this.fixedDrColor : this.colorsService.hslToRgb([
					this.drColor[0] + vOut0 * this.drColor[4],
					this.drColor[1] + vOut1 * this.drColor[5],
					this.drColor[2] + vOut2 * this.drColor[6],
					this.drColor.length >= 8 ? this.drColor[3] + vOut3 * this.drColor[7] : null
				]);
			} else {
				// get element in colors array
				return this.colorsI[i];
			}
		}
	}
	getIColorValue(i) {
		if (this.colorsThresholds && this.colorsLevels) {
			for (let j = 0; j < this.colorsThresholds.length; j++) {
				if (this.colorsThresholds[j] >= i) {
					return this.colorsLevels[j];
				}
			}
		}
		switch (this.method) {
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
			case 6:
				return Math.ceil(i / 10) * 10;
			case 7:
				return 1;
			case 8:
				return i === 0 ? 0 : Math.atan2(i, this.maxIterations / 2);
			case 9:
				return Math.tan(i);
			case 10:
				return i === 0 ? 0 : Math.log10(i);
			default:
				return null;
		}
	}
	setInnerColor(c2, colorsService) {
		if (this.colorsService) {
			this.innerColor = c2;

			if (typeof this.innerColor[4] !== "number") {
				this.innerColor[4] = 0;
			}
			if (typeof this.innerColor[5] !== "number") {
				this.innerColor[5] = 0;
			}
			if (typeof this.innerColor[6] !== "number") {
				this.innerColor[6] = 0;
			}

			if (this.innerMethod == 0) {
				if (this.getIColorValue(1) !== null) {
					const v = this.getIColorValue(this.maxIterations);
					this.fixedInnerColor = this.getInnerColor(v, v, v, v, v, true);
				}
				else {
					this.fixedInnerColor = colorsService.hslToRgb(this.innerColor);
				}
			}
		}
	}
	getInnerColor(v, vIn0, vIn1, vIn2, vIn3, init) {
		if (this.colorsService) {
			// ???
			if (this.innerMethod > 0 || init === true || this.method > 4) {
				if (this.lch == true) {
					return this.colorsService.lchToRgb([
						this.innerColor[2] + vIn2 * this.innerColor[6],
						this.innerColor[1] + vIn1 * this.innerColor[5],
						this.innerColor[0] + vIn0 * this.innerColor[4]
					]);
				}
				else {
					return (v === 0) ? this.fixedInnerColor : this.colorsService.hslToRgb([
						this.innerColor[0] + vIn0 * this.innerColor[4],
						this.innerColor[1] + vIn1 * this.innerColor[5],
						this.innerColor[2] + vIn2 * this.innerColor[6],
						this.innerColor.length >= 8 ? this.innerColor[3] + vIn3 * this.innerColor[7] : null
					]);
				}
			} else {
				// get inner color
				return this.fixedInnerColor;
			}
		}
	}
	setLimits(w, h, ratioWH) {
		let dX = 0;
		let dY = 0;

		if (this.dW === true && ratioWH > 1) {
			// enlarge canvas
			dX = Math.abs(this.x2_o - this.x1_o) / 2 * (ratioWH - 1);
		}

		if (h > w) {
			// portrait mode
			dY = Math.abs(this.y2_o - this.y1_o) / 2;
		}


		this.x1 = this.x1_o - dX;
		this.x2 = this.x2_o + dX;

		this.y1 = this.y1_o - dY;
		this.y2 = this.y2_o + dY;

		//console.log(this.x1, this.x1_o, dX, ratioWH);
	}
	setInitPoints() {
		this.x1_i = this.x1;
		this.x2_i = this.x2;
		this.y1_i = this.y1;
		this.y2_i = this.y2;

		if (this.xSymetry === true) {
			if (Math.abs(this.x1) != Math.abs(this.x2)) {
				this.xSymetry = false;
			}
		}
	}
	setOriginPoints() {
		this.x1_o = this.x1;
		this.x2_o = this.x2;
		this.y1_o = this.y1;
		this.y2_o = this.y2;
	}
	restoreInitPoints() {
		this.x1 = this.x1_i;
		this.x2 = this.x2_i;
		this.y1 = this.y1_i;
		this.y2 = this.y2_i;
		this.setOriginPoints();
	}
	defIntervalPts(x1, y1, x2, y2) {
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
	}
	changeParameter(actionName, value) {
		switch (actionName) {
			case 'change_a':
				this.a = parseFloat(value);
				this.setC0();
				return true;
			case 'change_b':
				this.b = parseFloat(value);
				this.setC0();
				return true;
			case 'change_base':
				this.base = parseFloat(value);
				return true;
			case 'change_inner':
				this.inner = parseInt(value) === 1;
				if (this.inner === true || this.out === true) {
					return true;
				}
				break;
			case 'change_out':
				this.out = parseInt(value) === 1;
				if (this.inner === true || this.out === true) {
					return true;
				}
				break;
			case 'change_iterations':
				this.maxIterations = parseInt(value);
				return true;
			case 'change_method':
				this.method = parseInt(value);
				return true;
			case 'change_min':
				this.minIterations = parseInt(value);
				this.min = this.minIterations;
				return true;
			case 'change_x1':
				this.x1 = parseFloat(value);
				this.setOriginPoints();
				return true;
			case 'change_x2':
				this.x2 = parseFloat(value);
				this.setOriginPoints();
				return true;
			case 'change_y1':
				this.y1 = parseFloat(value);
				this.setOriginPoints();
				return true;
			case 'change_y2':
				this.y2 = parseFloat(value);
				this.setOriginPoints();
				return true;
			case 'change_funcName':
				this.f = value;
				return true;
			case 'change_noisex':
				if (this.noise === null) {
					this.noise = [0, 0, 0];
				}
				this.noise[0] = parseFloat(value);
				return true;
			case 'change_noisey':
				if (this.noise === null) {
					this.noise = [0, 0, 0];
				}
				this.noise[1] = parseFloat(value);
				return true;
		}
	}
	setVarParameters(colorsService) {
		if (colorsService && this.animation && this.animation.mode && this.animation.mode > 0) {
			if (this.animation.mode === 2) {
				//this.out = false;
				//this.inner = true;
				//this.innerColor[2] += this.animation.t0 * 80;

				if (this.animation.innerColor) {
					this.innerColor[0] = Math.round(this.innerColor_o[0] + Math.sin(this.t0) * this.animation.innerColor[4]);
					this.innerColor[1] = Math.round(this.innerColor_o[1] + Math.sin(this.t0) * this.animation.innerColor[5]);
					this.innerColor[2] = Math.round(this.innerColor_o[2] + Math.sin(this.t0) * this.animation.innerColor[6]);

					this.fixedInnerColor = colorsService.hslToRgb(this.innerColor);
				}
			}

			return this.applyAnimationVariation(colorsService);
		}
		return false;
	}
	applyAnimationVariation(colorsService) {
		if (this.animation) {
			if (typeof this.animation.min === "number") {
				this.min += this.animation.min;
			}

			if (typeof this.animation.iterations === "number") {
				this.maxIterations += this.animation.iterations;
			}

			if (typeof this.animation.t0 === "number") {
				this.t0 += this.animation.t0;
				this.t0 = this.roundFloat(this.t0);
			}

			if (typeof this.animation.a === "number") {
				this.a += this.animation.a;
				this.a = this.roundFloat(this.a);
			}

			if (typeof this.animation.b === "number") {
				this.b += this.animation.b;
				this.b = this.roundFloat(this.b);
			}

			if (typeof this.animation.c === "number") {
				this.c += this.animation.c;
				this.c = this.roundFloat(this.c);
			}

			/*
			if (this.animation.innerColor) {
				this.innerColor[0] += this.animation.innerColor[4];
				this.innerColor[1] += this.animation.innerColor[5];
				this.innerColor[2] += this.animation.innerColor[6];
				this.innerColor[3] += this.animation.innerColor[7];
				this.fixedInnerColor = colorsService.hslToRgb(this.innerColor);
			}*/

			if (typeof this.animation.hue === "number") {
				this.drColor[4] += this.animation.hue;
			}

			if (typeof this.animation.r === "number") {
				// zoom in
				this.x1 = this.x1_o * (1 - this.animation.r);
				this.x2 = this.x2_o * (1 - this.animation.r);

				this.x1_o = this.x1;
				this.x2_o = this.x2;

				this.y1 = this.y1_o * (1 - this.animation.r);
				this.y2 = this.y2_o * (1 - this.animation.r);

				this.y1_o = this.y1;
				this.y2_o = this.y2;
			}

			if (this.animation.args && this.args !== null && this.animation.args.length == this.args.length) {
				for (let i = 0; i < this.args.length; i++) {
					if (this.animation.args[i]) {
						this.args[i] += this.animation.args[i];
					}
				}
			}

			if (this.animation.args) {
				if (this.animation.args && this.animation.args.rot) {
					this.args.rot += this.animation.args.rot;
				}
			}

			if (this.animation.noise && typeof this.animation.noise === "object"
				&& this.noise != null && typeof this.noise === "object" && this.noise.length >= 3) {
				this.noise[0] += this.animation.noise[0];
				this.noise[1] += this.animation.noise[1];
				this.noise[2] += this.animation.noise[2];
			}

			if (this.animation.c2 && this.c2 != null) {
				this.c2.a += this.animation.c2.a;
				this.c2.b += this.animation.c2.b;
			}

			if (this.animation.multiple && this.multiple != null && typeof this.animation.multiple === "object") {
				this.multiple.r += this.animation.multiple.r;
				this.multiple.i += this.animation.multiple.i;
			}

			if (this.animation.breakPtParams && this.breakPtParams != null) {
				if (typeof this.breakPtParams.a !== "undefined") {
					this.breakPtParams.a += this.animation.breakPtParams.a;
					this.breakPtParams.b += this.animation.breakPtParams.b;
				}
				this.breakPtParams.min += this.animation.breakPtParams.min;
			}

			if (this.animation.transformationVector && this.transformationVector != null) {
				this.transformationVector.r += this.animation.transformationVector.r;
				this.transformationVector.i += this.animation.transformationVector.i;
			}

			if (typeof this.animation.base === "number") {
				this.base += this.animation.base;
			}

			if (typeof this.animation.zOrigin === "object") {
				this.zOrigin = new Complex(this.zOrigin.r + this.animation.zOrigin.a, this.zOrigin.i + this.animation.zOrigin.b);
			}
			this.setC0();
			this.setFunctions();

			if (this.ifsParams) {
				this.ifsParams.applyAnimationVariation();
			}
			return true;
		}

		return false;
	}
	roundFloat(f) {
		return Math.floor(f * 100000000) / 100000000;
	}
	getInterval() {
		return [
			[this.x1, this.y1],
			[this.x1, this.y2],
			[this.x2, this.y1],
			[this.x2, this.y2]
		];
	}
}
