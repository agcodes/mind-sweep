export default class ColorWheel {
  getObjects(shapesGenerator, colorsService, angle) {
    const objects = [];
    angle = angle % (2 * Math.PI);
    const c0 = shapesGenerator.getFitCircle(60);
    const c1 = shapesGenerator.getFitCircle(29.3);

    for (let i = 0, max = 7; i < max; i++) {
      c1.defCenter(c0.getPointOnCircle(angle));
      const p1 = shapesGenerator.getPolygonFromCircle(c1, angle, 5);
      p1.setFillColor(colorsService.hslToRgb([((290 + i * 10) * angle / Math.PI), 70, 50]));
      p1.setStrokeColor(c1.getFillColor());
      objects.push(p1);
      angle += 2 * Math.PI / max;
    }
    return objects;
  }
}
