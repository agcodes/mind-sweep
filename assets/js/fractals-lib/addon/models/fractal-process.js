export default class FractalProcess {
    constructor() {
        this.params = null;
        this.gridAdapter = null;
        this.fractal = null;
        this.pts = [];
        this.nbPts = 0;
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