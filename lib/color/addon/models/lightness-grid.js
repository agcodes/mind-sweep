export default class LightnessGrid {
  constructor() {
    this.square = null;
  }
  getObjects(shapesGenerator, colorsService, nb) {
    const objects = [];
    this.square = null;

    const h = Math.floor(Math.random() * 360);
    const s = Math.floor(Math.random() * (80 - 30) + 30);
    const l = Math.floor(Math.random() * 35);

    const pL = (100 - l - Math.random() * 25) / (nb * nb);

    const tab = [];
    for (let j = 0, lim = (nb * nb + 1); j < lim; j++) {
      tab.push(l + j * pL);
    }

    let maxL = 0;
    let iMax = 0;
    const p = shapesGenerator.getFitPolygon(4, 85, 0);
    p.setLineWidth(4);
    p.setStrokeColor([10, 10, 10]);
    objects.push(p);

    const squares = p.getGrid(nb);

    for (let i = 0, max = squares.length; i < max; i++) {
      const n = Math.floor(Math.random() * (tab.length - 1));
      squares[i].setFillColor(colorsService.hslToRgb([h, s, tab[n]]));
      squares[i].setLineWidth(1);
      squares[i].setStrokeColor([50, 50, 50]);
      if (tab[n] > maxL) {
        iMax = i;
        maxL = tab[n];
      }
      tab.splice(n, 1);
      objects.push(squares[i]);
    }

    this.square = squares[iMax];
    return objects;
  }
}
