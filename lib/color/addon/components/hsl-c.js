import DrawingComponent from 'addon-canvas/components/drawing-component';

export default class HslC extends DrawingComponent {
    initRender() {
        if (super.initRender() === false) {
            return false
        }
        this.initCanvas();
        return this.execDraw();
    }
    draw() {
        super.draw();

        this.canvasService.createImageData(true);
        this.canvasService.addBackgroundInImageData([0, 0, 0]);
        this.canvasService.putImageData();

        const w = this.canvasService.gridAdapter.limitWidth;
        const h = this.canvasService.gridAdapter.limitHeight;

        const pts = [];
        for (let i = 0; i < w; i++) {
            for (let j = 0; j < h; j++) {
                pts.push([i, j, null, this.colorsService.hslToRgb([i / w * 360, 100-j / h * 100, 60])]);
            }
        }

        this.canvasService.addPointsInData(pts, null, 1);
        return this.canvasService.putImageData(true, pts);
    }
}