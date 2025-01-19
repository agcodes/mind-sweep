export default class ColorMix2 {
  constructor() {
    this.angle = 0;
    this.dir = 1;
    this.indice = 0;
    this.a = 0;
    this.b = 0;
    this.nb = 4;
    this.size = 30;
  }
  getObjects(shapesGenerator, colorsService) {
    this.indice += 1;
    const objects = [];
    const max = 6;
    this.angle += 2 * Math.PI / 400;

    if ((this.indice) > 255) {
      this.indice = 0;
    }

    this.b = 255 - this.indice;

    if (this.indice % 400 === 0) {
      this.nb++;
    }
    this.a = (this.indice / 2);

    const colors = [
      [this.b, this.a, this.a],
      [this.a, this.b, this.a],
      [this.a, this.a, this.b]
    ];

    const c0 = shapesGenerator.getFitCircle(46);
    c0.setFillColor(colorsService.addColors(colors));
    objects.push(c0);
    const c1 = shapesGenerator.getFitCircle(this.size);

    const objects2 = [];
    for (let i = 0; i < max; i++) {
      c1.defCenter(c0.getPointOnCircle(this.angle));
      const p1 = shapesGenerator.getPolygonFromCircle(c1, this.angle, this.nb);
      p1.setStrokeColor(c1.getFillColor());
      if (i % 2 === 0) {
        p1.setFillColor(colors[i / 2]);
        objects.push(p1);
      } else {
        // 1
        if ((i + 1) < max) {
          // 0
          p1.setFillColor(colorsService.addColors([colors[(i + 1) / 2], colors[(i - 1) / 2]]));
        } else {
          p1.setFillColor(colorsService.addColors([colors[0], colors[(i - 1) / 2]]));
        }
        objects2.push(p1);
      }
      this.angle += 2 * Math.PI / max;
    }
    for (let index = 0; index < objects2.length; index++) {
      objects.push(objects2[index]);
    }
    return objects;
  }
}
