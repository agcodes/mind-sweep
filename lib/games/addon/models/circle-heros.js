import CCircle from 'addon-canvas/models/CCircle';

class CircleHeros extends CCircle {
  constructor(x, y, width_, height_, fillColor, strokeColor) {
    super(x, y, width_, height_, fillColor, strokeColor);
    this.originReturn = false;
    this.vectorO = [];
  }

  getVectorOX() {
    return this.vectorO[0];
  }

  getVectorOY() {
    return this.vectorO[1];
  }

  getVectorO() {
    return this.vectorO;
  }

  setVectorO(v) {
    this.vectorO = v;
  }

  setVectorOX(v) {
    this.vectorO[0] = v;
  }

  setVectorOY(v) {
    this.vectorO[1] = v;
  }

  setOriginReturn(b) {
    this.originReturn = b;
  }

  getOriginReturn() {
    return this.originReturn;
  }
}

export default CircleHeros;
