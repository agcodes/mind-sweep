
import NewtonFractal from './newton-fractal';
import NewtonFractalParameters from './newton-fractal-parameters';
import Mandelbrot from './mandelbrot';
import MandelbrotParameters from './mandelbrot-parameters';

export default class FractalProcess {
    constructor() {
        this.params = null;
        this.gridAdapter = null;
        this.fractal = null;
        this.pts = [];
        this.nbPts = 0;
    }
    setSecondFractal(data, colorsService, defaultType) {
        if (data.fractal) {
            if (typeof data.fractal.process === "undefined") {
                data.fractal.process = defaultType;
            }
            if (data.fractal.process == "mandelbrot") {
                const mandelbrotParams = new MandelbrotParameters();
                mandelbrotParams.setData(data.fractal);
                mandelbrotParams.setFunctions();
                mandelbrotParams.setDrColor(mandelbrotParams.drColor, colorsService);
                mandelbrotParams.setInnerColor(mandelbrotParams.innerColor, colorsService);

                this.fractal.secondFractal = new Mandelbrot();
                this.fractal.secondFractal.initialize(colorsService, mandelbrotParams);
                this.fractal.secondFractal.setParameters(mandelbrotParams);
            }
            else {
                const newtonFractalParams = new NewtonFractalParameters();
                newtonFractalParams.setData(data.fractal);
                newtonFractalParams.setFunctions();
                newtonFractalParams.setDrColor(newtonFractalParams.drColor, colorsService);
                newtonFractalParams.setInnerColor(newtonFractalParams.innerColor, colorsService);

                this.fractal.secondFractal = new NewtonFractal();
                this.fractal.secondFractal.initialize(colorsService, newtonFractalParams);
                this.fractal.secondFractal.setParameters(newtonFractalParams);
            }
        }
    }
    initGrid(size) {
        if (typeof size === "undefined") {
            size = 8;
        }
        this.gridAdapter.initPtsMem(size);
    }
    init(params, gridAdapter, fractal) {
        this.pts = [];
        this.params = params;
        this.gridAdapter = gridAdapter;
        this.fractal = fractal;
    }
    setParameters(params) {
        this.params = params;
    }
    getEndSet() {
        return this.gridAdapter.getEndSet();
    }
    getProgress() {
        return this.gridAdapter.getScanProgress();
    }
}