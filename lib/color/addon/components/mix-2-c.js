import ColorMix2 from '../models/color-mix-2';

import DrawingComponent from 'addon-canvas/components/drawing-component';

export default class Mix2C extends DrawingComponent {
  indice = 0;
  initRender() {
		if (super.initRender() === false) {
			return false
		}
    this.initCanvas();
    this.colorMix2 = new ColorMix2();
    this.addMainAnimation(() => {
      if (this.indice > 255) {
        this.indice = 0;
      }
      this.indice += 1;
      return this.draw();
    }, 15);
    return this.startComponentAnimation();
  }
  draw() {
		super.draw();
    this.canvasService.drawService.drawBlackBackground();
    return this.canvasService.drawService.drawObjects(this.colorMix2.getObjects(this.canvasService.shapesGenerator, this.colorsService));
  }
}
