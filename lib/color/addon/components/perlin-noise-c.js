import PerlinNoise from '../models/perlin-noise';

import DrawingComponent from 'addon-canvas/components/drawing-component';

export default class PerlinNoiseC extends DrawingComponent {
  perlinNoise = null;
  color = null;
  initRender() {
    if (super.initRender() === false) {
      return false
    }
    this.perlinNoise = new PerlinNoise();
    this.initCanvas();
    this.initDraw();
    this.addMainAnimation(() => this.newIteration(), 5);
    return this.startComponentAnimation();
  }
  newIteration() {
    this.indice++;
    if (this.draw() === false) {
      return false;
    }
    return (this.perlinNoise.step > 2);
  }
  draw() {
    super.draw();
    const pts = this.perlinNoise.newIteration(this.colorsService, 200 + this.indice / 10, 200 + this.indice);
    return this.canvasService.drawService.drawPoints(pts, null, this.perlinNoise.step);
  }
  startComponentAnimation() {
    this.initDraw();
    return this.startMainAnimation();
  }
  initDraw() {
    this.indice = 0;
    this.perlinNoise = new PerlinNoise();
    this.perlinNoise.initialize(this.canvasService.shapesGenerator);
  }
}
