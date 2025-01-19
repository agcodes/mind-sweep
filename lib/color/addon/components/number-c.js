import NumberTest from '../models/number-test';
import DrawingComponent from 'addon-canvas/components/drawing-component';

export default class NumberC extends DrawingComponent {
  color = null;
  numberTest = null;
  initRender() {
    if (super.initRender() === false) {
      return false
    }
    this.initCanvas();
    this.numberTest = new NumberTest();
    this.addMainAnimation(() => this.draw(), 0.3);
    return this.startComponentAnimation();
  }
  draw() {
    super.draw();
    if (this.indice === 1) {
      this.canvasService.drawService.drawObjects(this.numberTest.getAnswer(this.canvasService.shapesGenerator));
      this.indice = 0;
    } else {
      this.color = null;
      this.initCanvas(false);
      this.canvasService.drawService.drawObjects(this.numberTest.getObjects(this.canvasService.shapesGenerator, this.colorsService));
      this.indice++;
    }
    return true;
  }
}
