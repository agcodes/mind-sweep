import ColorSpiral from '../models/color-spiral';
import DrawingComponent from 'addon-canvas/components/drawing-component';

export default class SpiralC extends DrawingComponent {
  indice = 0;
  indice2 = 1;
  size = 85;
  initRender() {
		if (super.initRender() === false) {
			return false
		}
    this.initCanvas();
    this.addMainAnimation(() => {
      if (this.indice < (this.size / 6)) {
        this.indice += 0.05;
      } else {
        this.indice = 0;
      }
      return this.draw();
    }, 10);
    this.canvasService.drawService.drawBlackBackground();
    return this.startComponentAnimation();
  }
  draw() {
		super.draw();
    return this.canvasService.drawService.drawObjects(new ColorSpiral().getObjects(this.canvasService.shapesGenerator, this.colorsService, this.indice * this.indice2, this.size));
  }
}
