import ColorMix from '../models/color-mix';
import DrawingComponent from 'addon-canvas/components/drawing-component';

export default class MixC extends DrawingComponent {
  initRender() {
		if (super.initRender() === false) {
			return false
		}
    this.initCanvas();
    this.colorMix = new ColorMix();

    this.addMainAnimation(() => {
      if (this.indice > 255) {
        this.indice = 0;
      }
      this.indice += 1;
      return this.draw();
    }, 20);

    return this.startComponentAnimation();
  }
  draw() {
		super.draw();
    this.canvasService.drawService.drawBlackBackground();
    this.colorMix.initialize(this.colorsService);
    return this.canvasService.drawService.drawObjects(this.colorMix.getObjects(this.canvasService.shapesGenerator, this.colorsService));
  }
}
