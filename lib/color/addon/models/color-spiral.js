import CLine from 'addon-canvas/models/CLine';

export default class ColorSpiral {
  getObjects(shapesGenerator, colorsService, j, size) {
    const objects = [];
    const c = shapesGenerator.getFitCircle(size - (j * 6));
    const ptCenter = c.getCenter();
    let angle = j * Math.PI / 5;
    const nb = 360 * 5;

    for (let i = 0; i < nb; i++) {
      objects.push(new CLine(0, 0, 0, 0, colorsService.hslToRgb([(i / nb * 360), 75 + j, 55 - j]), 0.5, ptCenter, c.getPointOnCircle(angle)));
      angle += Math.PI * 2 / nb;
    }
    return objects;
  }
}