export default class ColorMix {
  constructor() {
    this.color1 = null;
    this.color2 = null;
    this.color3 = null;
  }
  getMixColor(colors) {
    const color = [0, 0, 0];
    for (let j = 0; j < 3; j++) {
      for (let index = 0; index < colors.length; index++) {
        color[j] += colors[index][j];
      }
    }
    return color;
  }
  initialize() {
    this.color1 = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
    this.color3 = [255 - this.color1[0], 255 - this.color1[1], 255 - this.color1[2]];
  }
  getObjects(shapesGenerator) {
    let w = 40;
    const deltaAngle = 0.012;
		const circles = [];
		const objects = [];
    const color1 = [this.color1];
    const color2 = [this.color2];
    const color3 = [this.color3];

    const c1 = shapesGenerator.getFitCircle(w, color1, color1);
    const c2 = shapesGenerator.getFitCircle(w, color2, color2);
    const c3 = shapesGenerator.getFitCircle(w, color3, color3);

    const cWhite = shapesGenerator.getFitPolygon(3, 27, 0.6);
    cWhite.setFillColor([255, 255, 255]);
    cWhite.translation([-c1.getRadius() / 2, -c1.getRadius() / 2 + 16]);

    c2.translation([-c2.getRadius(), -5]);
    c3.translation([-c2.getRadius() / 2, -c3.getRadius()]);

    circles.push(c1);
    circles.push(c2);
    circles.push(c3);

    objects.push(c1);
    objects.push(c3);

    let i = 0;
    let k = 2;
    const n = 1;
    for (let index = 0; index < n; index++) {
      /* if ((j + 1) > (circles.length - 1)) {
        i = 1;
        k = 2;
      } else {
        i = 0;
        k = j + 1;
      } */
      // C1 / C2
      const pts = circles[i].getIntersectionPointsWithACircle(circles[k]);
      let angles = [];

      for (let index = 0; index < pts.length; index++) {
        objects.push(shapesGenerator.getPoint(pts[index], [255, 22, 2], 2));
        angles.push(circles[i].getAngleFromPoint(pts[index]));
      }
      const c4 = shapesGenerator.getFitCircle(w, [0, 0, 0], [0, 0, 0]);
      c4.setPosition(circles[i].getPosition());
      const color = this.getMixColor([circles[k].getFillColor(), circles[i].getFillColor()]);
      
      c4.setFillColor(color);
      c4.setStrokeColor(color);
      c4.setLineWidth(3);
      c4.setRadiusF(angles[0] + deltaAngle);
      c4.setRadiusI(angles[1] - deltaAngle);
      objects.push(c4);

      angles = [];
      for (let index = 0; index < pts.length; index++) {
        objects.push(shapesGenerator.getPoint(pts[index], [255, 22, 2], 2));
        angles.push(circles[k].getAngleFromPoint(pts[index]));
      }
			
      const c5 = shapesGenerator.getFitCircle(w, [0, 0, 0], [0, 0, 0]);
      c5.setPosition(circles[k].getPosition());

      c5.setFillColor(color);
      c5.setStrokeColor(color);
      c5.setLineWidth(3);
      c5.setRadiusF(angles[1] + deltaAngle);
      c5.setRadiusI(angles[0] - deltaAngle);
      objects.push(c5);
    }

    return objects;
  }
}
