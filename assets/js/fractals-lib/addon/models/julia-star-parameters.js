import FractalParameters from './fractal-parameters';
import JuliaStarFunctions from './julia-star-functions';
import CComplex from './CComplex';

export default class JuliaStarParameters extends FractalParameters {
    constructor() {
        super();
        this.type = 0;
        this.c1 = null;
        this.c2 = null;
        this.c3 = null;
        this.cP = null;
        this.altC = false;
        this.dRx = 0;
        this.dRy = 0;
        this.step = 0.00001;
        this.a = 0;
        this.b = 0;
        this.n = 0;
        this.d = 0;
        this.altC2_3 = false;
        this.altC2_3_4 = false;
        this.m = 3;
        this.p = 0;
        this.param2 = 0;
        this.randomS = false;
        this.autoAdjust = true;
        this.drColor = [340, 55, 35, 100, 11, 0, 1.25];
    }
    setFunctions() {
        const juliaStarFunctions = new JuliaStarFunctions();
        this.currentFunction = juliaStarFunctions.getFunction(this.type);
        return typeof this.currentFunction == "function";
    }
    getNew() {
        return new JuliaStarParameters();
    }
    setParameters(data) {
        if (data) {
            this.f = '';
            this.type = 0;
            this.c1 = null;
            this.c2 = null;
            this.c3 = null;
            if (typeof data.base === 'number') {
                this.base = data.base;
            }
            if (typeof data.a === 'number') {
                this.a = data.a;
            }
            if (typeof data.b === 'number') {
                this.b = data.b;
            }
            if (typeof data.n === 'number') {
                this.n = data.n;
            }
            if (typeof data.d === 'number') {
                this.d = data.d;
            }

            if (typeof data.c1 === 'object') {
                this.c1 = new CComplex(data.c1.r, data.c1.i);
            }
            else {
                this.c1 = new CComplex(0, 0);
            }
            
            if (typeof data.c2 === 'object') {
                this.altC2_3 = true;
                this.c2 = new CComplex(data.c2.r, data.c2.i);
                if (typeof data.c3 === 'object') {
                    this.altC2_3 = true;
                    this.c3 = new CComplex(data.c3.r, data.c3.i);
                }
                if (typeof data.c4 === 'object') {
                    this.altC2_3_4 = true;
                    this.c4 = new CComplex(data.c4.r, data.c4.i);
                }
            }
            
            if (typeof data.m === 'number') {
                this.m = data.m;
            }
            if (typeof data.p === 'number') {
                this.p = data.p;
            }
            if (typeof data.altC === 'boolean') {
                this.altC = data.altC;
            }
            if (typeof data.random === 'boolean') {
                this.randomS = data.random;
            }
            if (typeof data.func === 'number') {
                this.type = data.func;
                if (!this.setFunctions()) {
                    return false;
                }
            }
            if (typeof data.f === 'string') {
                this.f = data.f;
            }
            if (typeof data.drColor === 'object') {
                this.drColor = data.drColor;
            }
            if (typeof data.render3D === 'boolean') {
                this.render3D = data.render3D;
            }
            if (typeof data.animation === 'object') {
                this.animation = data.animation;
            }
            if (typeof data.x1 === 'number') {
                this.autoAdjust = false;
                this.initLimits(data);
            }

            this.min = (typeof data.min === 'number') ? data.min : 1;
            this.setComplexes();

            return true;
        }
        return false;
    }
    setComplexes() {
       // this.c1 = new CComplex(this.c1r, this.c1i);
        
       // this.c3 = new CComplex(this.c3r, this.c3i);
        this.cP = new CComplex(this.p, this.p);
    }
    applyAnimationVariation(colorsService) {
        if (super.applyAnimationVariation(colorsService)) {
            if (typeof this.animation.d === "number") {
                this.d += this.animation.d;
                this.d = this.roundFloat(this.d);
            }
            if (typeof this.animation.c1 === "object") {
                this.c1.r += this.animation.c1.r;
                this.c1.r = this.roundFloat(this.c1.r);
            }
            if (typeof this.animation.n === "number") {
                this.n += this.animation.n;
                this.n = this.roundFloat(this.n);
            }
            return true;
        }
        return false;
    }
    changeParameter(actionName, value) {
        switch (actionName) {
            case 'change_base':
                this.base = parseFloat(value);
                return true;
            case 'change_a':
                this.a = parseFloat(value);
                return true;
            case 'change_b':
                this.b = parseFloat(value);
                return true;
            case 'change_n':
                this.n = parseFloat(value);
                return true;
            case 'change_d':
                this.d = parseFloat(value);
                return true;
            case 'change_c1r':
                this.c1.r = parseFloat(value);
                return true;
            case 'change_c1i':
                this.c1.i = parseFloat(value);
                return true;
            case 'change_p':
                this.p = parseFloat(value);
                this.setComplexes();
                return true;
            case 'change_m':
                this.m = parseFloat(value);
                return true;
            case 'change_c2i':
                this.c2.i = parseFloat(value);
                return true;
            case 'change_c2r':
                this.c2.r = parseFloat(value);
                return true;
            case 'change_c3i':
                this.c3.i = parseFloat(value);
                return true;
            case 'change_c3r':
                this.c3.r = parseFloat(value);
                return true;
        }
        return false;
    }
}
