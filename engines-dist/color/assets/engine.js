define.alias("addon-canvas/components/canvas-c", "color/components/canvas-c");
define.alias("common-components/components/form/canvas-menu", "color/components/canvas-menu");
define("color/components/color-wheel-c", ["exports", "color/models/color-wheel", "addon-canvas/components/drawing-component"], function (_exports, _colorWheel, _drawingComponent) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"color/models/color-wheel",0,"addon-canvas/components/drawing-component"eaimeta@70e063a35619d71f
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  class ColorWheelC extends _drawingComponent.default {
    constructor(...args) {
      super(...args);
      _defineProperty(this, "angle", 0);
    }
    initRender() {
      if (super.initRender() === false) {
        return false;
      }
      this.initCanvas();
      this.addMainAnimation(() => {
        this.angle += 2 * Math.PI / 400;
        return this.draw();
      }, 20);
      return this.startComponentAnimation();
    }
    draw() {
      super.draw();
      const colorWheel = new _colorWheel.default();
      this.initCanvas(false);
      this.canvasService.drawService.drawBlackBackground();
      return this.canvasService.drawService.drawObjects(colorWheel.getObjects(this.canvasService.shapesGenerator, this.colorsService, this.angle));
    }
  }
  _exports.default = ColorWheelC;
});
define("color/components/colors-game-c", ["exports", "addon-canvas/components/drawing-component"], function (_exports, _drawingComponent) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"addon-canvas/components/drawing-component"eaimeta@70e063a35619d71f
  class ColorsGameC extends _drawingComponent.default {
    isPointInRotatedSquare(px, py, square) {
      // Fonction pour vérifier si deux vecteurs sont dans le même sens
      function crossProduct(v1, v2) {
        return v1.x * v2.y - v1.y * v2.x;
      }

      // Crée des vecteurs pour chaque côté du carré et le point
      for (let i = 0; i < 4; i++) {
        const p1 = square[i];
        const p2 = square[(i + 1) % 4]; // Prochain sommet
        const edgeVector = {
          x: p2.x - p1.x,
          y: p2.y - p1.y
        };
        const pointVector = {
          x: px - p1.x,
          y: py - p1.y
        };

        // Vérifie le produit vectoriel
        if (crossProduct(edgeVector, pointVector) < 0) {
          return false; // Le point est à l'extérieur d'un côté
        }
      }
      return true; // Le point est à l'intérieur
    }
    displayScore() {
      const element = document.getElementById('span-nb-points');
      if (element) {
        element.innerHTML = `${this.score} / ${this.plays}`;
      }
    }
    displayLevel() {
      const element = document.getElementById('span-level');
      if (element) {
        element.innerHTML = `Level ${this.level}`;
      }
    }
  }
  _exports.default = ColorsGameC;
});
define.alias("univers-app-components/components/cursor-hover", "color/components/cursor-hover");
define.alias("univers-app-components/components/deviant-art-item", "color/components/deviant-art-item");
define("color/components/dissimilarity-c", ["exports", "color/models/dissimilarity-grid", "addon-canvas/models/CText", "color/components/colors-game-c"], function (_exports, _dissimilarityGrid, _CText, _colorsGameC) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"color/models/dissimilarity-grid",0,"addon-canvas/models/CText",0,"color/components/colors-game-c"eaimeta@70e063a35619d71f
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  class DissimilarityC extends _colorsGameC.default {
    constructor(...args) {
      super(...args);
      _defineProperty(this, "indice", 0);
      _defineProperty(this, "dissimilarityGrid", null);
      _defineProperty(this, "score", 0);
      _defineProperty(this, "plays", 0);
      _defineProperty(this, "nb", 2);
      _defineProperty(this, "found", false);
      _defineProperty(this, "displaySoluce", false);
    }
    initRender() {
      if (super.initRender() === false) {
        return false;
      }
      this.initCanvas();
      this.addMainAnimation(() => this.draw(), 0.5);
      this.dissimilarityGrid = new _dissimilarityGrid.default();
      this.canvasService.canvasElement.onclick = event => {
        if (this.indice === 1) {
          const newMousePos = this.canvasService.getMousePosOnCanvas(event);
          const result = this.isPointInRotatedSquare(newMousePos[0], newMousePos[1], [{
            x: this.dissimilarityGrid.square.points[0][0],
            y: this.dissimilarityGrid.square.points[0][1]
          }, {
            x: this.dissimilarityGrid.square.points[1][0],
            y: this.dissimilarityGrid.square.points[1][1]
          }, {
            x: this.dissimilarityGrid.square.points[2][0],
            y: this.dissimilarityGrid.square.points[2][1]
          }, {
            x: this.dissimilarityGrid.square.points[3][0],
            y: this.dissimilarityGrid.square.points[3][1]
          }]);
          this.found = result;
          if (result) {
            this.score++;
          }
          this.indice = 2;
          this.displaySoluce = true;
          this.displayScore();
          this.drawSoluce();
        }
      };
      return this.startComponentAnimation();
    }
    startComponentAnimation() {
      this.initCanvas();
      this.indice = 0;
      this.plays = 0;
      this.score = 0;
      this.nb = 1;
      this.displayScore();
      return this.startMainAnimation();
    }
    drawSoluce() {
      this.displayScore();
      this.dissimilarityGrid.square.setStrokeColor(this.found ? [0, 255, 10] : [255, 0, 0]);
      this.dissimilarityGrid.square.setLineWidth(4);
      this.dissimilarityGrid.square.setShadow(10, [100, 100, 100]);
      return this.canvasService.drawService.drawOneObject(this.dissimilarityGrid.square);
    }
    draw() {
      super.draw();
      if (this.plays == 50) {
        this.initCanvas(false);
        this.canvasService.drawService.drawOneObject(new _CText.default(40, this.canvasService.shapesGenerator.getHeight() / 2, 50, 50, [255, 255, 255], `Your score : ${Math.round(this.score / this.plays * 100)} %`));
        return false;
      } else if (this.indice == 0) {
        this.indice = 3;
        this.canvasService.drawService.drawOneObject(new _CText.default(40, this.canvasService.shapesGenerator.getHeight() / 2, 50, 50, [255, 255, 255], "Click on the different color"));
      } else {
        if (this.indice === 1 || this.displaySoluce == true) {
          // display soluce

          const result2 = this.drawSoluce();
          this.displaySoluce = false;
          this.indice = 2;
          return result2;
        } else {
          // start
          if (this.plays % 5 == 0 && this.nb < 7) {
            this.nb++;
          }
          this.plays++;
          this.initCanvas(false);
          this.found = false;
          this.displayScore();
          const result = this.canvasService.drawService.drawObjects(this.dissimilarityGrid.getObjects(this.canvasService.shapesGenerator, this.colorsService, this.nb));
          this.indice = 1;
          return result;
        }
      }
    }
  }
  _exports.default = DissimilarityC;
});
define.alias("addon-canvas/components/drawing-component", "color/components/drawing-component");
define.alias("common-components/components/form/form-component", "color/components/form-component");
define("color/components/form/dissimilarity-f", ["exports", "common-components/components/form/form-component"], function (_exports, _formComponent) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"common-components/components/form/form-component"eaimeta@70e063a35619d71f
  class _default extends _formComponent.default {}
  _exports.default = _default;
});
define("color/components/form/image-color-f", ["exports", "common-components/components/form/form-component", "@ember/object"], function (_exports, _formComponent, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class;
  0; //eaimeta@70e063a35619d71f0,"common-components/components/form/form-component",0,"@ember/object"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  let ImageColorF = _exports.default = (_class = class ImageColorF extends _formComponent.default {
    upload(eValue, event) {
      const reader = new FileReader();
      const file = event.target.files[0];
      // Note: reading file is async
      reader.onload = () => {
        this.actionsHandler.componentValueAction("loadImg", reader.result, this.componentID);
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    }
  }, _applyDecoratedDescriptor(_class.prototype, "upload", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "upload"), _class.prototype), _class);
});
define("color/components/form/lightness-f", ["exports", "common-components/components/form/form-component"], function (_exports, _formComponent) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"common-components/components/form/form-component"eaimeta@70e063a35619d71f
  class _default extends _formComponent.default {}
  _exports.default = _default;
});
define.alias("univers-app-components/components/gallery-item", "color/components/gallery-item");
define.alias("univers-app-components/components/gallery-thumbnail", "color/components/gallery-thumbnail");
define.alias("univers-app-components/components/gallery-thumbnails", "color/components/gallery-thumbnails");
define.alias("univers-app-components/components/gallery", "color/components/gallery");
define("color/components/hsl-c", ["exports", "addon-canvas/components/drawing-component"], function (_exports, _drawingComponent) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"addon-canvas/components/drawing-component"eaimeta@70e063a35619d71f
  class HslC extends _drawingComponent.default {
    initRender() {
      if (super.initRender() === false) {
        return false;
      }
      this.initCanvas();
      return this.execDraw();
    }
    draw() {
      super.draw();
      this.canvasService.createImageData(true);
      this.canvasService.addBackgroundInImageData([0, 0, 0]);
      this.canvasService.putImageData();
      const w = this.canvasService.gridAdapter.limitWidth;
      const h = this.canvasService.gridAdapter.limitHeight;
      const pts = [];
      for (let i = 0; i < w; i++) {
        for (let j = 0; j < h; j++) {
          pts.push([i, j, null, this.colorsService.hslToRgb([i / w * 360, 100 - j / h * 100, 60])]);
        }
      }
      this.canvasService.addPointsInData(pts, null, 1);
      return this.canvasService.putImageData(true, pts);
    }
  }
  _exports.default = HslC;
});
define("color/components/image-manipulation-c", ["exports", "color/models/image-manipulation", "addon-canvas/models/CImg", "addon-canvas/components/drawing-component"], function (_exports, _imageManipulation, _CImg, _drawingComponent) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"color/models/image-manipulation",0,"addon-canvas/models/CImg",0,"addon-canvas/components/drawing-component"eaimeta@70e063a35619d71f
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  class ImageManipulationC extends _drawingComponent.default {
    constructor(...args) {
      super(...args);
      _defineProperty(this, "red", null);
      _defineProperty(this, "green", null);
      _defineProperty(this, "blue", null);
      //imgSrc = 'assets/img/beach_1.jpg';
      _defineProperty(this, "imgSrc", 'assets/img/beach_1.jpg');
    }
    initRender() {
      if (super.initRender() === false) {
        return false;
      }
      this.initCanvas();
      this.addMainAnimation(() => this.draw(), 5);
      this.imageManipulation = new _imageManipulation.default();
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
        const img = new _CImg.default(0, 0, 0, 0, null, this.imgSrc);
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
    createImg() {}
    /*changeColor() {
      this.canvasService.getImageData(0);
      this.imageManipulation.changeColor2(this.canvasService.canvasData.getData(), this.colorsService);
      this.canvasService.putImageData();
    }*/
    displayImg() {
      this.initCanvas();
      const img = new _CImg.default(0, 0, 0, 0, null, this.imgSrc);
      this.canvasService.drawService.drawImage(img, () => {
        this.canvasService.getImageData();
        this.canvasService.putImageData();
      }, 0, 0, null, 0.85, 1);
    }
  }
  _exports.default = ImageManipulationC;
});
define.alias("common-components/components/form/input-check-box", "color/components/input-check-box");
define.alias("common-components/components/form/input-number-plus-minus", "color/components/input-number-plus-minus");
define.alias("common-components/components/form/input-text", "color/components/input-text");
define("color/components/lch-c", ["exports", "addon-canvas/components/drawing-component"], function (_exports, _drawingComponent) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"addon-canvas/components/drawing-component"eaimeta@70e063a35619d71f
  class LchC extends _drawingComponent.default {
    initRender() {
      if (super.initRender() === false) {
        return false;
      }
      this.initCanvas();
      return this.execDraw();
    }
    draw() {
      super.draw();
      this.canvasService.createImageData(true);
      this.canvasService.addBackgroundInImageData([0, 0, 0]);
      this.canvasService.putImageData();
      const w = this.canvasService.gridAdapter.limitWidth;
      const h = this.canvasService.gridAdapter.limitHeight;
      const pts = [];
      for (let i = 0; i < w; i++) {
        for (let j = 0; j < h; j++) {
          pts.push([i, j, null, this.colorsService.lchToRgb([60, 100 - j / h * 100, i / w * 360])]);
        }
      }
      this.canvasService.addPointsInData(pts, null, 1);
      return this.canvasService.putImageData(true, pts);
    }
  }
  _exports.default = LchC;
});
define("color/components/lightness-c", ["exports", "color/models/lightness-grid", "addon-canvas/models/CText", "color/components/colors-game-c"], function (_exports, _lightnessGrid, _CText, _colorsGameC) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"color/models/lightness-grid",0,"addon-canvas/models/CText",0,"color/components/colors-game-c"eaimeta@70e063a35619d71f
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  class LightnessC extends _colorsGameC.default {
    constructor(...args) {
      super(...args);
      _defineProperty(this, "indice", 0);
      _defineProperty(this, "lightnessGrid", null);
      _defineProperty(this, "score", 0);
      _defineProperty(this, "plays", 0);
      _defineProperty(this, "nb", 0);
      _defineProperty(this, "level", 0);
      _defineProperty(this, "found", false);
      _defineProperty(this, "displaySoluce", false);
    }
    initRender() {
      if (super.initRender() === false) {
        return false;
      }
      this.initCanvas();
      this.indice = 0;
      this.addMainAnimation(() => this.draw(), 0.5);
      this.lightnessGrid = new _lightnessGrid.default();
      this.canvasService.canvasElement.onclick = event => {
        if (this.indice === 1) {
          const newMousePos = this.canvasService.getMousePosOnCanvas(event);
          const result = this.isPointInRotatedSquare(newMousePos[0], newMousePos[1], [{
            x: this.lightnessGrid.square.points[0][0],
            y: this.lightnessGrid.square.points[0][1]
          }, {
            x: this.lightnessGrid.square.points[1][0],
            y: this.lightnessGrid.square.points[1][1]
          }, {
            x: this.lightnessGrid.square.points[2][0],
            y: this.lightnessGrid.square.points[2][1]
          }, {
            x: this.lightnessGrid.square.points[3][0],
            y: this.lightnessGrid.square.points[3][1]
          }]);
          this.found = result;
          if (result) {
            this.score++;
          }
          this.indice = 2;
          this.displaySoluce = true;
          this.displayScore();
          this.drawSoluce();
        }
      };
      return this.startComponentAnimation();
    }
    startComponentAnimation() {
      this.initCanvas();
      this.indice = 0;
      this.plays = 0;
      this.score = 0;
      this.level = 0;
      this.nb = 2;
      this.displayScore();
      return this.startMainAnimation();
    }
    drawSoluce() {
      this.lightnessGrid.square.setStrokeColor(this.found ? [0, 255, 10] : [255, 0, 0]);
      this.lightnessGrid.square.setLineWidth(4);
      this.lightnessGrid.square.setShadow(15, [100, 100, 100]);
      this.canvasService.drawService.drawOneObject(this.lightnessGrid.square);
    }
    draw() {
      super.draw();
      if (this.plays == 30) {
        this.initCanvas(false);
        this.canvasService.drawService.drawOneObject(new _CText.default(40, this.canvasService.shapesGenerator.getHeight() / 2, 50, 50, [255, 255, 255], `Your score : ${Math.round(this.score / this.plays * 100)} %`));
        return false;
      } else if (this.indice == 0) {
        this.indice = 3;
        this.canvasService.drawService.drawOneObject(new _CText.default(40, this.canvasService.shapesGenerator.getHeight() / 2, 50, 50, [255, 255, 255], "Click on the lightest color"));
      } else {
        if (this.indice === 1 || this.displaySoluce == true) {
          // display soluce
          const result2 = this.drawSoluce();
          this.displaySoluce = false;
          this.indice = 2;
          return result2;
        } else {
          if (this.plays % 5 == 0 && this.nb < 6) {
            this.nb++;
            this.level++;
            this.displayLevel();
          }
          // start
          this.plays++;
          this.initCanvas(false);
          this.found = false;
          this.displayScore();
          const result = this.canvasService.drawService.drawObjects(this.lightnessGrid.getObjects(this.canvasService.shapesGenerator, this.colorsService, this.nb));
          this.indice = 1;
          return result;
        }
      }
    }
  }
  _exports.default = LightnessC;
});
define.alias("univers-app-components/components/links-navbar", "color/components/links-navbar");
define.alias("univers-app-components/components/main-menu", "color/components/main-menu");
define.alias("univers-app-components/components/main-navbar", "color/components/main-navbar");
define("color/components/mix-2-c", ["exports", "color/models/color-mix-2", "addon-canvas/components/drawing-component"], function (_exports, _colorMix, _drawingComponent) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"color/models/color-mix-2",0,"addon-canvas/components/drawing-component"eaimeta@70e063a35619d71f
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  class Mix2C extends _drawingComponent.default {
    constructor(...args) {
      super(...args);
      _defineProperty(this, "indice", 0);
    }
    initRender() {
      if (super.initRender() === false) {
        return false;
      }
      this.initCanvas();
      this.colorMix2 = new _colorMix.default();
      this.addMainAnimation(() => {
        if (this.indice > 255) {
          this.indice = 0;
        }
        this.indice += 1;
        return this.draw();
      }, 15);
      return this.startComponentAnimation();
    }
    draw() {
      super.draw();
      this.canvasService.drawService.drawBlackBackground();
      return this.canvasService.drawService.drawObjects(this.colorMix2.getObjects(this.canvasService.shapesGenerator, this.colorsService));
    }
  }
  _exports.default = Mix2C;
});
define("color/components/mix-c", ["exports", "color/models/color-mix", "addon-canvas/components/drawing-component"], function (_exports, _colorMix, _drawingComponent) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"color/models/color-mix",0,"addon-canvas/components/drawing-component"eaimeta@70e063a35619d71f
  class MixC extends _drawingComponent.default {
    initRender() {
      if (super.initRender() === false) {
        return false;
      }
      this.initCanvas();
      this.colorMix = new _colorMix.default();
      this.addMainAnimation(() => {
        if (this.indice > 255) {
          this.indice = 0;
        }
        this.indice += 1;
        return this.draw();
      }, 20);
      return this.startComponentAnimation();
    }
    draw() {
      super.draw();
      this.canvasService.drawService.drawBlackBackground();
      this.colorMix.initialize(this.colorsService);
      return this.canvasService.drawService.drawObjects(this.colorMix.getObjects(this.canvasService.shapesGenerator, this.colorsService));
    }
  }
  _exports.default = MixC;
});
define("color/components/number-c", ["exports", "color/models/number-test", "addon-canvas/components/drawing-component"], function (_exports, _numberTest, _drawingComponent) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"color/models/number-test",0,"addon-canvas/components/drawing-component"eaimeta@70e063a35619d71f
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  class NumberC extends _drawingComponent.default {
    constructor(...args) {
      super(...args);
      _defineProperty(this, "color", null);
      _defineProperty(this, "numberTest", null);
    }
    initRender() {
      if (super.initRender() === false) {
        return false;
      }
      this.initCanvas();
      this.numberTest = new _numberTest.default();
      this.addMainAnimation(() => this.draw(), 0.3);
      return this.startComponentAnimation();
    }
    draw() {
      super.draw();
      if (this.indice === 1) {
        this.canvasService.drawService.drawObjects(this.numberTest.getAnswer(this.canvasService.shapesGenerator));
        this.indice = 0;
      } else {
        this.color = null;
        this.initCanvas(false);
        this.canvasService.drawService.drawObjects(this.numberTest.getObjects(this.canvasService.shapesGenerator, this.colorsService));
        this.indice++;
      }
      return true;
    }
  }
  _exports.default = NumberC;
});
define("color/components/perlin-noise-c", ["exports", "color/models/perlin-noise", "addon-canvas/components/drawing-component"], function (_exports, _perlinNoise, _drawingComponent) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"color/models/perlin-noise",0,"addon-canvas/components/drawing-component"eaimeta@70e063a35619d71f
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  class PerlinNoiseC extends _drawingComponent.default {
    constructor(...args) {
      super(...args);
      _defineProperty(this, "perlinNoise", null);
      _defineProperty(this, "color", null);
    }
    initRender() {
      if (super.initRender() === false) {
        return false;
      }
      this.perlinNoise = new _perlinNoise.default();
      this.initCanvas();
      this.initDraw();
      this.addMainAnimation(() => this.newIteration(), 5);
      return this.startComponentAnimation();
    }
    newIteration() {
      this.indice++;
      if (this.draw() === false) {
        return false;
      }
      return this.perlinNoise.step > 2;
    }
    draw() {
      super.draw();
      const pts = this.perlinNoise.newIteration(this.colorsService, 200 + this.indice / 10, 200 + this.indice);
      return this.canvasService.drawService.drawPoints(pts, null, this.perlinNoise.step);
    }
    startComponentAnimation() {
      this.initDraw();
      return this.startMainAnimation();
    }
    initDraw() {
      this.indice = 0;
      this.perlinNoise = new _perlinNoise.default();
      this.perlinNoise.initialize(this.canvasService.shapesGenerator);
    }
  }
  _exports.default = PerlinNoiseC;
});
define.alias("univers-app-components/components/post-home-item", "color/components/post-home-item");
define.alias("univers-app-components/components/post-item", "color/components/post-item");
define.alias("univers-app-components/components/posts-list", "color/components/posts-list");
define.alias("addon-canvas/components/saved-img", "color/components/saved-img");
define("color/components/spiral-c", ["exports", "color/models/color-spiral", "addon-canvas/components/drawing-component"], function (_exports, _colorSpiral, _drawingComponent) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"color/models/color-spiral",0,"addon-canvas/components/drawing-component"eaimeta@70e063a35619d71f
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  class SpiralC extends _drawingComponent.default {
    constructor(...args) {
      super(...args);
      _defineProperty(this, "indice", 0);
      _defineProperty(this, "indice2", 1);
      _defineProperty(this, "size", 85);
    }
    initRender() {
      if (super.initRender() === false) {
        return false;
      }
      this.initCanvas();
      this.addMainAnimation(() => {
        if (this.indice < this.size / 6) {
          this.indice += 0.05;
        } else {
          this.indice = 0;
        }
        return this.draw();
      }, 10);
      this.canvasService.drawService.drawBlackBackground();
      return this.startComponentAnimation();
    }
    draw() {
      super.draw();
      return this.canvasService.drawService.drawObjects(new _colorSpiral.default().getObjects(this.canvasService.shapesGenerator, this.colorsService, this.indice * this.indice2, this.size));
    }
  }
  _exports.default = SpiralC;
});
define.alias("univers-app-components/components/switch-lang", "color/components/switch-lang");
define.alias("common-components/components/form/tabbed-form", "color/components/tabbed-form");
define.alias("common-components/components/text-input", "color/components/text-input");
define("color/config/environment", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  var config;
  try {
    var metaName = 'color/config/environment';
    var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
    config = JSON.parse(unescape(rawConfig));
  } catch (err) {
    throw new Error('Could not read config from meta tag with name "' + metaName + '" due to error: ' + err);
  }
  var _default = _exports.default = config;
});
define("color/engine", ["exports", "ember-engines/engine", "ember-load-initializers", "color/resolver", "color/config/environment"], function (_exports, _engine, _emberLoadInitializers, _resolver, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-engines/engine",0,"ember-load-initializers",0,"color/resolver",0,"color/config/environment"eaimeta@70e063a35619d71f
  const {
    modulePrefix
  } = _environment.default;
  const Eng = _engine.default.extend({
    modulePrefix,
    Resolver: _resolver.default,
    dependencies: _environment.default.dependencies
  });
  (0, _emberLoadInitializers.default)(Eng, modulePrefix);
  var _default = _exports.default = Eng;
});
define("color/helpers/eq", ["exports", "@ember/component/helper"], function (_exports, _helper) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/component/helper"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _helper.helper)(params => params[0] === params[1]);
});
define.alias("ember-intl/helpers/format-date", "color/helpers/format-date");
define.alias("ember-intl/helpers/format-list", "color/helpers/format-list");
define.alias("ember-intl/helpers/format-message", "color/helpers/format-message");
define.alias("common-components/helpers/format-money", "color/helpers/format-money");
define.alias("ember-intl/helpers/format-number", "color/helpers/format-number");
define.alias("ember-intl/helpers/format-relative", "color/helpers/format-relative");
define.alias("ember-intl/helpers/format-time", "color/helpers/format-time");
define("color/helpers/style", ["exports", "@ember/component/helper"], function (_exports, _helper) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/component/helper"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _helper.helper)(params => params[0] === params[1]);
});
define.alias("ember-intl/helpers/t", "color/helpers/t");
define("color/helpers/tr", ["exports", "common-components/helpers/tr"], function (_exports, _tr) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"common-components/helpers/tr"eaimeta@70e063a35619d71f
  // app/helpers/translate.js
  class TranslateHelper extends _tr.default {}
  _exports.default = TranslateHelper;
});
define("color/initializers/navigation-service", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _exports.initialize = initialize;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  function initialize() {}
  var _default = _exports.default = {
    name: 'navigation-service',
    initialize
  };
});
define("color/models/color-mix-2", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  class ColorMix2 {
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
      if (this.indice > 255) {
        this.indice = 0;
      }
      this.b = 255 - this.indice;
      if (this.indice % 400 === 0) {
        this.nb++;
      }
      this.a = this.indice / 2;
      const colors = [[this.b, this.a, this.a], [this.a, this.b, this.a], [this.a, this.a, this.b]];
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
          if (i + 1 < max) {
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
  _exports.default = ColorMix2;
});
define("color/models/color-mix.1", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  class ColorMix {
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
  _exports.default = ColorMix;
});
define("color/models/color-mix", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  class ColorMix {
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
  _exports.default = ColorMix;
});
define("color/models/color-spiral", ["exports", "addon-canvas/models/CLine"], function (_exports, _CLine) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"addon-canvas/models/CLine"eaimeta@70e063a35619d71f
  class ColorSpiral {
    getObjects(shapesGenerator, colorsService, j, size) {
      const objects = [];
      const c = shapesGenerator.getFitCircle(size - j * 6);
      const ptCenter = c.getCenter();
      let angle = j * Math.PI / 5;
      const nb = 360 * 5;
      for (let i = 0; i < nb; i++) {
        objects.push(new _CLine.default(0, 0, 0, 0, colorsService.hslToRgb([i / nb * 360, 75 + j, 55 - j]), 0.5, ptCenter, c.getPointOnCircle(angle)));
        angle += Math.PI * 2 / nb;
      }
      return objects;
    }
  }
  _exports.default = ColorSpiral;
});
define("color/models/color-wheel", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  class ColorWheel {
    getObjects(shapesGenerator, colorsService, angle) {
      const objects = [];
      angle = angle % (2 * Math.PI);
      const c0 = shapesGenerator.getFitCircle(60);
      const c1 = shapesGenerator.getFitCircle(29.3);
      for (let i = 0, max = 7; i < max; i++) {
        c1.defCenter(c0.getPointOnCircle(angle));
        const p1 = shapesGenerator.getPolygonFromCircle(c1, angle, 5);
        p1.setFillColor(colorsService.hslToRgb([(290 + i * 10) * angle / Math.PI, 70, 50]));
        p1.setStrokeColor(c1.getFillColor());
        objects.push(p1);
        angle += 2 * Math.PI / max;
      }
      return objects;
    }
  }
  _exports.default = ColorWheel;
});
define("color/models/dissimilarity-grid", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  class DissimilarityGrid {
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
      const dH = Math.floor(Math.random() * (5 - 4) + 4) * (Math.random() > 0.5 ? -1 : 1);

      // [30, 89]
      const s = 60 + Math.floor(Math.random() * 60) - 30;

      // -1, 0, 1
      const dS = Math.floor(Math.random() * 2) * (Math.random() > 0.5 ? -2 : 1);

      //  [25, 74]
      const l = 50 + Math.floor(Math.random() * 50) - 25;
      const dL = Math.floor(Math.random() * 2) * (Math.random() > 0.5 ? -1 : 1);
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
  _exports.default = DissimilarityGrid;
});
define("color/models/image-manipulation", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  class ImageManipulation {
    constructor() {
      this.indiceColor = 1;
      this.dir = 1;
    }
    changeLuminosity(data) {
      this.indiceColor += this.dir;
      if (this.indiceColor > 255) {
        this.dir = -1;
      }
      if (this.indiceColor < 1) {
        this.dir = 1;
      }
      /* const color = []; */

      //const color = [Math.round(Math.random() * 255), Math.round(Math.random() * 255), Math.round(Math.random() * 255), 255];
      for (let i = 0; i < data.length; i += 4) {
        if (data[i] !== 0) {
          if (i % 2 === 0) {
            const data0 = data[i];
            const data1 = data[i + 1];
            const data2 = data[i + 2];
            if (data[i] > 0) {
              data[i] = data0 + this.dir; // RED
            }
            if (data[i + 1] > 0) {
              data[i + 1] = data1 + this.dir; // GREEN
            }
            if (data[i + 2] > 0) {
              data[i + 2] = data2 + this.dir;
            }
            data[i + 3] = 255;
          }
        }
      }
      return data;
    }
    changeColor(data, colorsService) {
      this.indiceColor += this.dir;
      if (this.indiceColor > 55) {
        this.dir = -1;
      }
      if (this.indiceColor < -55) {
        this.dir = 10;
      }
      for (let i = 0; i < data.length; i += 4) {
        if (data[i] !== 0) {
          const rgb = [data[i], data[i + 1], data[i + 2]];
          const hsl = colorsService.rgbToHsl(rgb);
          hsl[0] = hsl[0] + this.dir;
          const rgb2 = colorsService.hslToRgb(hsl);
          data[i] = rgb2[0]; // RED
          data[i + 1] = rgb2[1]; // GREEN
          data[i + 2] = rgb2[2]; // BLUE
          //data[i + 3] = 255;
        }
      }
      return data;
    }
    changeColor3(data) {
      this.indiceColor += this.dir;
      if (this.indiceColor > 55) {
        this.dir = -2;
      }
      if (this.indiceColor < -55) {
        this.dir = 2;
      }
      //let r = Math.floor(Math.random() * 3);
      for (let i = 0; i < data.length; i += 4) {
        if (data[i] !== 0) {
          data[i + 1] = data[i + 2] + this.dir; // GREEN
          data[i + 2] = data[i + 1] + this.dir; // BLUE
        }
      }
      return data;
    }
    changeRgb(data, rgb) {
      for (let i = 0; i < data.length; i += 4) {
        if (data[i] !== 0) {
          if (i % 2 === 0) {
            data[i] = rgb[0] !== null ? rgb[0] : data[i]; // RED
            data[i + 1] = rgb[1] !== null ? rgb[1] : data[i + 1]; // GREEN
            data[i + 2] = rgb[2] !== null ? rgb[2] : data[i + 2]; // BLUE
            data[i + 3] = rgb[3] !== null ? rgb[3] : 255;
          }
        }
      }
      return data;
    }
    changeColor2(data) {
      this.indiceColor += this.dir;
      if (this.indiceColor > 55) {
        this.dir = -4;
      }
      if (this.indiceColor < -55) {
        this.dir = 4;
      }
      for (let i = 0; i < data.length; i += 4) {
        if (data[i] !== 0) {
          if (i % 2 === 0) {
            data[i + 1] = data[i + 1] + this.dir; // GREEN
            data[i + 2] = data[i + 2] + this.dir; // BLUE
            data[i + 3] = 255;
          }
        }
      }
      return data;
    }
  }
  _exports.default = ImageManipulation;
});
define("color/models/lightness-grid", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  class LightnessGrid {
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
      for (let j = 0, lim = nb * nb + 1; j < lim; j++) {
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
  _exports.default = LightnessGrid;
});
define("color/models/number-test", ["exports", "addon-canvas/models/CRect", "addon-canvas/models/CText"], function (_exports, _CRect, _CText) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"addon-canvas/models/CRect",0,"addon-canvas/models/CText"eaimeta@70e063a35619d71f
  class NumberTest {
    constructor() {
      this.text = null;
    }
    getAnswer(shapesGenerator) {
      const objects = [];
      const w = Math.floor(shapesGenerator.getHeight() / 10);
      const answerText = new _CText.default(shapesGenerator.getWidth() * 0.05, w * 1.2, w, w, [255, 255, 255], this.text.getText());
      answerText.setFont('Arial');
      objects.push(answerText);
      return objects;
    }
    getObjects(shapesGenerator, colorsService) {
      const objects = [];
      const h = Math.floor(Math.random() * 360 + 5);
      const s = 60 + Math.floor(Math.random() * (30 + 30)) - 30;
      const l = 40 + Math.floor(Math.random() * 30);
      const r = new _CRect.default(shapesGenerator.getWidth() * 0.05, shapesGenerator.getHeight() * 0.2, shapesGenerator.getWidth() * 0.9, shapesGenerator.getHeight() * 0.7, null, [0, 0, 0], 3);
      r.setFillColor(colorsService.hslToRgb([h, s, l]));
      objects.push(r);
      const dH = 3;
      const x = Math.floor(Math.random() * (shapesGenerator.getWidth() * 0.6 - shapesGenerator.getWidth() / 10) + shapesGenerator.getWidth() / 10);
      const y = Math.floor(Math.random() * (shapesGenerator.getHeight() * 2 / 3 - shapesGenerator.getHeight() / 2) + shapesGenerator.getHeight() * 2 / 3);
      const w = Math.floor(shapesGenerator.getWidth() / 4);

      // number 11 - 99
      const number = Math.floor(Math.random() * 88) + 10;
      this.text = new _CText.default(x, y, w, w, colorsService.hslToRgb([h - dH, s, l]), number);
      this.text.setFont('Arial');
      objects.push(this.text);
      return objects;
    }
  }
  _exports.default = NumberTest;
});
define("color/models/perlin-noise", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  class PerlinNoise {
    constructor() {
      this.angle = 0;
      this.indice = 0;
      this.data = null;
      this.ratio = 0;
      this.w = 0;
      this.h = 0;
      this.p = null;
      this.step = 20;
      this.permutation = null;
    }
    initialize(shapesGenerator) {
      this.w = shapesGenerator.getWidth() + this.step;
      this.h = shapesGenerator.getHeight() + this.step;
      this.step = this.h / 80;
    }
    newIteration(colorsService, h, dh) {
      const pts = [];
      for (let indexX = 0; indexX <= this.w + this.step; indexX += this.step) {
        for (let indexY = 0; indexY <= this.h + this.step; indexY += this.step) {
          pts.push([indexX, indexY]);
        }
      }
      return colorsService.setPointsPerlinNoiseColor(pts, h, 50, 50, dh, 10, 10);
    }
  }
  _exports.default = PerlinNoise;
});
define("color/models/voronoi-noise", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  class VoronoiNoise {
    VEdge(s, a, b)
    // start, left, right
    {
      this.left = a; // point on left
      this.right = b; // point on right

      this.start = s; // start point
      this.end = null; // end point

      this.f = (b.x - a.x) / (a.y - b.y);
      this.g = s.y - this.f * s.x;
      //this.direction = new Point(b.y - a.y, -(b.x - a.x));
      //this.B = new Point(s.x + this.direction.x, s.y + this.direction.y); // second point of line

      this.intersected = false;
      this.iCounted = false;
      this.neighbour = null;
    }
  }
  var _default = _exports.default = VoronoiNoise;
});
define.alias("@ember/render-modifiers/modifiers/did-insert", "color/modifiers/did-insert");
define.alias("@ember/render-modifiers/modifiers/did-update", "color/modifiers/did-update");
define.alias("@ember/render-modifiers/modifiers/will-destroy", "color/modifiers/will-destroy");
define("color/resolver", ["exports", "ember-resolver"], function (_exports, _emberResolver) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-resolver"eaimeta@70e063a35619d71f
  var _default = _exports.default = _emberResolver.default;
});
define("color/services/actions-handler", ["exports", "@ember/service"], function (_exports, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/service"eaimeta@70e063a35619d71f
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  class ActionsHandler extends _service.default {
    constructor(owner, args) {
      super(owner, args);
      _defineProperty(this, "activeForm", false);
      _defineProperty(this, "components", null);
      _defineProperty(this, "idPreviousInstance", "");
      _defineProperty(this, "idInstance", "");
      _defineProperty(this, "data", {});
      _defineProperty(this, "componentData", {});
      _defineProperty(this, "componentsData", {});
      this.components = [];
      this.eventTarget = new EventTarget();
    }
    triggerEvent(name, data) {
      this.eventTarget.dispatchEvent(new CustomEvent(name, {
        detail: data
      }));
      return true;
    }
    addComponent(id) {
      this.components.push(id);
    }
    componentValueAction(actionName, value, componentID, id) {
      return this.componentDataAction({
        "value": value,
        "actionName": actionName,
        'componentID': componentID,
        "id": id
      }, componentID);
    }
    componentEventAction(e, value, componentID) {
      const data = [];
      data["value"] = value;
      if (e.target) {
        for (let key in e.target.dataset) {
          data[key] = e.target.dataset[key];
        }
      }
      return this.componentDataAction(data, componentID);
    }
    componentDataAction(data, componentID) {
      if (typeof componentID === "string" && componentID !== "") {
        return this.triggerEvent(`componentAction${componentID}`, data);
      } else {
        return false;
      }
    }
    applyAction(id, data) {
      return this.triggerEvent(`applyAction${id}`, data);
    }
    handleDataSet(dataset) {
      const data = [];
      if (dataset) {
        for (let key in dataset) {
          data[key] = dataset[key];
        }
      }
      return data;
    }
    setInstance(id) {
      this.idInstance = id;
    }
    toggleAnimationButton(animationRunning, componentID) {
      if (animationRunning === true) {
        this.displayInputValue(this.getElementId(componentID, "start-animation"), "Stop");
      } else {
        this.displayInputValue(this.getElementId(componentID, "start-animation"), "Animation");
      }
    }
    toggleHTMLElement(id, hide, show) {
      if (typeof id === "string" && id !== "") {
        const htmlElement = document.getElementById(id);
        if (htmlElement) {
          if (hide === true) {
            htmlElement.style.display = "none";
          } else if (htmlElement.style.display === '' || htmlElement.style.display === 'none' || show === true) {
            htmlElement.classList.remove("d-none");
            htmlElement.style.display = "block";
          } else {
            htmlElement.style.display = "none";
          }
        }
      }
    }
    setHtmlElementVisibility(id, show) {
      if (typeof id === "string" && id !== "") {
        const htmlElement = document.getElementById(id);
        if (htmlElement) {
          if (show) {
            htmlElement.classList.remove("d-none");
          } else {
            htmlElement.classList.add("d-none");
          }
        }
      }
    }
    getElementId(componentID, id) {
      return `${componentID}-${id}`;
    }
    getData() {
      return this.data;
    }
    setInput(key, value, componentID) {
      this.data[key] = value;
      this.displayLabel(key, value, componentID);
      this.displayInputValue(key, value, componentID);
    }
    setInputs(data, componentID) {
      for (let key in data) {
        this.setInput(key, data[key], componentID);
      }
    }
    saveInputValue(inputId, value) {
      this.componentsData[inputId] = value;
    }
    /*getInputValue(inputId){
      if (this.componentsData[inputId]){
        return this.componentsData[inputId];
      }
      return null;
    }*/
    getInputValue(inputId) {
      const inputElement = document.getElementById(inputId);
      if (inputElement) {
        let currentValue = inputElement.value;
        if (currentValue == null || currentValue == "") {
          currentValue = inputElement.getAttribute('data-current-value');
          if (currentValue == null || currentValue == "") {
            return this.componentsData[inputId];
          }
          return currentValue;
        }
        return currentValue;
      }
    }
    displayInputValue(id, value, componentID) {
      if (typeof componentID === "string" && componentID !== "") {
        const formElement = document.getElementById(componentID);
        if (formElement) {
          const inputElement = formElement.querySelector(`input[name="${id}"]`);
          if (inputElement) {
            this.saveInputValue(`${componentID}-${id}`, value);
            if (inputElement.type === "checkbox") {
              inputElement.checked = value === 1 || value === true;
            } else {
              inputElement.setAttribute('current-value', value);
              inputElement.value = value;
            }
          }
        }
      } else {
        const inputElement = document.getElementById(id);
        if (inputElement) {
          this.saveInputValue(id, value);
          inputElement.setAttribute('data-current-value', value);
          inputElement.value = value;
        }
      }
    }
    displayLabel(name, value, componentID) {
      if (typeof componentID === "string") {
        if (componentID !== "") {
          const labelElement = document.getElementById(this.getElementId(componentID, `span-label-${name}`));
          if (labelElement) {
            labelElement.innerHTML = value;
          }
        }
      } else {
        const labelElement = document.getElementById(`span-label-${name}`);
        if (labelElement) {
          labelElement.innerHTML = value;
        }
      }
    }
  }
  _exports.default = ActionsHandler;
});
define("color/services/api-posts-service", ["exports", "@ember/service"], function (_exports, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/service"eaimeta@70e063a35619d71f
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  class ApiPostsService extends _service.default {
    constructor(...args) {
      super(...args);
      // Create a cache object
      _defineProperty(this, "cache", {});
    }
    fetchData(url) {
      return new Promise(resolve => {
        // Check if data is already in the cache and not older than 1 hour
        if (this.cache[url] && this.isDataFresh(this.cache[url])) {
          resolve(this.cache[url].dataPosts);
        } else {
          fetch(url).then(response => response.json()).then(data => {
            const dataPosts = this.handleResponse(data);
            // Store data and timestamp in the cache
            this.cache[url] = {
              dataPosts,
              timestamp: Date.now()
            };
            resolve(dataPosts);
          });
        }
      });
    }
    handleResponse(response) {
      return response;
    }
    isDataFresh(cacheEntry) {
      // Check if the data is not older than 600 seconds (600 seconds * 1000 milliseconds)
      return Date.now() - cacheEntry.timestamp < 600000;
    }
    getItems() {
      const items = [];
      return items;
    }
    getItem() {
      return null;
    }
  }
  _exports.default = ApiPostsService;
});
define("color/services/deviant-art-service", ["exports", "@ember/service", "addon-canvas/models/CImg"], function (_exports, _service, _CImg) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/service",0,"addon-canvas/models/CImg"eaimeta@70e063a35619d71f
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  class DeviantArtService extends _service.default {
    constructor(...args) {
      super(...args);
      // Create a cache object
      _defineProperty(this, "cache", {});
      _defineProperty(this, "limit", 40);
      _defineProperty(this, "secretKey", "cache");
    }
    fetchData(url, id, limit) {
      this.limit = limit;
      return new Promise(resolve => {
        if (this.cache[url + id] && this.isDataFresh(this.cache[url + id])) {
          resolve(this.handleResponse(this.cache[url + id].data, url + id));
        } else {
          fetch(url).then(response => response.text()).then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, 'application/xml');
            // Handle XML data
            resolve(this.handleResponse(xmlDoc, url + id));
          }).catch(error => {
            console.error(error);
            // Handle error
            resolve(null);
          });
        }
      });
    }
    isDataFresh(cacheEntry) {
      // Check if the data is not older than 600 seconds (600 seconds * 1000 milliseconds)
      return Date.now() - cacheEntry.timestamp < 600000;
    }
    handleResponse(xmlDocument, url) {
      // Store data and timestamp in the cache
      this.cache[url] = {
        data: xmlDocument,
        timestamp: Date.now()
      };
      for (let i = 0; i < xmlDocument.childNodes.length; i++) {
        const node = xmlDocument.childNodes[i];
        if (node.localName === "rss") {
          for (let j = 0; j < node.childNodes.length; j++) {
            if (node.childNodes[j].localName === "channel") {
              return this.getItems(node.childNodes[j]);
            }
          }
        }
      }
      return null;
    }
    getItems(channel) {
      let nb = 0;
      const items = [];
      for (let i = 0; i < channel.childNodes.length; i++) {
        if (channel.childNodes[i].localName === "item") {
          if (nb >= this.limit) {
            break;
          }
          const item = this.getItem(channel.childNodes[i], nb);
          if (item !== null) {
            items.push(item);
          }
          nb++;
        }
      }
      return items;
    }
    getItem(item, nb) {
      let description = "";
      let title = "";
      let thumbnailUrl = "";
      let thumbnail = null;
      let pubDate = "";
      let link = "";
      let thumbnail1 = null;
      let img = {};
      const thumbnails = [];
      for (let i = 0; i < item.childNodes.length; i++) {
        switch (item.childNodes[i].nodeName) {
          case "media:content":
            img = this.getImg(item.childNodes[i]);
            break;
          case "media:description":
            description = item.childNodes[i].innerHTML;
            break;
          case "media:title":
            title = item.childNodes[i].innerHTML;
            break;
          case "media:thumbnail":
            thumbnail1 = this.getImg(item.childNodes[i]);
            thumbnails.push({
              "url": thumbnail1.url,
              "width": thumbnail1.width,
              "height": thumbnail1.height
            });
            break;
          case "pubDate":
            pubDate = item.childNodes[i].innerHTML;
            break;
          case "link":
            link = item.childNodes[i].innerHTML;
            break;
          default:
            break;
        }
      }
      for (let i = 0; i < thumbnails.length; i++) {
        if (thumbnails[i].url.indexOf("w_300") > 0) {
          thumbnailUrl = thumbnails[i].url;
          thumbnail = thumbnails[i];
        }
      }
      if (thumbnail) {
        const parsedDate = new Date(pubDate);
        const formattedDate = `${parsedDate.getFullYear()}-${(parsedDate.getMonth() + 1).toString().padStart(2, '0')}-${parsedDate.getDate().toString().padStart(2, '0')}`;
        return {
          "image": {
            "src": img.url,
            "description": this.stripTags(description),
            "width": img.width,
            "height": img.height
          },
          "url": img.url,
          "width": img.width,
          "height": img.height,
          "title": this.stripTags(title),
          "description": this.stripTags(description),
          "link": link,
          "publicID": nb,
          "pubDate": pubDate,
          "thumbnails": thumbnails,
          "thumbnailUrl": thumbnailUrl,
          "thumbnail": thumbnail,
          "urlEncode": this.encryptUrl(img.url, "mySecretKey"),
          "loading": nb > 10 ? "lazy" : "eager",
          "date_y_m_d": formattedDate,
          "id": nb
        };
      }
      return null;
    }
    encryptUrl(url) {
      let encrypted = '';
      let keyIndex = 0;

      // Chiffrer chaque caractère de l'URL en fonction du secretKey
      for (let i = 0; i < url.length; i++) {
        // Décaler le code ASCII du caractère en fonction de la clé
        const charCode = url.charCodeAt(i) + this.secretKey.charCodeAt(keyIndex % this.secretKey.length);
        encrypted += String.fromCharCode(charCode);

        // Passer à la lettre suivante de la clé
        keyIndex++;
      }

      // Convertir en base64 pour rendre l'URL plus sûre pour le transport
      return btoa(encrypted);
    }
    decryptUrl(encryptedUrl) {
      const decoded = atob(encryptedUrl); // Décoder la base64
      let decrypted = '';
      let keyIndex = 0;

      // Déchiffrer chaque caractère de l'URL
      for (let i = 0; i < decoded.length; i++) {
        // Revenir au code ASCII original en soustrayant le décalage
        const charCode = decoded.charCodeAt(i) - this.secretKey.charCodeAt(keyIndex % this.secretKey.length);
        decrypted += String.fromCharCode(charCode);

        // Passer à la lettre suivante de la clé
        keyIndex++;
      }
      return decrypted;
    }
    getImg(item) {
      const img = new _CImg.default(0, 0, 0, 0, null, "");
      for (let j = 0; j < item.attributes.length; j++) {
        if (item.attributes[j].nodeName === "url") {
          img.url = item.attributes[j].value;
        } else if (item.attributes[j].nodeName === "height") {
          img.height = parseInt(item.attributes[j].value);
        } else if (item.attributes[j].nodeName === "width") {
          img.width = parseInt(item.attributes[j].value);
        }
      }
      return img;
    }
    stripTags(text) {
      if (text) {
        let ele = document.createElement("div");
        ele.innerHTML = text;
        return ele.textContent.replace(/(<([^>]+)>)/gi, "");
      }
      return "";
    }
  }
  _exports.default = DeviantArtService;
});
define("color/services/fullscreen-service", ["exports", "@ember/service"], function (_exports, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/service"eaimeta@70e063a35619d71f
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  class FullScreenService extends _service.default {
    constructor(...args) {
      super(...args);
      _defineProperty(this, "fn", null);
      _defineProperty(this, "elementID", '');
      _defineProperty(this, "document", null);
      _defineProperty(this, "isCommonjs", null);
      _defineProperty(this, "keyboardAllowed", null);
      _defineProperty(this, "isEnabled", false);
      _defineProperty(this, "fullScreenRequestHandler", null);
      _defineProperty(this, "fullScreenChangehandler", null);
      _defineProperty(this, "fullScreenElementId", '');
      _defineProperty(this, "intervalId", 0);
      _defineProperty(this, "elementHeight", 0);
      _defineProperty(this, "fullScreenStarted", false);
      _defineProperty(this, "waitChange", false);
    }
    initialize() {
      this.waitChange = false;
      this.document = typeof window === 'object' && typeof window.document === 'object' ? window.document : {};
      this.keyboardAllowed = typeof Element !== 'undefined' && 'ALLOW_KEYBOARD_INPUT' in Element;
      const fnMap = [['requestFullscreen', 'exitFullscreen', 'fullscreenElement', 'fullscreenEnabled', 'fullscreenchange', 'fullscreenerror'],
      // New WebKit
      ['webkitRequestFullscreen', 'webkitExitFullscreen', 'webkitFullscreenElement', 'webkitFullscreenEnabled', 'webkitfullscreenchange', 'webkitfullscreenerror'],
      // Old WebKit (Safari 5.1)
      ['webkitRequestFullScreen', 'webkitCancelFullScreen', 'webkitCurrentFullScreenElement', 'webkitCancelFullScreen', 'webkitfullscreenchange', 'webkitfullscreenerror'], ['mozRequestFullScreen', 'mozCancelFullScreen', 'mozFullScreenElement', 'mozFullScreenEnabled', 'mozfullscreenchange', 'mozfullscreenerror'], ['msRequestFullscreen', 'msExitFullscreen', 'msFullscreenElement', 'msFullscreenEnabled', 'MSFullscreenChange', 'MSFullscreenError']];
      this.fn = {};
      for (const val of fnMap) {
        if (val && val[1] in document) {
          for (let i = 0; i < val.length; i++) {
            this.fn[fnMap[0][i]] = val[i];
          }
          break;
        }
      }
      this.eventNameMap = {
        change: this.fn.fullscreenchange,
        error: this.fn.fullscreenerror
      };
      return true;
    }
    updateEnabled() {
      this.set('isEnabled', this.isFullscreen());
    }
    trigger() {}
    enterFullScreen() {
      const element = document.getElementById(this.fullScreenElementId);
      if (!this.isFullscreen()) {
        this.fullScreenStarted = false;
        this.waitChange = false;
        this.request(element);
      }
    }
    request(element) {
      if (this.fn) {
        const request = this.fn.requestFullscreen;
        element = element || document.documentElement;
        const rect = element.getBoundingClientRect();
        this.elementHeight = rect.height;
        this.fullScreenStarted = false;
        // Work around Safari 5.1 bug: reports support for
        // keyboard in fullscreen even though it doesn't.
        // Browser sniffing, since the alternative with
        // setTimeout is even worse.
        if (/ Version\/5\.1(?:\.\d+)? Safari\//.test(navigator.userAgent)) {
          element[request]();
        } else {
          element[request](this.keyboardAllowed ? Element.ALLOW_KEYBOARD_INPUT : {}).then(() => {
            this.waitChange = true;
          }).catch(err => {
            this.elementHeight = 0;
            this.waitChange = false;
          });
        }
      }
    }
    getFullScreenChange(newHeight) {
      if (newHeight > 0 && this.elementHeight > 0 && newHeight != this.elementHeight) {
        if (this.elementHeight > 0 && this.waitChange) {
          this.elementHeight = newHeight;
          this.waitChange = false;
          this.fullScreenStarted = true;
          return true;
        }
        if (this.waitChange == false && newHeight > 0 && this.isFullscreen() == false && this.fullScreenStarted) {
          this.fullScreenStarted = false;
          this.elementHeight = 0;
          return true;
        }
      }
      return false;
    }
    exit() {
      if (this.isFullscreen()) {
        this.elementHeight = 0;
        this.waitChange = false;
        this.document[this.fn.exitFullscreen]();
      }
    }
    willDestroy() {
      this.fullScreenStarted = false;
    }
    isFullscreen() {
      if (this.fn === null) {
        return false;
      }
      return this.document[this.fn.fullscreenElement] !== null;
    }
  }
  _exports.default = FullScreenService;
});
define.alias("ember-intl/services/intl", "color/services/intl");
define("color/services/model-notifier-service", ["exports", "@ember/service", "@glimmer/tracking"], function (_exports, _service, _tracking) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2, _descriptor3; // app/services/model-notifier.js
  0; //eaimeta@70e063a35619d71f0,"@ember/service",0,"@glimmer/tracking"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  let ModelNotifierService = _exports.default = (_class = class ModelNotifierService extends _service.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "modelID", _descriptor, this);
      _initializerDefineProperty(this, "modelType", _descriptor2, this);
      _initializerDefineProperty(this, "dataSet", _descriptor3, this);
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "modelID", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return "";
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "modelType", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return "";
    }
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "dataSet", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _class);
});
define("color/services/navigation-service", ["exports", "@ember/service"], function (_exports, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2;
  0; //eaimeta@70e063a35619d71f0,"@ember/service",0,"@ember/service"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  let NavigationService = _exports.default = (_class = class NavigationService extends _service.default {
    constructor(owner, args) {
      super(owner, args);
      _initializerDefineProperty(this, "fullscreenService", _descriptor, this);
      _initializerDefineProperty(this, "intl", _descriptor2, this);
      _defineProperty(this, "arrayRoutes", null);
      _defineProperty(this, "routeName1", '');
      _defineProperty(this, "routeTitle1", '');
      _defineProperty(this, "routeEnabled1", false);
      _defineProperty(this, "pageTitleEnabled", false);
      _defineProperty(this, "routeName2", '');
      _defineProperty(this, "routeTitle2", '');
      _defineProperty(this, "routeEnabled2", false);
      _defineProperty(this, "fullScreenEnabled", false);
      _defineProperty(this, "nav_id", 0);
      _defineProperty(this, "fps", 0);
      _defineProperty(this, "config", null);
      _defineProperty(this, "idElementProgress", 'nav-progress-bar');
      _defineProperty(this, "routeClass1", '');
      this.routeName1 = '';
      this.routeTitle1 = '';
      this.routeClass1 = '';
      this.routeName2 = '';
      this.routeTitle2 = '';
      this.pageTitleEnabled = false;
      this.routeEnabled1 = false;
      this.routeEnabled2 = false;
      this.arrayRoutes = [];
    }
    fetchData() {
      return new Promise(resolve => {
        fetch('/api/index.json').then(response => response.json()).then(data => {
          this.setApplicationRoutes(data);
          // Handle the parsed data here
          resolve(data);
        });
      });
    }
    setDocumentTitle(title) {
      document.title = title;
    }
    updateProgressBar(percent) {
      if (this.idElementProgress) {
        const progressBar = document.getElementById(this.idElementProgress);
        if (progressBar) {
          if (percent >= 0 && percent < 100) {
            progressBar.style.width = `${Math.round(percent * 100) / 100}%`;
            progressBar.style.height = '6px';
            progressBar.style.display = 'block';
          } else {
            progressBar.style.display = 'none';
            progressBar.style.width = '0';
            progressBar.style.height = '0';
          }
        }
      }
    }
    setApplicationRoutes(model) {
      this.arrayRoutes = [];
      for (let index = 0; index < model.dataSets.length; index++) {
        this.arrayRoutes[model.dataSets[index].id] = model.dataSets[index];
      }
    }
    setNavigationRoutes(name, route) {
      if (name !== null) {
        if (name.indexOf(".index") > 0) {
          this.set('routeClass1', 'd-block');
          this.disableFullScreen();
        } else {
          this.set('routeClass1', 'd-none');
        }
        if (this.arrayRoutes[name] && typeof this.arrayRoutes[name] === 'object') {
          if (typeof this.arrayRoutes[name].indexTitle === 'string' && this.arrayRoutes[name].indexTitle !== '') {
            this.setRoute1(this.intl.t(this.arrayRoutes[name].indexTitle), this.arrayRoutes[name].indexRoute);
          }
          if (typeof this.arrayRoutes[name].pageRoute === 'string' && this.arrayRoutes[name].pageRoute !== '') {
            this.setRoute2(this.intl.t(this.arrayRoutes[name].title), this.arrayRoutes[name].pageRoute);
          } else if (typeof this.arrayRoutes[name].title === 'string' && this.arrayRoutes[name].title !== '') {
            this.setRoute2(this.intl.t(this.arrayRoutes[name].title), route);
          }
          return true;
        }
      }
      this.disableRoute1();
      this.disableRoute2();
      this.disableFullScreen();
      return false;
    }
    disableRoute1() {
      this.set('routeEnabled1', false);
    }
    disableRoute2() {
      this.set('pageTitleEnabled', false);
      this.set('routeEnabled2', false);
    }
    setRoute1(rootTitle, rootName) {
      if (rootName !== '') {
        this.set('routeName1', String(rootName));
        this.set('routeTitle1', rootTitle);
        this.set('routeEnabled1', true);
      } else {
        this.set('routeEnabled1', false);
        this.set('routeName1', "index");
        this.set('routeTitle1', "");
      }
    }
    setRoute2(rootTitle, rootName) {
      if (rootName === '0') {
        this.set('routeEnabled2', false);
        this.set('routeName2', "index");
        this.set('routeTitle2', rootTitle);
        this.set('pageTitleEnabled', true);
      } else if (rootName !== '') {
        this.set('routeName2', String(rootName));
        this.set('routeTitle2', rootTitle);
        this.set('pageTitleEnabled', false);
        this.set('routeEnabled2', true);
      } else {
        this.set('routeEnabled2', false);
        this.set('routeName2', "index");
        this.set('routeTitle2', "");
        this.set('pageTitleEnabled', false);
      }
    }
    enterFullScreen() {
      this.fullscreenService.enterFullScreen();
    }
    initFullScreen(idElement) {
      this.fullscreenService.fullScreenElementId = idElement;
      this.set('fullScreenEnabled', true);
    }
    getFullScreenElementID() {
      return this.fullscreenService.fullScreenElementId;
    }
    disableFullScreen() {
      this.set('fullScreenEnabled', false);
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "fullscreenService", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "intl", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _class);
});
define("color/templates/application", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{outlet}}
  */
  {
    "id": "3bcpQmkC",
    "block": "[[[46,[28,[37,1],null,null],null,null,null]],[],false,[\"component\",\"-outlet\"]]",
    "moduleName": "color/templates/application.hbs",
    "isStrictMode": false
  });
});
define("color/templates/color-wheel", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    <ColorWheelC />
  */
  {
    "id": "ThOG0ZAz",
    "block": "[[[8,[39,0],null,null,null]],[],false,[\"color-wheel-c\"]]",
    "moduleName": "color/templates/color-wheel.hbs",
    "isStrictMode": false
  });
});
define("color/templates/components/form/dissimilarity-f", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    <aside class="menu-on-canvas col-10 col-md-2 m-5 text-white fixed-bottom">
  
    <div class="mb-3">
      <input
        type="button"
        role="button"
        class="mb-3 btn-list-page btn btn-outline-secondary form-control"
        id="{{this.componentID}}-restart-animation"
        name="restart-animation"
        value="Restart"
        {{on "click" (fn this.restartAnimation @event)}}
      />
    </div>
  
    <div class="p-2">
      <span class="text-white m-4 fs-1 fs-md-3 fs-lg-2" id="span-nb-points">
        0 / 0
      </span>
    </div>
  
  </aside>
  */
  {
    "id": "Nil7q2y9",
    "block": "[[[10,\"aside\"],[14,0,\"menu-on-canvas col-10 col-md-2 m-5 text-white fixed-bottom\"],[12],[1,\"\\n\\n  \"],[10,0],[14,0,\"mb-3\"],[12],[1,\"\\n    \"],[11,\"input\"],[24,\"role\",\"button\"],[24,0,\"mb-3 btn-list-page btn btn-outline-secondary form-control\"],[16,1,[29,[[30,0,[\"componentID\"]],\"-restart-animation\"]]],[24,3,\"restart-animation\"],[24,2,\"Restart\"],[24,4,\"button\"],[4,[38,3],[\"click\",[28,[37,4],[[30,0,[\"restartAnimation\"]],[30,1]],null]],null],[12],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"p-2\"],[12],[1,\"\\n    \"],[10,1],[14,0,\"text-white m-4 fs-1 fs-md-3 fs-lg-2\"],[14,1,\"span-nb-points\"],[12],[1,\"\\n      0 / 0\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n\"],[13]],[\"@event\"],false,[\"aside\",\"div\",\"input\",\"on\",\"fn\",\"span\"]]",
    "moduleName": "color/templates/components/form/dissimilarity-f.hbs",
    "isStrictMode": false
  });
});
define("color/templates/components/form/image-color-f", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    <form
    novalidate
    action="javascript:void(0);"
    id="{{this.componentID}}-form"
    data-component-id={{this.componentID}}
  >
    <ol class="list-group">
      <li class="list-group-item">
        <input
          id="{{this.componentID}}-img-color"
          class="form-control"
          type="file"
          {{on "change" (fn this.upload @event)}}
        />
      </li>
      <li class="list-group-item">
        <button
          class="btn-list-page btn btn-outline-secondary"
          role="button"
          type="button"
          data-action-name="reload"
          {{on "click" (fn this.componentExecAction @event)}}
        >
          {{tr "Reload"}}
        </button>
      </li>
      <li class="list-group-item">
        <button
          class="btn-list-page btn btn-outline-secondary"
          role="button"
          type="button"
          data-param1="red"
          data-action-name="changeRgb"
          {{on "click" (fn this.componentExecAction @event)}}
        >
          {{tr "Red"}}
        </button>
      </li>
  
      <li class="list-group-item">
        <label class="form-label" for="{{this.componentID}}-red">
          {{tr "Red"}}
          :
          <span id="{{this.componentLabelID}}-red">
            0
          </span>
        </label>
        <input
          placeholder="red"
          pattern="[0-9,.]+"
          required
          min="0"
          max="255"
          type="range"
          class="form-range"
          data-action-name="changeColor"
          data-param1="red"
          data-id="red"
          id="{{this.componentID}}-red"
          name="red"
          value="0"
          {{on "change" (fn this.componentChangeInputValue @event)}}
        />
      </li>
  
      <li class="list-group-item">
        <button
          class="btn-list-page btn btn-outline-secondary"
          role="button"
          type="button"
          data-param1="green"
          data-action-name="changeRgb"
          {{on "click" (fn this.componentExecAction @event)}}
        >
          {{tr "Green"}}
        </button>
      </li>
  
      <li class="list-group-item">
        <label class="form-label" for="{{this.componentID}}-green">
          {{tr "Green"}}
          :
          <span id="{{this.componentLabelID}}-green">
            0
          </span>
        </label>
        <input
          placeholder="green"
          pattern="[0-9,.]+"
          required
          min="0"
          max="255"
          type="range"
          class="form-range"
          data-action-name="changeColor"
          data-param1="green"
          data-id="green"
          id="{{this.componentID}}-green"
          name="green"
          value="0"
          {{on "change" (fn this.componentChangeInputValue @event)}}
        />
      </li>
  
      <li class="list-group-item">
        <button
          class="btn-list-page btn btn-outline-secondary"
          role="button"
          type="button"
          data-param1="blue"
          data-action-name="changeRgb"
          {{on "click" (fn this.componentExecAction @event)}}
        >
          {{tr "Blue"}}
        </button>
      </li>
  
      <li class="list-group-item">
        <label class="form-label" for="{{this.componentID}}-blue">
          {{tr "Blue"}}
          :
          <span id="{{this.componentLabelID}}-blue">
            0
          </span>
        </label>
        <input
          placeholder="blue"
          pattern="[0-9,.]+"
          required
          min="0"
          max="255"
          type="range"
          class="form-range"
          data-action-name="changeColor"
          data-param1="blue"
          data-id="blue"
          id="{{this.componentID}}-blue"
          name="blue"
          value="0"
          {{on "change" (fn this.componentChangeInputValue @event)}}
        />
      </li>
      <li class="list-group-item">
        <button
          class="btn-list-page btn btn-outline-secondary"
          role="button"
          type="button"
          data-action-name="edge-detect"
          {{on "click" (fn this.componentExecAction @event)}}
        >
          Edge detect
        </button>
      </li>
      <li class="list-group-item">
        <button
          class="btn-list-page btn btn-outline-secondary"
          role="button"
          type="button"
          data-action-name="edge-thin"
          {{on "click" (fn this.componentExecAction @event)}}
        >
          Edge-thin
        </button>
      </li>
      <li class="list-group-item">
        <button
          class="btn-list-page btn btn-outline-secondary"
          role="button"
          type="button"
          data-action-name="gray"
          {{on "click" (fn this.componentExecAction @event)}}
        >
          Gray
        </button>
      </li>
      <li class="list-group-item">
        <button
          class="btn-list-page btn btn-outline-secondary"
          role="button"
          type="button"
          data-action-name="gaussian"
          {{on "click" (fn this.componentExecAction @event)}}
        >
          Gaussian
        </button>
      </li>
    </ol>
  </form>
  */
  {
    "id": "gIgap/IY",
    "block": "[[[10,\"form\"],[14,\"novalidate\",\"\"],[14,\"action\",\"javascript:void(0);\"],[15,1,[29,[[30,0,[\"componentID\"]],\"-form\"]]],[15,\"data-component-id\",[30,0,[\"componentID\"]]],[12],[1,\"\\n  \"],[10,\"ol\"],[14,0,\"list-group\"],[12],[1,\"\\n    \"],[10,\"li\"],[14,0,\"list-group-item\"],[12],[1,\"\\n      \"],[11,\"input\"],[16,1,[29,[[30,0,[\"componentID\"]],\"-img-color\"]]],[24,0,\"form-control\"],[24,4,\"file\"],[4,[38,4],[\"change\",[28,[37,5],[[30,0,[\"upload\"]],[30,1]],null]],null],[12],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,\"li\"],[14,0,\"list-group-item\"],[12],[1,\"\\n      \"],[11,\"button\"],[24,0,\"btn-list-page btn btn-outline-secondary\"],[24,\"role\",\"button\"],[24,\"data-action-name\",\"reload\"],[24,4,\"button\"],[4,[38,4],[\"click\",[28,[37,5],[[30,0,[\"componentExecAction\"]],[30,1]],null]],null],[12],[1,\"\\n        \"],[1,[28,[35,7],[\"Reload\"],null]],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,\"li\"],[14,0,\"list-group-item\"],[12],[1,\"\\n      \"],[11,\"button\"],[24,0,\"btn-list-page btn btn-outline-secondary\"],[24,\"role\",\"button\"],[24,\"data-param1\",\"red\"],[24,\"data-action-name\",\"changeRgb\"],[24,4,\"button\"],[4,[38,4],[\"click\",[28,[37,5],[[30,0,[\"componentExecAction\"]],[30,1]],null]],null],[12],[1,\"\\n        \"],[1,[28,[35,7],[\"Red\"],null]],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[10,\"li\"],[14,0,\"list-group-item\"],[12],[1,\"\\n      \"],[10,\"label\"],[14,0,\"form-label\"],[15,\"for\",[29,[[30,0,[\"componentID\"]],\"-red\"]]],[12],[1,\"\\n        \"],[1,[28,[35,7],[\"Red\"],null]],[1,\"\\n        :\\n        \"],[10,1],[15,1,[29,[[30,0,[\"componentLabelID\"]],\"-red\"]]],[12],[1,\"\\n          0\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[11,\"input\"],[24,\"placeholder\",\"red\"],[24,\"pattern\",\"[0-9,.]+\"],[24,\"required\",\"\"],[24,\"min\",\"0\"],[24,\"max\",\"255\"],[24,0,\"form-range\"],[24,\"data-action-name\",\"changeColor\"],[24,\"data-param1\",\"red\"],[24,\"data-id\",\"red\"],[16,1,[29,[[30,0,[\"componentID\"]],\"-red\"]]],[24,3,\"red\"],[24,2,\"0\"],[24,4,\"range\"],[4,[38,4],[\"change\",[28,[37,5],[[30,0,[\"componentChangeInputValue\"]],[30,1]],null]],null],[12],[13],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[10,\"li\"],[14,0,\"list-group-item\"],[12],[1,\"\\n      \"],[11,\"button\"],[24,0,\"btn-list-page btn btn-outline-secondary\"],[24,\"role\",\"button\"],[24,\"data-param1\",\"green\"],[24,\"data-action-name\",\"changeRgb\"],[24,4,\"button\"],[4,[38,4],[\"click\",[28,[37,5],[[30,0,[\"componentExecAction\"]],[30,1]],null]],null],[12],[1,\"\\n        \"],[1,[28,[35,7],[\"Green\"],null]],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[10,\"li\"],[14,0,\"list-group-item\"],[12],[1,\"\\n      \"],[10,\"label\"],[14,0,\"form-label\"],[15,\"for\",[29,[[30,0,[\"componentID\"]],\"-green\"]]],[12],[1,\"\\n        \"],[1,[28,[35,7],[\"Green\"],null]],[1,\"\\n        :\\n        \"],[10,1],[15,1,[29,[[30,0,[\"componentLabelID\"]],\"-green\"]]],[12],[1,\"\\n          0\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[11,\"input\"],[24,\"placeholder\",\"green\"],[24,\"pattern\",\"[0-9,.]+\"],[24,\"required\",\"\"],[24,\"min\",\"0\"],[24,\"max\",\"255\"],[24,0,\"form-range\"],[24,\"data-action-name\",\"changeColor\"],[24,\"data-param1\",\"green\"],[24,\"data-id\",\"green\"],[16,1,[29,[[30,0,[\"componentID\"]],\"-green\"]]],[24,3,\"green\"],[24,2,\"0\"],[24,4,\"range\"],[4,[38,4],[\"change\",[28,[37,5],[[30,0,[\"componentChangeInputValue\"]],[30,1]],null]],null],[12],[13],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[10,\"li\"],[14,0,\"list-group-item\"],[12],[1,\"\\n      \"],[11,\"button\"],[24,0,\"btn-list-page btn btn-outline-secondary\"],[24,\"role\",\"button\"],[24,\"data-param1\",\"blue\"],[24,\"data-action-name\",\"changeRgb\"],[24,4,\"button\"],[4,[38,4],[\"click\",[28,[37,5],[[30,0,[\"componentExecAction\"]],[30,1]],null]],null],[12],[1,\"\\n        \"],[1,[28,[35,7],[\"Blue\"],null]],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[10,\"li\"],[14,0,\"list-group-item\"],[12],[1,\"\\n      \"],[10,\"label\"],[14,0,\"form-label\"],[15,\"for\",[29,[[30,0,[\"componentID\"]],\"-blue\"]]],[12],[1,\"\\n        \"],[1,[28,[35,7],[\"Blue\"],null]],[1,\"\\n        :\\n        \"],[10,1],[15,1,[29,[[30,0,[\"componentLabelID\"]],\"-blue\"]]],[12],[1,\"\\n          0\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[11,\"input\"],[24,\"placeholder\",\"blue\"],[24,\"pattern\",\"[0-9,.]+\"],[24,\"required\",\"\"],[24,\"min\",\"0\"],[24,\"max\",\"255\"],[24,0,\"form-range\"],[24,\"data-action-name\",\"changeColor\"],[24,\"data-param1\",\"blue\"],[24,\"data-id\",\"blue\"],[16,1,[29,[[30,0,[\"componentID\"]],\"-blue\"]]],[24,3,\"blue\"],[24,2,\"0\"],[24,4,\"range\"],[4,[38,4],[\"change\",[28,[37,5],[[30,0,[\"componentChangeInputValue\"]],[30,1]],null]],null],[12],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,\"li\"],[14,0,\"list-group-item\"],[12],[1,\"\\n      \"],[11,\"button\"],[24,0,\"btn-list-page btn btn-outline-secondary\"],[24,\"role\",\"button\"],[24,\"data-action-name\",\"edge-detect\"],[24,4,\"button\"],[4,[38,4],[\"click\",[28,[37,5],[[30,0,[\"componentExecAction\"]],[30,1]],null]],null],[12],[1,\"\\n        Edge detect\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,\"li\"],[14,0,\"list-group-item\"],[12],[1,\"\\n      \"],[11,\"button\"],[24,0,\"btn-list-page btn btn-outline-secondary\"],[24,\"role\",\"button\"],[24,\"data-action-name\",\"edge-thin\"],[24,4,\"button\"],[4,[38,4],[\"click\",[28,[37,5],[[30,0,[\"componentExecAction\"]],[30,1]],null]],null],[12],[1,\"\\n        Edge-thin\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,\"li\"],[14,0,\"list-group-item\"],[12],[1,\"\\n      \"],[11,\"button\"],[24,0,\"btn-list-page btn btn-outline-secondary\"],[24,\"role\",\"button\"],[24,\"data-action-name\",\"gray\"],[24,4,\"button\"],[4,[38,4],[\"click\",[28,[37,5],[[30,0,[\"componentExecAction\"]],[30,1]],null]],null],[12],[1,\"\\n        Gray\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,\"li\"],[14,0,\"list-group-item\"],[12],[1,\"\\n      \"],[11,\"button\"],[24,0,\"btn-list-page btn btn-outline-secondary\"],[24,\"role\",\"button\"],[24,\"data-action-name\",\"gaussian\"],[24,4,\"button\"],[4,[38,4],[\"click\",[28,[37,5],[[30,0,[\"componentExecAction\"]],[30,1]],null]],null],[12],[1,\"\\n        Gaussian\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[\"@event\"],false,[\"form\",\"ol\",\"li\",\"input\",\"on\",\"fn\",\"button\",\"tr\",\"label\",\"span\"]]",
    "moduleName": "color/templates/components/form/image-color-f.hbs",
    "isStrictMode": false
  });
});
define("color/templates/components/form/lightness-f", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    <aside class="menu-on-canvas col-10 col-md-2 m-5 text-white fixed-bottom">
  
    <div class="mb-3">
      <input
        type="button"
        role="button"
        class="mb-3 btn-list-page btn btn-outline-secondary form-control"
        id="{{this.componentID}}-restart-animation"
        name="restart-animation"
        value="Restart"
        {{on "click" (fn this.restartAnimation @event)}}
      />
    </div>
  
    <div class="p-2">
      <span class="text-white m-4 fs-1 fs-md-3 fs-lg-2" id="span-level">
        Go !
      </span>
    </div>
  
    <div class="p-2">
      <span class="text-white m-4 fs-1 fs-md-3 fs-lg-2" id="span-nb-points">
        0 / 0
      </span>
    </div>
  
  </aside>
  */
  {
    "id": "If6R5vw8",
    "block": "[[[10,\"aside\"],[14,0,\"menu-on-canvas col-10 col-md-2 m-5 text-white fixed-bottom\"],[12],[1,\"\\n\\n  \"],[10,0],[14,0,\"mb-3\"],[12],[1,\"\\n    \"],[11,\"input\"],[24,\"role\",\"button\"],[24,0,\"mb-3 btn-list-page btn btn-outline-secondary form-control\"],[16,1,[29,[[30,0,[\"componentID\"]],\"-restart-animation\"]]],[24,3,\"restart-animation\"],[24,2,\"Restart\"],[24,4,\"button\"],[4,[38,3],[\"click\",[28,[37,4],[[30,0,[\"restartAnimation\"]],[30,1]],null]],null],[12],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"p-2\"],[12],[1,\"\\n    \"],[10,1],[14,0,\"text-white m-4 fs-1 fs-md-3 fs-lg-2\"],[14,1,\"span-level\"],[12],[1,\"\\n      Go !\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"p-2\"],[12],[1,\"\\n    \"],[10,1],[14,0,\"text-white m-4 fs-1 fs-md-3 fs-lg-2\"],[14,1,\"span-nb-points\"],[12],[1,\"\\n      0 / 0\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n\"],[13]],[\"@event\"],false,[\"aside\",\"div\",\"input\",\"on\",\"fn\",\"span\"]]",
    "moduleName": "color/templates/components/form/lightness-f.hbs",
    "isStrictMode": false
  });
});
define("color/templates/dissimilarity", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="row">
    <Form::DissimilarityF @componentID={{"componentID-1"}} />
    <div class="col col-md-12 col-12">
      <DissimilarityC @enableMenu={{false}} @componentID={{"componentID-1"}} />
    </div>
  </div>
  */
  {
    "id": "BCes6q+g",
    "block": "[[[10,0],[14,0,\"row\"],[12],[1,\"\\n  \"],[8,[39,1],null,[[\"@componentID\"],[\"componentID-1\"]],null],[1,\"\\n  \"],[10,0],[14,0,\"col col-md-12 col-12\"],[12],[1,\"\\n    \"],[8,[39,2],null,[[\"@enableMenu\",\"@componentID\"],[false,\"componentID-1\"]],null],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[],false,[\"div\",\"form/dissimilarity-f\",\"dissimilarity-c\"]]",
    "moduleName": "color/templates/dissimilarity.hbs",
    "isStrictMode": false
  });
});
define("color/templates/hsl", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    <HslC
    
  />
  */
  {
    "id": "z/U/cNCI",
    "block": "[[[8,[39,0],null,null,null]],[],false,[\"hsl-c\"]]",
    "moduleName": "color/templates/hsl.hbs",
    "isStrictMode": false
  });
});
define("color/templates/image-manipulation", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    <article id="{{"componentID-1"}}" class="row mt-4 mb-4">
    <section class="col-12 col-md-10">
      <ImageManipulationC @componentID={{"componentID-1"}} @marginAutoComponent={{true}}
        @styleClassCanvas={{"border-gray"}}/>
    </section>
    <section class="col-12 col-md-2 mb-3">
      <Form::ImageColorF @componentID={{"componentID-1"}} />
    </section>
  </article>
  {{outlet}}
  */
  {
    "id": "3mD9vxa5",
    "block": "[[[10,\"article\"],[15,1,[29,[\"componentID-1\"]]],[14,0,\"row mt-4 mb-4\"],[12],[1,\"\\n  \"],[10,\"section\"],[14,0,\"col-12 col-md-10\"],[12],[1,\"\\n    \"],[8,[39,2],null,[[\"@componentID\",\"@marginAutoComponent\",\"@styleClassCanvas\"],[\"componentID-1\",true,\"border-gray\"]],null],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,\"section\"],[14,0,\"col-12 col-md-2 mb-3\"],[12],[1,\"\\n    \"],[8,[39,3],null,[[\"@componentID\"],[\"componentID-1\"]],null],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\"],[46,[28,[37,5],null,null],null,null,null]],[],false,[\"article\",\"section\",\"image-manipulation-c\",\"form/image-color-f\",\"component\",\"-outlet\"]]",
    "moduleName": "color/templates/image-manipulation.hbs",
    "isStrictMode": false
  });
});
define("color/templates/index", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    <article class="container-xxl mt-4 mb-4">
    <section class="row">
  
      <section class="col-12 col-md-6 col-lg-4 mb-4">
        <div class="card">
          <div class="card-body">
            <LinkTo role="link" @route="dissimilarity">
              <div class="card-body">
                <img
                  loading="lazy"
                  class="card-img-top card-img-effect"
                  src="{{this.rootURL}}/assets/img/colors-shifts.png"
                  alt=""
                />
              </div>
              <h2 class="btn-index text-center">
                Color deviation
              </h2>
            </LinkTo>
          </div>
        </div>
      </section>
      <section class="col-12 col-md-6 col-lg-4 mb-4">
        <div class="card">
          <div class="card-body">
            <LinkTo role="link" @route="lightness">
              <div class="card-body">
                <img
                  loading="lazy"
                  class="card-img-top card-img-effect"
                  src="{{this.rootURL}}/assets/img/colors-lightness.png"
                  alt=""
                />
              </div>
  
              <h2 class="btn-index text-center">
                {{tr "Clearest color"}}
              </h2>
  
            </LinkTo>
          </div>
        </div>
      </section>
      <section class="col-12 col-md-6 col-lg-4 mb-4">
        <div class="card">
          <div class="card-body">
            <LinkTo role="link" @route="number">
              <div class="card-body">
                <img
                  loading="lazy"
                  class="card-img-top card-img-effect"
                  src="{{this.rootURL}}/assets/img/find-number.png"
                  alt=""
                />
              </div>
              <h2 class="btn-index text-center">
  
                {{tr "Find the number"}}
              </h2>
            </LinkTo>
          </div>
        </div>
      </section>
    </section>
  </article>
  
  {{outlet}}
  */
  {
    "id": "qRp+3sYI",
    "block": "[[[10,\"article\"],[14,0,\"container-xxl mt-4 mb-4\"],[12],[1,\"\\n  \"],[10,\"section\"],[14,0,\"row\"],[12],[1,\"\\n\\n    \"],[10,\"section\"],[14,0,\"col-12 col-md-6 col-lg-4 mb-4\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"card\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"card-body\"],[12],[1,\"\\n          \"],[8,[39,3],[[24,\"role\",\"link\"]],[[\"@route\"],[\"dissimilarity\"]],[[\"default\"],[[[[1,\"\\n            \"],[10,0],[14,0,\"card-body\"],[12],[1,\"\\n              \"],[10,\"img\"],[14,\"loading\",\"lazy\"],[14,0,\"card-img-top card-img-effect\"],[15,\"src\",[29,[[30,0,[\"rootURL\"]],\"/assets/img/colors-shifts.png\"]]],[14,\"alt\",\"\"],[12],[13],[1,\"\\n            \"],[13],[1,\"\\n            \"],[10,\"h2\"],[14,0,\"btn-index text-center\"],[12],[1,\"\\n              Color deviation\\n            \"],[13],[1,\"\\n          \"]],[]]]]],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,\"section\"],[14,0,\"col-12 col-md-6 col-lg-4 mb-4\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"card\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"card-body\"],[12],[1,\"\\n          \"],[8,[39,3],[[24,\"role\",\"link\"]],[[\"@route\"],[\"lightness\"]],[[\"default\"],[[[[1,\"\\n            \"],[10,0],[14,0,\"card-body\"],[12],[1,\"\\n              \"],[10,\"img\"],[14,\"loading\",\"lazy\"],[14,0,\"card-img-top card-img-effect\"],[15,\"src\",[29,[[30,0,[\"rootURL\"]],\"/assets/img/colors-lightness.png\"]]],[14,\"alt\",\"\"],[12],[13],[1,\"\\n            \"],[13],[1,\"\\n\\n            \"],[10,\"h2\"],[14,0,\"btn-index text-center\"],[12],[1,\"\\n              \"],[1,[28,[35,6],[\"Clearest color\"],null]],[1,\"\\n            \"],[13],[1,\"\\n\\n          \"]],[]]]]],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,\"section\"],[14,0,\"col-12 col-md-6 col-lg-4 mb-4\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"card\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"card-body\"],[12],[1,\"\\n          \"],[8,[39,3],[[24,\"role\",\"link\"]],[[\"@route\"],[\"number\"]],[[\"default\"],[[[[1,\"\\n            \"],[10,0],[14,0,\"card-body\"],[12],[1,\"\\n              \"],[10,\"img\"],[14,\"loading\",\"lazy\"],[14,0,\"card-img-top card-img-effect\"],[15,\"src\",[29,[[30,0,[\"rootURL\"]],\"/assets/img/find-number.png\"]]],[14,\"alt\",\"\"],[12],[13],[1,\"\\n            \"],[13],[1,\"\\n            \"],[10,\"h2\"],[14,0,\"btn-index text-center\"],[12],[1,\"\\n\\n              \"],[1,[28,[35,6],[\"Find the number\"],null]],[1,\"\\n            \"],[13],[1,\"\\n          \"]],[]]]]],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[46,[28,[37,8],null,null],null,null,null]],[],false,[\"article\",\"section\",\"div\",\"link-to\",\"img\",\"h2\",\"tr\",\"component\",\"-outlet\"]]",
    "moduleName": "color/templates/index.hbs",
    "isStrictMode": false
  });
});
define("color/templates/lch", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    <LchC />
  */
  {
    "id": "/I1z0iMe",
    "block": "[[[8,[39,0],null,null,null]],[],false,[\"lch-c\"]]",
    "moduleName": "color/templates/lch.hbs",
    "isStrictMode": false
  });
});
define("color/templates/lightness", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="row">
    <Form::LightnessF @componentID={{"componentID-1"}} />
    <div class="col col-md-12 col-12">
      <LightnessC @enableMenu={{false}} @componentID={{"componentID-1"}} />
    </div>
  </div>
  */
  {
    "id": "M4/3npKD",
    "block": "[[[10,0],[14,0,\"row\"],[12],[1,\"\\n  \"],[8,[39,1],null,[[\"@componentID\"],[\"componentID-1\"]],null],[1,\"\\n  \"],[10,0],[14,0,\"col col-md-12 col-12\"],[12],[1,\"\\n    \"],[8,[39,2],null,[[\"@enableMenu\",\"@componentID\"],[false,\"componentID-1\"]],null],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[],false,[\"div\",\"form/lightness-f\",\"lightness-c\"]]",
    "moduleName": "color/templates/lightness.hbs",
    "isStrictMode": false
  });
});
define("color/templates/mix-2", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    <Mix2C />
  */
  {
    "id": "/qIMEUTQ",
    "block": "[[[8,[39,0],null,null,null]],[],false,[\"mix2-c\"]]",
    "moduleName": "color/templates/mix-2.hbs",
    "isStrictMode": false
  });
});
define("color/templates/mix", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    <MixC />
  */
  {
    "id": "qqtNoHnJ",
    "block": "[[[8,[39,0],null,null,null]],[],false,[\"mix-c\"]]",
    "moduleName": "color/templates/mix.hbs",
    "isStrictMode": false
  });
});
define("color/templates/number", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    <NumberC />
  */
  {
    "id": "3PN9S1Y6",
    "block": "[[[8,[39,0],null,null,null]],[],false,[\"number-c\"]]",
    "moduleName": "color/templates/number.hbs",
    "isStrictMode": false
  });
});
define("color/templates/perlin-noise", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    <PerlinNoiseC />
  */
  {
    "id": "SkpQJGno",
    "block": "[[[8,[39,0],null,null,null]],[],false,[\"perlin-noise-c\"]]",
    "moduleName": "color/templates/perlin-noise.hbs",
    "isStrictMode": false
  });
});
define("color/templates/spiral", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    <SpiralC />
  */
  {
    "id": "l0O8HHxf",
    "block": "[[[8,[39,0],null,null,null]],[],false,[\"spiral-c\"]]",
    "moduleName": "color/templates/spiral.hbs",
    "isStrictMode": false
  });
});//# sourceMappingURL=engine.map
