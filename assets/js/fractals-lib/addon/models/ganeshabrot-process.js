import FractalProcess from './fractal-process';

export default class GaneshabrotProcess extends FractalProcess {
    constructor() {
        super();
    }
    defGrid() {
        this.fractal.initGrid(this.gridAdapter.limitWidth, this.gridAdapter.limitHeight);
        this.gridAdapter.defGridLimit(this.gridAdapter.getPointsOnPlan(this.params.getInterval(), true, [0.02, 0.02], null, false, true));
        this.gridAdapter.initPtsMem(8);
    }
    getPts(nb) {
		const pts = [];
		for (let index = 0; index < nb; index++) {
			const ptCanvas = this.gridAdapter.getNewPoint(2);
			if (ptCanvas === null) {
				return null;
			}
			if (this.params.xSymetry === false || ptCanvas[0] <= this.gridAdapter.limitWidth / 2) {
				pts.push(this.gridAdapter.getPointFromPlan(ptCanvas));
			}
		}

		return this.fractal.handleIterationsPoints(this.gridAdapter.getPointsOnPlan(this.fractal.getPts(pts)));
	}
}