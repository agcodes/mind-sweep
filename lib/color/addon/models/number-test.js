import CRect from 'addon-canvas/models/CRect';
import CText from 'addon-canvas/models/CText';

export default class NumberTest {
  constructor() {
    this.text = null;
  }
  getAnswer(shapesGenerator) {
    const objects = [];
    const w = Math.floor(shapesGenerator.getHeight() / 10);
    const answerText = new CText(shapesGenerator.getWidth() * 0.05, w * 1.2, w, w, [255, 255, 255], this.text.getText());
    answerText.setFont('Arial');
    objects.push(answerText);
    return objects;
  }
  getObjects(shapesGenerator, colorsService) {
    const objects = [];
    const h = Math.floor(Math.random() * 360 + 5);
    const s = 60 + Math.floor(Math.random() * (30 + 30)) - 30;
    const l = 40 + Math.floor(Math.random() * 30);

    const r = new CRect(shapesGenerator.getWidth() * 0.05, shapesGenerator.getHeight() * 0.2, shapesGenerator.getWidth() * 0.9, shapesGenerator.getHeight() * 0.7, null, [0, 0, 0], 3);
    r.setFillColor(colorsService.hslToRgb([h, s, l]));
    objects.push(r);

    const dH = 3;

    const x = Math.floor(Math.random() * (shapesGenerator.getWidth() * 0.6 - shapesGenerator.getWidth() / 10) + shapesGenerator.getWidth() / 10);
    const y = Math.floor(Math.random() * (shapesGenerator.getHeight() * 2 / 3 - shapesGenerator.getHeight() / 2) + shapesGenerator.getHeight() * 2 / 3);
    const w = Math.floor(shapesGenerator.getWidth() / 4);

    // number 11 - 99
    const number = Math.floor(Math.random() * 88) + 10;
    this.text = new CText(x, y, w, w, colorsService.hslToRgb([h - dH, s, l]), number);
    this.text.setFont('Arial');
    objects.push(this.text);

    return objects;
  }
}
