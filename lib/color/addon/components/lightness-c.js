import lightnessGrid from '../models/lightness-grid';
import CText from 'addon-canvas/models/CText';
import ColorsGameC from './colors-game-c';

export default class LightnessC extends ColorsGameC {
  indice = 0;
  lightnessGrid = null;
  score = 0;
  plays = 0;
  nb = 0;
  level = 0;
  found = false;
  displaySoluce = false;
  initRender() {
    if (super.initRender() === false) {
      return false
    }
    this.initCanvas();
    this.indice = 0;
    this.addMainAnimation(() => this.draw(), 0.5);
    this.lightnessGrid = new lightnessGrid();

    this.canvasService.canvasElement.onclick = (event) => {
      if (this.indice === 1) {
        const newMousePos = this.canvasService.getMousePosOnCanvas(event);
        const result = (this.isPointInRotatedSquare(newMousePos[0], newMousePos[1],
          [
            { x: this.lightnessGrid.square.points[0][0], y: this.lightnessGrid.square.points[0][1] },
            { x: this.lightnessGrid.square.points[1][0], y: this.lightnessGrid.square.points[1][1] },
            { x: this.lightnessGrid.square.points[2][0], y: this.lightnessGrid.square.points[2][1] },
            { x: this.lightnessGrid.square.points[3][0], y: this.lightnessGrid.square.points[3][1] },
          ]
        ));
        this.found = result;
        if (result) {

          this.score++;
        }
        this.indice = 2;
        this.displaySoluce = true;
        this.displayScore();
        this.drawSoluce();
      }
    };
    return this.startComponentAnimation();
  }
  startComponentAnimation() {
    this.initCanvas();
    this.indice = 0;
    this.plays = 0;
    this.score = 0;
    this.level = 0;
    this.nb = 2;
    this.displayScore();

    return this.startMainAnimation();
  }
  drawSoluce() {
    this.lightnessGrid.square.setStrokeColor(this.found ? [0, 255, 10] : [255, 0, 0]);
    this.lightnessGrid.square.setLineWidth(4);
    this.lightnessGrid.square.setShadow(15, [100, 100, 100]);
    this.canvasService.drawService.drawOneObject(this.lightnessGrid.square);
  }
  draw() {
    super.draw();

    if (this.plays == 30) {
      this.initCanvas(false);
      this.canvasService.drawService.drawOneObject(new CText(40, this.canvasService.shapesGenerator.getHeight() / 2, 50, 50, [255, 255, 255], `Your score : ${Math.round(this.score / this.plays * 100)} %`));
      return false;
    }
    else if (this.indice == 0) {
      this.indice = 3;
      this.canvasService.drawService.drawOneObject(new CText(40, this.canvasService.shapesGenerator.getHeight() / 2, 50, 50, [255, 255, 255], "Click on the lightest color"));
    }
    else {
      if (this.indice === 1 || this.displaySoluce == true) {
        // display soluce
        const result2 = this.drawSoluce();
        this.displaySoluce = false;
        this.indice = 2;
        return result2;
      } else {
        if (this.plays % 5 == 0 && this.nb < 6) {
          this.nb++;
          this.level++;
          this.displayLevel();
        }
        // start
        this.plays++;
        this.initCanvas(false);
        this.found = false;
        this.displayScore();
        const result = this.canvasService.drawService.drawObjects(this.lightnessGrid.getObjects(this.canvasService.shapesGenerator, this.colorsService, this.nb));
        this.indice = 1;
        return result;
      }
    }
  }
}
