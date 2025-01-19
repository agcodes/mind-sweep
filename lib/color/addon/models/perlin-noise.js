export default class PerlinNoise {
  constructor() {
    this.angle = 0;
    this.indice = 0;
    this.data = null;
    this.ratio = 0;
    this.w = 0;
    this.h = 0;
    this.p = null;
    this.step = 20;
    this.permutation = null;
  }
  initialize(shapesGenerator) {
    this.w = shapesGenerator.getWidth() + this.step;
    this.h = shapesGenerator.getHeight() + this.step;
    this.step = this.h / 80;
  }
  newIteration(colorsService, h, dh) {
    const pts = [];
    for (let indexX = 0; indexX <= this.w + this.step; indexX += this.step) {
      for (let indexY = 0; indexY <= this.h + this.step; indexY += this.step) {
        pts.push([indexX, indexY]);
      }
    }
    return colorsService.setPointsPerlinNoiseColor(pts, h, 50, 50, dh, 10, 10);
  }
}
