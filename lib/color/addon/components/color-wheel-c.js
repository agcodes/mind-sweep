import ColorWheel from '../models/color-wheel';
import DrawingComponent from 'addon-canvas/components/drawing-component';

export default class ColorWheelC extends DrawingComponent {
  angle = 0;
  initRender() {
		if (super.initRender() === false) {
			return false
		}
    this.initCanvas();
    this.addMainAnimation(() => {
      this.angle += 2 * Math.PI / 400;
      return this.draw();
    }, 20);
    return this.startComponentAnimation();
  }
  draw() {
		super.draw();
    const colorWheel = new ColorWheel();
    this.initCanvas(false);
    this.canvasService.drawService.drawBlackBackground();
    return this.canvasService.drawService.drawObjects(colorWheel.getObjects(this.canvasService.shapesGenerator, this.colorsService, this.angle));
  }
}
