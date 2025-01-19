export default class DissimilarityGrid {
  constructor() {
    this.square = null;
  }
  getObjects(shapesGenerator, colorsService, nb) {
    const objects = [];
    this.square = null;

    // [5-360]
    const h = Math.floor(Math.random() * 330 + 30);
    const n = Math.floor(Math.random() * nb * nb);

    // -4, 4
    const dH = Math.floor(Math.random() * (5 - 4) + 4) * ((Math.random() > 0.5) ? -1 : 1);

    // [30, 89]
    const s = 60 + Math.floor(Math.random() * 60) - 30;

    // -1, 0, 1
    const dS = Math.floor(Math.random() * 2) * ((Math.random() > 0.5) ? -2 : 1);

    //  [25, 74]
    const l = 50 + Math.floor(Math.random() * 50) - 25;
    const dL = Math.floor(Math.random() * 2) * ((Math.random() > 0.5) ? -1 : 1);

    const p = shapesGenerator.getFitPolygon(4, 85, 0);
    p.setLineWidth(4);
    p.setStrokeColor([10, 10, 10]);
    objects.push(p);

    const squares = p.getGrid(nb);
    for (let i = 0, max = squares.length; i < max; i++) {
      if (i === n) {
        squares[i].setFillColor(colorsService.lchToRgb([l + dL, s + dS, h - dH]));
        this.square = squares[i];
      } else {
        squares[i].setFillColor(colorsService.lchToRgb([l, s, h]));
      }
      squares[i].setLineWidth(2);
      squares[i].setStrokeColor([50, 50, 50]);
      objects.push(squares[i]);
    }
    return objects;
  }
}
