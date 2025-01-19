import FractalProcess from './fractal-process';

export default class MandelbrotProcess extends FractalProcess {
    constructor() {
        super();
    }
    getRandomPoints() {
        this.fractal.getRandomPoints(3000, false);
    }
    defGrid() {
        // def grid
        if (this.params.autoAdjust === true) {
            this.pts = this.gridAdapter.getPointsOnPlan(this.fractal.ptsTmp, true, this.margin, null, false, (this.params.dW === 0), [1.07, 1.07, 0, 0]);
            this.fractal.ptsTmp = null;
        } else {
            this.pts = this.gridAdapter.getPointsOnPlan(this.params.getInterval(), true, this.margin, 0, false, true, [1, 1, 1]);
        }
        this.gridAdapter.defGridLimit(this.pts);
    }
    getPts(nb) {
        const pts1 = [];
        for (let index = 0; index < nb; index++) {
            // pick a point on canvas
            const ptCanvas = this.gridAdapter.getNewPoint(1, true);
            if (ptCanvas === null) {
                return pts1;
            }

            const pt = this.getPt([ptCanvas[0], ptCanvas[1]]);
            if (pt) {
                if (this.params.animation.t0 !== 0) {
                    pts1.push([ptCanvas[0], ptCanvas[1], this.params.t0 * 12, pt[3], pt[4]]);
                } else if (this.params.d3 !== 0) {
                    pts1.push(this.gridAdapter.addZ([ptCanvas[0], ptCanvas[1], pt[2], pt[3]], this.params.d3));
                } else {
                    // pt[3] copy color
                    pts1.push([ptCanvas[0], ptCanvas[1], this.params.render3D ? pt[2] : null, pt[3], pt[4]]);
                }
            }
            else if (this.gridAdapter.getEndGrid() === false) {
                this.gridAdapter.skipPts(2);
            }
        }
        return pts1;
    }
    getPt(ptCanvas) {
        if (this.gridAdapter.isInCoordLimits(ptCanvas)) {
            const pt = this.gridAdapter.getPointFromPlan(ptCanvas, false, 8);
            this.nbPts++;
            return this.fractal.getPt(pt[0], pt[1], this.params.t0, this.params.d3, ptCanvas, this.recycle);
        }
        return null;
    }
}