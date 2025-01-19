import ImageManipulation from '../models/image-manipulation';
import CImg from 'addon-canvas/models/CImg';
import DrawingComponent from 'addon-canvas/components/drawing-component';

export default class ImageManipulationC extends DrawingComponent {
  red = null;
  green = null;
  blue = null;
  //imgSrc = 'assets/img/beach_1.jpg';
  imgSrc = 'assets/img/beach_1.jpg';
  initRender() {
		if (super.initRender() === false) {
			return false
		}
    this.initCanvas();
    this.addMainAnimation(() => this.draw(), 5);
    this.imageManipulation = new ImageManipulation();
    this.displayImg();
  }
  componentAction(actionName, data) {
    if (super.componentAction(actionName, data)) {
      switch (actionName) {
        case 'changeRgb':
          if (data.param1 === 'red') {
            this.red = null;
            this.green = 0;
            this.blue = 0;
          } else if (data.param1 === 'green') {
            this.red = 0;
            this.green = null;
            this.blue = 0;
          } else if (data.param1 === 'blue') {
            this.red = 0;
            this.green = 0;
            this.blue = null;
          } else if (data.param1 === 'reload') {
            this.red = null;
            this.green = null;
            this.blue = null;
          }
          this.changeRgb(true);
          return true;
        case 'changeColor':
          if (data.param1 === 'red') {
            this.red = parseInt(data.value);
            this.changeRgb();
          }
          if (data.param1 === 'green') {
            this.green = parseInt(data.value);
            this.changeRgb();
          }
          if (data.param1 === 'blue') {
            this.blue = parseInt(data.value);
            this.changeRgb();
          }
          return true;
        case 'edge-detect':
          this.canvasService.edgeDetectFilter(100);
          this.canvasService.displayOffScreenCanvas(false);
          return true;
        case 'gray':
          this.canvasService.grayScaleFilter();
          this.canvasService.displayOffScreenCanvas(true);
          return true;
        case 'gaussian':
          this.canvasService.grayScaleFilter();
          this.canvasService.gaussianFilter(5);
          this.canvasService.displayOffScreenCanvas(true);
          return true;
        case 'edge-thin':
          this.canvasService.edgeThinningFilter([250, 0, 0], 100);
          this.canvasService.displayOffScreenCanvas(true);
          return true;
        case 'reload':
          this.displayImg();
          return true;
        case 'loadImg':
          this.imgSrc = data.value;
          this.displayImg();
          return true;
      }
    }
  }
  changeRgb(reloadImg) {
    if (reloadImg) {
      this.initCanvas();
      const img = new CImg(0, 0, 0, 0, null, this.imgSrc);
      this.canvasService.drawService.drawImage(img, () => {
        this.changeRgb2();
      }, 0, 0, null, 0.9, 1);
    } else {
      this.changeRgb2();
    }
  }
  changeRgb2() {
    this.canvasService.getImageData();
    this.imageManipulation.changeRgb(this.canvasService.canvasData.getData(), [this.red, this.green, this.blue, null]);
    this.canvasService.putImageData();
  }
  /*startComponentAnimation() {
    this.initCanvas();
    const that = this;
    this.canvasService.createBuffer();
    consts img = new CImg(0, 0, 0, 0, null, this.imgSrc);
    this.canvasService.drawImage(img, function() {
      that.startMainAnimation();
    } 0, 0, null, 0.8, 1);
    this.startMainAnimation();
  }*/
  createImg() {

  }
  /*changeColor() {
    this.canvasService.getImageData(0);
    this.imageManipulation.changeColor2(this.canvasService.canvasData.getData(), this.colorsService);
    this.canvasService.putImageData();
	}*/
  displayImg() {
    this.initCanvas();
    const img = new CImg(0, 0, 0, 0, null, this.imgSrc);
    this.canvasService.drawService.drawImage(img, () => {
      this.canvasService.getImageData();
      this.canvasService.putImageData();
    }, 0, 0, null, 0.85, 1);
  }
}
