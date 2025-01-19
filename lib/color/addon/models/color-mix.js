export default class ColorMix {
  constructor() {
    this.color1 = null;
    this.color2 = null;
    this.r = 100;
    this.g = 0;
    this.b = 0;
    this.h = 0;
    this.s = 50;
    this.l = 80;
    this.indice = 0;
  }
  initialize(colorsService) {
    this.h += 2;
    if (this.h > 360) {
      this.h = 0;
      this.indice++;
      this.s += 10;
    }
    if (this.s > 100) {
      this.s = 50;
      this.l++;
    }
    if (this.l > 100) {
      this.l = 80;
    }
    this.color1 = colorsService.hslToRgb([this.h, this.s, 80]);
    this.color2 = [255 - this.color1[0], 255 - this.color1[1], 255 - this.color1[2]];
  }
  getObjects(shapesGenerator, colorsService) {
    const w = 40;
    const objects = [];

    const c1 = shapesGenerator.getFitCircle(w, this.color1, this.color1);
    const c2 = shapesGenerator.getFitCircle(w, this.color2, this.color2);

    c1.setLineWidth(3);
    c2.setLineWidth(3);

    if (this.indice % 2 === 0) {
      c1.translation([-c1.getRadius() * (this.h / 360) / 2, c1.getRadius() / 5]);
      c2.translation([-c2.getRadius() / 2 + c2.getRadius() * (this.h / 360) / 2, -c2.getRadius() + c2.getRadius() / 5]);
    } else {
      c1.translation([-c1.getRadius() * 1 / 2 + c1.getRadius() * (this.h / 360) / 2, c1.getRadius() / 5]);
      c2.translation([-c2.getRadius() / 2 + c2.getRadius() * 1 / 2 - c2.getRadius() * (this.h / 360) / 2, -c2.getRadius() + c2.getRadius() / 5]);
    }

    objects.push(c1);
    objects.push(c2);

    const intersectionObjects = c1.getIntersectionWithACircle(c2, colorsService.addColors([c1.getFillColor(), c2.getFillColor()]));
    for (let index = 0; index < intersectionObjects.length; index++) {
      objects.push(intersectionObjects[index]);
    }

    return objects;
  }
}
