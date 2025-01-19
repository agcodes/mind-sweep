define("games/components/balls1-c", ["exports", "games/components/game-c", "games/models/balls-game-1"], function (_exports, _gameC, _ballsGame) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"games/components/game-c",0,"games/models/balls-game-1"eaimeta@70e063a35619d71f
  class Balls1C extends _gameC.default {
    initRender() {
      if (super.initRender() === false) {
        return false;
      }
      this.initCanvas();
      this.addMainAnimation(() => this.draw(), 10);
      this.initGame();
    }
    willDestroy() {
      super.willDestroy(...arguments);
      this.game.destroy();
    }
    draw() {
      super.draw();
      this.canvasService.clear();
      this.game.moveBalls();
      return this.canvasService.drawService.drawObjects(this.game.getObjects());
    }
    initGame() {
      this.initCanvas();
      this.game = new _ballsGame.default(this.canvasService.getWidth(), this.canvasService.getHeight());
      this.game.loadConfigScene();
      this.game.initDisplayGame(3, 0, 20);
      this.game.setActiveGame(true);
      // draw object (witg resize)
      this.canvasService.drawService.drawObjects(this.game.getObjects(), true);
      this.game.playerAction();
      return this.startComponentAnimation();
    }
  }
  _exports.default = Balls1C;
});
define("games/components/black-synthe-c", ["exports", "addon-canvas/components/drawing-component"], function (_exports, _drawingComponent) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"addon-canvas/components/drawing-component"eaimeta@70e063a35619d71f
  class BlackSyntheC extends _drawingComponent.default {
    initRender() {
      if (super.initRender() === false) {
        return false;
      }
    }
  }
  _exports.default = BlackSyntheC;
});
define("games/components/black-synthe-p", ["exports", "common-components/models/audio/sound", "@glimmer/component", "@ember/object"], function (_exports, _sound, _component, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class;
  0; //eaimeta@70e063a35619d71f0,"common-components/models/audio/sound",0,"@glimmer/component",0,"@ember/object"eaimeta@70e063a35619d71f
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  let BlackSyntheP = _exports.default = (_class = class BlackSyntheP extends _component.default {
    play(t) {
      this.playSound(t);
    }
    constructor(owner, args) {
      super(owner, args);
      _defineProperty(this, "notes", null);
      _defineProperty(this, "arr", null);
      _defineProperty(this, "indice", 0);
      this.indice = 0;
      //this.playSound('01_-_Thend_-_The_Bane_of_Tadziu');
      this.notes = ['do', 're', 'mi', 'fa', 'sol', 'lab', 'la', 'sib', 'si'];
      this.arr = ['do', 'do', 'do', 're', 'mi', 're', 'do', 'mi', 're', 're', 'do'];
      this.initPlayerAction();
      // 'la', 'la', 'la', 'la', 'sol', 'fa', 'fa', 'mi', 're', 're', 'fa', 'la', 're', 're', 're', 're', 'do', 'sib', 'sib', 'la',
      // 'mi', 'mi', 'fa', 'sol',
      // 'sol', 'fa', 'mi', 're', 'do', 'do', 're', 'mi', 'mi', 're', 're'
      //const that = this;

      /*setInterval(function() {
        if (that.arr.length > that.indice) {
        }
        that.indice++;
      } 500);*/

      /*for (let index = 0; index < this.arr.length; index++) {
        setTimeout(function() {
          that.playSound(that.arr[index]);
        } 300);
      }*/
    }
    playSound(name) {
      const mySound = new _sound.default();
      mySound.load(`assets/mp3/${name}.mp3`);
    }
    initPlayerAction() {
      document.onkeydown = e => {
        const keys = {};
        e = e || event;
        keys[e.keyCode] = e.type === 'keydown';
        let i = 0;
        switch (true) {
          case keys[96] || keys[48]:
            //i = 0;
            break;
          case keys[97] || keys[49]:
            i = 1;
            break;
          case keys[98] || keys[50]:
            i = 2;
            break;
          case keys[99] || keys[51]:
            i = 3;
            break;
          case keys[100] || keys[52]:
            i = 4;
            break;
          case keys[101] || keys[53]:
            i = 5;
            break;
          case keys[102] || keys[54]:
            i = 6;
            break;
          case keys[103] || keys[55]:
            i = 7;
            break;
          case keys[104] || keys[56]:
            i = 8;
            break;
          case keys[105] || keys[57]:
            i = 9;
            break;
        }
        if (i > 0) {
          this.playSound(`${this.notes[i - 1]}-d`);

          //let nb = Math.floor(Math.random() * (25 - 3)) + 3;
          //let nb2 = Math.floor(Math.random() * (nb * 3 - 3)) + 3;
          //this.initCanvas();

          //this.draw(nb, nb2);
        }
      };
    }
  }, _applyDecoratedDescriptor(_class.prototype, "play", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "play"), _class.prototype), _class);
});
define.alias("addon-canvas/components/canvas-c", "games/components/canvas-c");
define.alias("common-components/components/form/canvas-menu", "games/components/canvas-menu");
define.alias("univers-app-components/components/cursor-hover", "games/components/cursor-hover");
define.alias("univers-app-components/components/deviant-art-item", "games/components/deviant-art-item");
define.alias("addon-canvas/components/drawing-component", "games/components/drawing-component");
define.alias("common-components/components/form/form-component", "games/components/form-component");
define("games/components/form/balls1-f", ["exports", "common-components/components/form/form-component"], function (_exports, _formComponent) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"common-components/components/form/form-component"eaimeta@70e063a35619d71f
  class _default extends _formComponent.default {}
  _exports.default = _default;
});
define("games/components/form/platform1-f", ["exports", "common-components/components/form/form-component"], function (_exports, _formComponent) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"common-components/components/form/form-component"eaimeta@70e063a35619d71f
  class _default extends _formComponent.default {}
  _exports.default = _default;
});
define("games/components/form/radar-f", ["exports", "common-components/components/form/form-component"], function (_exports, _formComponent) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"common-components/components/form/form-component"eaimeta@70e063a35619d71f
  class _default extends _formComponent.default {}
  _exports.default = _default;
});
define.alias("univers-app-components/components/gallery-item", "games/components/gallery-item");
define.alias("univers-app-components/components/gallery-thumbnail", "games/components/gallery-thumbnail");
define.alias("univers-app-components/components/gallery-thumbnails", "games/components/gallery-thumbnails");
define.alias("univers-app-components/components/gallery", "games/components/gallery");
define("games/components/game-c", ["exports", "addon-canvas/components/drawing-component"], function (_exports, _drawingComponent) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"addon-canvas/components/drawing-component"eaimeta@70e063a35619d71f
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  class GameComponent extends _drawingComponent.default {
    constructor(...args) {
      super(...args);
      _defineProperty(this, "game", null);
      _defineProperty(this, "activeGame", false);
    }
    componentAction(actionName, data) {
      if (super.componentAction(actionName, data)) {
        switch (actionName) {
          case 'play':
            if (this.game.getGameOver() === false) {
              this.game.setActiveGame(true);
            } else {
              this.initGame();
            }
            break;
          case 'new':
            this.game.setActiveGame(true);
            this.initGame();
            break;
          case 'stop':
            if (this.game.getGameOver() === false) {
              if (this.game.getActiveGame() === true) {
                this.game.setActiveGame(false);
              } else {
                this.game.setActiveGame(true);
              }
            } else {
              this.initGame();
            }
            break;
          default:
            break;
        }
      }
    }
  }
  _exports.default = GameComponent;
});
define.alias("common-components/components/form/input-check-box", "games/components/input-check-box");
define.alias("common-components/components/form/input-number-plus-minus", "games/components/input-number-plus-minus");
define.alias("common-components/components/form/input-text", "games/components/input-text");
define.alias("univers-app-components/components/links-navbar", "games/components/links-navbar");
define.alias("univers-app-components/components/main-menu", "games/components/main-menu");
define.alias("univers-app-components/components/main-navbar", "games/components/main-navbar");
define("games/components/platform1-c", ["exports", "games/components/game-c", "games/models/platform-game-1"], function (_exports, _gameC, _platformGame) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"games/components/game-c",0,"games/models/platform-game-1"eaimeta@70e063a35619d71f
  class Platform1C extends _gameC.default {
    initRender() {
      if (super.initRender() === false) {
        return false;
      }
      this.initCanvas();
      this.addMainAnimation(() => this.draw(), 8);
      return this.initGame();
    }
    willDestroy() {
      super.willDestroy();
      this.game.destroy();
    }
    draw() {
      super.draw();
      this.canvasService.clear();
      this.game.moveEnnemies();
      this.game.moveHeros(null);
      return this.canvasService.drawService.drawObjects(this.game.getObjects());
    }
    initGame() {
      this.activeGame = false;
      this.game = new _platformGame.default(this.canvasService.shapesGenerator.getWidth(), this.canvasService.shapesGenerator.getHeight());
      this.game.loadConfigScene();
      this.game.initDisplayGame(3, 0, 10);
      this.game.setActiveGame(true);
      this.game.playerAction();
      this.game.startGame();
      this.canvasService.drawService.drawObjects(this.game.getObjects(), true);
      return this.startComponentAnimation();
    }
  }
  _exports.default = Platform1C;
});
define.alias("univers-app-components/components/post-home-item", "games/components/post-home-item");
define.alias("univers-app-components/components/post-item", "games/components/post-item");
define.alias("univers-app-components/components/posts-list", "games/components/posts-list");
define("games/components/radar-c", ["exports", "games/components/game-c", "games/models/radar-game"], function (_exports, _gameC, _radarGame) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"games/components/game-c",0,"games/models/radar-game"eaimeta@70e063a35619d71f
  class RadarC extends _gameC.default {
    initRender() {
      if (super.initRender() === false) {
        return false;
      }
      this.initCanvas();
      this.addMainAnimation(() => this.draw(), 8);
      return this.initGame();
    }
    willDestroy() {
      super.willDestroy(...arguments);
    }
    draw() {
      super.draw();
      this.canvasService.clear();
      this.game.moveEnnemies();
      this.game.moveCoins();
      return this.canvasService.drawService.drawObjects(this.game.getObjects());
    }
    initGame() {
      this.activeGame = false;
      this.game = new _radarGame.default(this.canvasService.shapesGenerator.getWidth(), this.canvasService.shapesGenerator.getHeight());
      this.game.loadConfigScene();
      this.game.initDisplayGame(5, 0, 10);
      this.game.setActiveGame(true);
      this.game.playerAction();
      this.canvasService.drawService.drawObjects(this.game.getObjects(), true);
      this.canvasService.canvasElement.onmousemove = event => {
        const newMousePos = this.canvasService.getMousePosOnCanvas(event);
        this.game.setHerosPos(newMousePos);
        this.mousePosition = [newMousePos[0], newMousePos[1]];
      };
      return this.startComponentAnimation();
    }
  }
  _exports.default = RadarC;
});
define.alias("addon-canvas/components/saved-img", "games/components/saved-img");
define.alias("univers-app-components/components/switch-lang", "games/components/switch-lang");
define.alias("common-components/components/form/tabbed-form", "games/components/tabbed-form");
define.alias("common-components/components/text-input", "games/components/text-input");
define("games/config/environment", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  var config;
  try {
    var metaName = 'games/config/environment';
    var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
    config = JSON.parse(unescape(rawConfig));
  } catch (err) {
    throw new Error('Could not read config from meta tag with name "' + metaName + '" due to error: ' + err);
  }
  var _default = _exports.default = config;
});
define("games/engine", ["exports", "ember-engines/engine", "ember-load-initializers", "games/resolver", "games/config/environment"], function (_exports, _engine, _emberLoadInitializers, _resolver, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-engines/engine",0,"ember-load-initializers",0,"games/resolver",0,"games/config/environment"eaimeta@70e063a35619d71f
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
define.alias("ember-intl/helpers/format-date", "games/helpers/format-date");
define.alias("ember-intl/helpers/format-list", "games/helpers/format-list");
define.alias("ember-intl/helpers/format-message", "games/helpers/format-message");
define.alias("common-components/helpers/format-money", "games/helpers/format-money");
define.alias("ember-intl/helpers/format-number", "games/helpers/format-number");
define.alias("ember-intl/helpers/format-relative", "games/helpers/format-relative");
define.alias("ember-intl/helpers/format-time", "games/helpers/format-time");
define.alias("ember-intl/helpers/t", "games/helpers/t");
define("games/helpers/tr", ["exports", "common-components/helpers/tr"], function (_exports, _tr) {
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
define("games/initializers/navigation-service", ["exports"], function (_exports) {
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
define("games/models/balls-game-1", ["exports", "games/models/pfgame", "addon-canvas/models/CRect", "addon-canvas/models/CLine", "games/models/circle-heros"], function (_exports, _pfgame, _CRect, _CLine, _circleHeros) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"games/models/pfgame",0,"addon-canvas/models/CRect",0,"addon-canvas/models/CLine",0,"games/models/circle-heros"eaimeta@70e063a35619d71f
  class BallsGame1 extends _pfgame.default {
    constructor(w_, h_) {
      super(w_, h_);
      this.rackets = [];
      this.balls = [];
      this.items = [];
    }
    getObjects() {
      const objects = [];
      objects.push(this.screen);
      for (let i = 0; i < this.balls.length; i++) {
        objects.push(this.balls[i]);
      }
      for (let i = 0; i < this.rackets.length; i++) {
        objects.push(this.rackets[i]);
      }
      for (let i = 0; i < this.items.length; i++) {
        objects.push(this.items[i]);
      }
      return objects;
    }
    loadConfigScene() {
      this.gameOver = false;
      this.screen = new _CRect.default(0, 0, 1, 1, [0, 0, 0], [0, 0, 0]);
      for (let i = 0; i < 3; i++) {
        this.balls.push(new _circleHeros.default(0.502, 0.402, 0.08, 0.08, [255, 255, 255], null, '', i));
      }
      this.balls[0].setVector([0.001 * this.w, -0.005 * this.h]);
      this.balls[1].setVector([0.003 * this.w, -0.008 * this.h]);
      this.balls[2].setVector([-0.007 * this.w, 0.002 * this.h]);
      //this.balls[3].setVector([-0.008*this.w,-0.003*this.h]);

      this.rackets.push(new _CLine.default(0.08, 0.4, 0.08, 0.6, [255, 255, 255], 8));
      this.rackets.push(new _CLine.default(0.92, 0.4, 0.92, 0.6, [255, 255, 255], 8));
      this.items.push(new _CLine.default(0.001, 0, 0.001, 1, [247, 176, 61], 17));
      this.items.push(new _CLine.default(1, 0, 1, 1, [247, 176, 61], 17));
      this.items.push(new _CLine.default(0.5, 0, 0.5, 1, [255, 255, 255], 3));
    }
    moveBalls() {
      for (let i = 0; i < this.balls.length; i++) {
        this.moveBall(this.balls[i]);
      }
    }
    addPoint() {
      this.gamePlay.updateScore(1);
      const score = this.gamePlay.getScore();
      if (score % 2 === 0) {
        this.gamePlay.updateNbLives(1);
        this.gamePlay.displayNbLives();
      }
      this.gamePlay.displayNbPoints();
    }
    moveBall(b) {
      if (this.activeGame === false) {
        return false;
      }
      let d = 0;
      b.translation(b.getVector());
      let dir0 = 0;
      let dir1 = 0;
      let r = (Math.random() * (7 - 3) + 3) / 14;
      for (let i = 0; i < 2; i++) {
        d = this.touchLine(b, [this.rackets[i]]);
        if (d[0] !== 0 || d[1] !== 0) {
          let c = 0;
          if (i === 0) {
            // left
            c = this.rackets[i].getX1() - b.getXLeft() + 2;
          } else {
            // right
            c = (b.getXRight() - this.rackets[i].getX1() - 1) * -1;
          }
          b.translation([c, 0]);
          dir0 = i === 0 ? 1 : -1;
          dir1 = Math.random() > 0.5 ? 1 : -1;
          b.setVector([r * b.getWidth() * dir0, r * b.getHeight() * dir1]);
          this.addPoint();
          return true;
        }
      }
      d = this.outOfArea(b);
      if (d[0] !== 0) {
        this.loseBall(b);
        return true;
      }
      if (d[0] !== 0 || d[1] !== 0) {
        dir0 = b.getVectorX() > 0 ? 1 : -1;
        dir1 = d[1] > 0 ? 1 : -1;
        b.setVector([r * b.getWidth() * dir0, r * b.getHeight() * dir1]);
        b.translation(d);
        return true;
      }
    }
    loseBall(b) {
      b.setPosition(b.getInitialPosition());
      this.gamePlay.updateNbLives(-1);
      this.gamePlay.displayNbLives();
      if (this.gamePlay.manageNbLives() === false) {
        this.activeGame = false;
        this.gameOver = true;
        this.gamePlay.displayMsg('Game over !');
      }
    }
    moveRackets(v) {
      if (this.activeGame === false) {
        return false;
      }
      for (let i = 0; i < this.rackets.length; i++) {
        this.rackets[i].setVector(v);
        this.rackets[i].translation(v);
      }
    }
    playerAction() {
      document.onkeydown = document.onkeyup = e => {
        const keys = {};
        e = e || event;
        keys[e.keyCode] = e.type === 'keydown';
        let y = 0;
        if (keys[38]) {
          // up
          y = -10;
        } else if (keys[40]) {
          // down
          y = 10;
        }
        if (y !== 0) {
          this.moveRackets([0, y]);
        }
      };
    }
    destroy() {
      document.onkeydown = null;
      document.onkeyup = null;
    }
  }
  var _default = _exports.default = BallsGame1;
});
define("games/models/circle-ennemy", ["exports", "games/models/circle-heros"], function (_exports, _circleHeros) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"games/models/circle-heros"eaimeta@70e063a35619d71f
  class CircleEnnemy extends _circleHeros.default {
    constructor(x, y, width_, height_, fillColor, strokeColor) {
      super(x, y, width_, height_, fillColor, strokeColor);
    }
  }
  var _default = _exports.default = CircleEnnemy;
});
define("games/models/circle-heros", ["exports", "addon-canvas/models/CCircle"], function (_exports, _CCircle) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"addon-canvas/models/CCircle"eaimeta@70e063a35619d71f
  class CircleHeros extends _CCircle.default {
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
  var _default = _exports.default = CircleHeros;
});
define("games/models/pfgame", ["exports", "games/models/pfgameplay", "addon-canvas/models/CRect", "addon-canvas/models/CText"], function (_exports, _pfgameplay, _CRect, _CText) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"games/models/pfgameplay",0,"addon-canvas/models/CRect",0,"addon-canvas/models/CText"eaimeta@70e063a35619d71f
  class PFGame {
    constructor(w_, h_) {
      this.screen = null;
      this.screen = new _CRect.default(0, 0, 1, 1, [0, 0, 0], [0, 0, 0]);
      this.activeGame = false;
      this.w = w_;
      this.h = h_;
      this.decor = 1;
      this.gameOver = false;
      this.text1 = null;
    }
    setText1(msg) {
      this.text1 = new _CText.default(50, 80, 50, 50, [255, 255, 255], msg);
    }
    initDisplayGame(lives_, score_, pointsForACoin_) {
      this.gamePlay = new _pfgameplay.default(lives_, score_, pointsForACoin_);
      this.gamePlay.displayMsg('');
      this.text1 = null;
      this.gamePlay.displayNbPoints();
      this.gamePlay.displayNbLives();
    }
    setActiveGame(b) {
      this.activeGame = b;
    }
    getActiveGame() {
      return this.activeGame;
    }
    setGameOver(b) {
      this.gameOver = b;
    }
    getGameOver() {
      return this.gameOver;
    }
    resizeObjects() {
      const objects = this.getObjects();
      for (let i = 0; i < objects.length; i++) {
        objects[i].resizeShape(this.w, this.h);
      }
    }
    outOfArea(o) {
      const d = [0, 0];
      if (o.getXLeft() <= this.screen.getXLeft()) {
        d[0] = this.screen.getXLeft() - o.getXLeft();
      } else if (o.getXRight() >= this.screen.getXRight()) {
        d[0] = this.screen.getXRight() - o.getXRight();
      }
      if (o.getYBottom() < 0) {
        d[1] += o.getYBottom() * -1;
      }
      if (o.getYTop() >= this.screen.getYTop()) {
        d[1] = this.screen.getYTop() - o.getYTop();
      }
      return d;
    }
    touchLine(m, o) {
      const c = [0, 0];
      for (let i = 0; i < o.length; i++) {
        const pts = m.getIntersectionWithSegment(o[i], false);
        if (pts.length > 0) {
          if (m.getYTop() >= o[i].getY1() && m.getVectorY() >= 0) {
            c[1] -= m.roundVal(m.getYTop() - o[i].getY1() + 2);
          } else {
            c[1] += m.roundVal(m.getYTop() - o[i].getY1() + 2);
          }
          return c;
        }
      }
      return c;
    }
    touchCircle(m, o) {
      for (let i = 0; i < o.length; i++) {
        if (o[i].getYTop() > 0) {
          const pts = m.getIntersectionPointsWithACircle(o[i]);
          if (pts.length > 0) {
            return i;
          }
        }
      }
      return -1;
    }
  }
  var _default = _exports.default = PFGame;
});
define("games/models/pfgameplay", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  class PFGamePlay {
    constructor(lives_, score_, pointsForACoin_) {
      this.lives = lives_;
      this.score = score_;
      this.pointsForACoin = pointsForACoin_;
    }
    getScore() {
      return this.score;
    }
    winACoin() {
      this.score += this.pointsForACoin;
    }
    updateScore(delta) {
      this.score += delta;
    }
    updateNbLives(delta) {
      this.lives += delta;
    }
    manageNbLives() {
      return this.lives > 0;
    }
    getWin() {
      return this.score >= 100;
    }
    displayNbPoints() {
      const element = document.getElementById('span-nb-points');
      if (element) {
        element.innerHTML = this.score + (this.score > 1 ? ' points' : ' point');
      }
    }
    displayNbLives() {
      const element = document.getElementById('span-nb-lives');
      if (element) {
        element.innerHTML = this.lives + (this.lives > 1 ? ' vies' : ' vie');
      }
    }
    displayMsg(msg) {
      const element = document.getElementById('span-nb-info');
      if (element) {
        element.innerHTML = msg;
      }
    }
  }
  var _default = _exports.default = PFGamePlay;
});
define("games/models/platform-game-1", ["exports", "games/models/pfgame", "addon-canvas/models/CRect", "addon-canvas/models/CLine", "addon-canvas/models/CCircle", "games/models/circle-heros", "games/models/circle-ennemy"], function (_exports, _pfgame, _CRect, _CLine, _CCircle, _circleHeros, _circleEnnemy) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"games/models/pfgame",0,"addon-canvas/models/CRect",0,"addon-canvas/models/CLine",0,"addon-canvas/models/CCircle",0,"games/models/circle-heros",0,"games/models/circle-ennemy"eaimeta@70e063a35619d71f
  class PFGame1 extends _pfgame.default {
    constructor(w_, h_) {
      super(w_, h_);
      this.listPlatforms = [];
      this.listCoins = [];
      this.listEnnemies = [];
      this.heros = null;
      this.text1 = null;
    }
    setDecor(d) {
      this.decor = d;
    }
    getObjects() {
      const objects = [];
      objects.push(this.screen);
      for (let i = 0; i < this.listPlatforms.length; i++) {
        objects.push(this.listPlatforms[i]);
      }
      for (let i = 0; i < this.listCoins.length; i++) {
        objects.push(this.listCoins[i]);
      }
      for (let i = 0; i < this.listEnnemies.length; i++) {
        objects.push(this.listEnnemies[i]);
      }
      if (this.text1) {
        objects.push(this.text1);
      }
      objects.push(this.heros);
      return objects;
    }
    loadConfigScene() {
      this.gameOver = false;
      // background
      this.screen = new _CRect.default(0, 0, 1, 1, [0, 0, 0], [0, 0, 0]);
      this.listPlatforms = [];
      this.listCoins = [];
      this.listEnnemies = [];
      let s = 0.02;
      switch (this.decor) {
        case 1:
          this.listEnnemies.push(new _circleEnnemy.default(0.05, 0.5, 0.1, 0.1, [255, 0, 51]));
          this.listEnnemies.push(new _circleEnnemy.default(0.5, 0.7, 0.1, 0.1, [255, 0, 51]));
          this.listEnnemies.push(new _circleEnnemy.default(0.05, 0.3, 0.1, 0.1, [255, 0, 51]));
          this.listEnnemies.push(new _circleEnnemy.default(0.4, 0.3, 0.1, 0.1, [255, 0, 51]));
          this.listPlatforms.push(new _CLine.default(0, 0.2, 0.3, 0.2, [255, 255, 255], 6));
          this.listPlatforms.push(new _CLine.default(0.7, 0.2, 1, 0.2, [255, 255, 255], 6));
          this.listPlatforms.push(new _CLine.default(0, 0.4, 0.1, 0.4, [255, 255, 255], 6));
          this.listPlatforms.push(new _CLine.default(0.3, 0.5, 0.7, 0.5, [255, 255, 255], 6));
          this.listPlatforms.push(new _CLine.default(0, 0.7, 0.4, 0.7, [255, 255, 255], 6));
          this.listPlatforms.push(new _CLine.default(0.6, 0.85, 1, 0.85, [255, 255, 255], 6));
          s = 0.03;
          this.listCoins.push(new _CCircle.default(0.3, 0.3, 0.05, 0.05, [255, 255, 0]));
          this.listCoins.push(new _CCircle.default(0.75, 0.35, 0.05, 0.05, [255, 255, 0]));
          break;
        case 2:
          this.listEnnemies.push(new _circleEnnemy.default(0.9, 0.05, 0.1, 0.1, [255, 0, 51]));
          this.listEnnemies.push(new _circleEnnemy.default(0.05, 0.5, 0.1, 0.1, [255, 0, 51]));
          this.listEnnemies.push(new _circleEnnemy.default(0.5, 0.7, 0.1, 0.1, [255, 0, 51]));
          this.listEnnemies.push(new _circleEnnemy.default(0.85, 0.36, 0.1, 0.1, [255, 0, 51]));
          this.listEnnemies.push(new _circleEnnemy.default(0.4, 0.3, 0.1, 0.1, [255, 0, 51]));
          this.listEnnemies.push(new _circleEnnemy.default(0.3, 0.93, 0.1, 0.1, [255, 0, 51]));
          this.listPlatforms.push(new _CLine.default(0, 0.2, 0.3, 0.2, [255, 255, 255], 6));
          this.listPlatforms.push(new _CLine.default(0.7, 0.2, 0.9, 0.2, [255, 255, 255], 6));
          this.listPlatforms.push(new _CLine.default(0, 0.4, 0.6, 0.4, [255, 255, 255], 6));
          this.listPlatforms.push(new _CLine.default(0.9, 0.4, 1, 0.4, [255, 255, 255], 6));
          this.listPlatforms.push(new _CLine.default(0, 0.7, 0.4, 0.7, [255, 255, 255], 6));
          this.listPlatforms.push(new _CLine.default(0.4, 0.85, 0.8, 0.85, [255, 255, 255], 6));
          this.listCoins.push(new _CCircle.default(0.1, 0.25, 0.05, 0.05, [255, 255, 0]));
          this.listCoins.push(new _CCircle.default(0.9, 0.25, 0.05, 0.05, [255, 255, 0]));
          this.listCoins.push(new _CCircle.default(0.15, 0.95, 0.05, 0.05, [255, 255, 0]));
          break;
        case 3:
          this.listPlatforms.push(new _CLine.default(0, 0.2, 0.6, 0.2, [255, 255, 255], 6));
          this.listPlatforms.push(new _CLine.default(0.8, 0.2, 1, 0.2, [255, 255, 255], 6));
          this.listPlatforms.push(new _CLine.default(0, 0.4, 0.3, 0.4, [255, 255, 255], 6));
          this.listPlatforms.push(new _CLine.default(0.6, 0.4, 1, 0.4, [255, 255, 255], 6));
          this.listPlatforms.push(new _CLine.default(0, 0.6, 0.85, 0.6, [255, 255, 255], 6));
          this.listPlatforms.push(new _CLine.default(0, 0.8, 0.6, 0.8, [255, 255, 255], 6));
          this.listPlatforms.push(new _CLine.default(0.8, 0.8, 1, 0.8, [255, 255, 255], 6));
          this.listEnnemies.push(new _circleEnnemy.default(0.9, 0.15, 0.1, 0.1, [255, 0, 51]));
          this.listEnnemies.push(new _circleEnnemy.default(0.4, 0.1, 0.1, 0.1, [255, 0, 51]));
          this.listEnnemies.push(new _circleEnnemy.default(0.6, 0.4, 0.1, 0.1, [255, 0, 51]));
          this.listEnnemies.push(new _circleEnnemy.default(0, 0.35, 0.1, 0.1, [255, 0, 51]));
          this.listEnnemies.push(new _circleEnnemy.default(0.6, 0.55, 0.1, 0.1, [255, 0, 51]));
          this.listEnnemies.push(new _circleEnnemy.default(0.6, 0.15, 0.1, 0.1, [255, 0, 51]));
          this.listCoins.push(new _CCircle.default(0.4, 0.5, 0.05, 0.05, [255, 255, 0]));
          this.listCoins.push(new _CCircle.default(0.8, 0.9, 0.05, 0.05, [255, 255, 0]));
          this.listCoins.push(new _CCircle.default(0.2, 0.9, 0.05, 0.05, [255, 255, 0]));
          break;
        case 4:
          this.listPlatforms.push(new _CLine.default(0, 0.2, 0.6, 0.2, [255, 255, 255], 6));
          this.listPlatforms.push(new _CLine.default(0.8, 0.2, 1, 0.2, [255, 255, 255], 6));
          this.listPlatforms.push(new _CLine.default(0, 0.4, 0.9, 0.4, [255, 255, 255], 6));
          this.listPlatforms.push(new _CLine.default(0.2, 0.6, 0.9, 0.6, [255, 255, 255], 6));
          this.listPlatforms.push(new _CLine.default(0, 0.8, 0.6, 0.8, [255, 255, 255], 6));
          this.listPlatforms.push(new _CLine.default(0.8, 0.8, 1, 0.8, [255, 255, 255], 6));
          this.listEnnemies.push(new _circleEnnemy.default(0.9, 0.15, 0.1, 0.1, [255, 0, 51]));
          this.listEnnemies.push(new _circleEnnemy.default(0.4, 0.1, 0.1, 0.1, [255, 0, 51]));
          this.listEnnemies.push(new _circleEnnemy.default(0.6, 0.4, 0.1, 0.1, [255, 0, 51]));
          this.listEnnemies.push(new _circleEnnemy.default(0, 0.35, 0.1, 0.1, [255, 0, 51]));
          this.listEnnemies.push(new _circleEnnemy.default(0.6, 0.55, 0.1, 0.1, [255, 0, 51]));
          this.listEnnemies.push(new _circleEnnemy.default(0.6, 0.15, 0.1, 0.1, [255, 0, 51]));
          this.listEnnemies.push(new _circleEnnemy.default(0.9, 0.76, 0.1, 0.1, [255, 0, 51]));
          this.listCoins.push(new _CCircle.default(0.8, 0.1, 0.05, 0.05, [255, 255, 0]));
          this.listCoins.push(new _CCircle.default(0.2, 0.9, 0.05, 0.05, [255, 255, 0]));
          break;
        case 5:
          this.listEnnemies.push(new _circleEnnemy.default(0, 0.9, 0.1, 0.1, [255, 0, 51]));
          this.listEnnemies.push(new _circleEnnemy.default(0.1, 0.5, 0.1, 0.1, [255, 0, 51]));
          this.listEnnemies.push(new _circleEnnemy.default(0.2, 0.1, 0.1, 0.1, [255, 0, 51]));
          this.listEnnemies.push(new _circleEnnemy.default(0.3, 0.4, 0.1, 0.1, [255, 0, 51]));
          this.listEnnemies.push(new _circleEnnemy.default(0.4, 0.1, 0.1, 0.1, [255, 0, 51]));
          this.listEnnemies.push(new _circleEnnemy.default(0.5, 0.2, 0.1, 0.1, [255, 0, 51]));
          this.listEnnemies.push(new _circleEnnemy.default(0.6, 0.8, 0.1, 0.1, [255, 0, 51]));
          this.listEnnemies.push(new _circleEnnemy.default(0.8, 0.7, 0.1, 0.1, [255, 0, 51]));
          this.listEnnemies.push(new _circleEnnemy.default(0.5, 0.5, 0.1, 0.1, [255, 0, 51]));
          this.listCoins.push(new _CCircle.default(0.5, 0.5, 0.05, 0.05, [255, 255, 0]));
          this.listCoins.push(new _CCircle.default(0.8, 0.9, 0.05, 0.05, [255, 255, 0]));
          this.listCoins.push(new _CCircle.default(0.2, 0.9, 0.05, 0.05, [255, 255, 0]));
          this.listPlatforms.push(new _CLine.default(0.5, 0.4, 0.9, 0.4, [255, 255, 255], 6));
          break;
      }
      this.heros = new _circleHeros.default(0.07, 0.07, 0.1, 0.1, [51, 153, 51]);
      this.heros.setShadow(3, 'yellow');
      this.heros.setVectorO([0, 0.018 * this.h]);
      for (let i = 0; i < this.listEnnemies.length; i++) {
        this.listEnnemies[i].setVector([s * this.w, 0.015 * this.h]);
      }
    }
    startGame() {
      this.setText1(`Level ${this.decor}`);
      this.gamePlay.displayMsg(`Level ${this.decor}`);
    }
    moveEnnemies() {
      if (this.activeGame === false) {
        return false;
      }
      let d = null;
      for (let i = 0; i < this.listEnnemies.length; i++) {
        this.listEnnemies[i].roundValues();
        let bExit = false;
        if (this.listEnnemies[i].getXLeft() <= 0) {
          bExit = true;
        }
        this.listEnnemies[i].translation(this.listEnnemies[i].getVector());
        d = this.outOfArea(this.listEnnemies[i]);
        if (d[0] !== 0 || d[1] !== 0) {
          this.listEnnemies[i].translation(d);
          if (d[0] !== 0) {
            this.listEnnemies[i].setVector([this.listEnnemies[i].getVectorX() * -1, this.listEnnemies[i].getVectorY()]);
          }
          if (d[1] > 0) {
            this.listEnnemies[i].setVector([this.listEnnemies[i].getVectorX(), this.listEnnemies[i].getVectorY() * -1]);
          }
        }
        d = this.touchLine(this.listEnnemies[i], this.listPlatforms);
        if (d[0] !== 0 || d[1] !== 0) {
          this.listEnnemies[i].translation(d);
        }
        d = this.outOfArea(this.listEnnemies[i]);
        if (d[0] !== 0 || d[1] !== 0) {
          this.listEnnemies[i].translation(d);
        }
        this.listEnnemies[i].roundValues();
        if (bExit && this.listEnnemies[i].getYTop() === this.screen.getYTop()) {
          this.listEnnemies[i].setPosition(this.listEnnemies[i].getInitialPosition());
        }
      }
    }
    moveHeros(v) {
      if (v === null) {
        v = this.heros.getVectorO();
      }
      this.heros.setVector(v);
      if (this.heros.getOriginReturn() === true) {
        this.heros.setPosition(this.heros.getInitialPosition());
        this.heros.setOriginReturn(false);
        if (this.gamePlay.manageNbLives() === false) {
          // game over
          this.activeGame = false;
          this.gamePlay.displayMsg('Game over !');
          this.setText1('Game over !');
          this.gameOver = true;
        }
      }
      if (this.activeGame === false) {
        return false;
      }
      if (this.listCoins.length === 0) {
        this.activeGame = false;
        if (this.decor < 5) {
          this.setText1('Next level');
          // Nouveau niveau
          setTimeout(() => {
            this.decor++;
            this.gamePlay.updateNbLives(1);
            this.gamePlay.displayNbLives();
            this.gamePlay.displayMsg(`Level ${this.decor}`);
          }, 500);
          setTimeout(() => {
            this.loadConfigScene();
            this.resizeObjects();
            this.activeGame = true;
          }, 2000);
        } else {
          this.setText1('Bravo !!!');
          this.gamePlay.displayMsg('Bravo !');
          this.gameOver = true;
        }
      }
      this.heros.translation(this.heros.getVector());
      if (this.touchCircle(this.heros, this.listEnnemies) >= 0) {
        this.setText1('-1');
        this.heros.setOriginReturn(true);
        this.gamePlay.updateNbLives(-1);
        this.gamePlay.displayNbLives();
      }
      let d = null;
      const c = this.touchCircle(this.heros, this.listCoins);
      if (c >= 0) {
        this.setText1('+10');
        this.listCoins.splice(c, 1);
        this.gamePlay.winACoin();
        this.gamePlay.displayNbPoints();
      }
      d = this.outOfArea(this.heros);
      if (d[0] !== 0 || d[1] !== 0) {
        this.heros.translation(d);
        if (d[0] !== 0) {
          this.heros.setVector([this.heros.getVectorX() * -1, this.heros.getVectorY()]);
        }
      }
      d = this.touchLine(this.heros, this.listPlatforms, true);
      if (d[0] !== 0 || d[1] !== 0) {
        this.heros.translation(d);
      }
      d = this.outOfArea(this.heros);
      if (d[0] !== 0 || d[1] !== 0) {
        this.heros.translation(d);
      }
    }
    setHerosPos(pos) {
      this.heros.setPosition(pos);
      this.moveHeros([0, 0]);
    }
    playerAction() {
      if (this.activeGame === true) {
        document.onkeydown = document.onkeyup = e => {
          const keys = {};
          e = e || event;
          keys[e.keyCode] = e.type === 'keydown';
          let x = 0;
          let y = 0;
          if (keys[38]) {
            // up
            y = -50;
          } else if (keys[37]) {
            // left
            x = -10;
          } else if (keys[39]) {
            // right
            x = 10;
          } else if (keys[40]) {
            // down
            y = 10;
          }
          if (x !== 0 || y !== 0) {
            this.moveHeros([x, y]);
          }
        };
      }
    }
    destroy() {
      document.onkeydown = null;
      document.onkeyup = null;
    }
  }
  var _default = _exports.default = PFGame1;
});
define("games/models/radar-game", ["exports", "games/models/pfgame", "addon-canvas/models/CRect", "common-components/models/audio/sound", "addon-canvas/models/CLine", "addon-canvas/models/CCircle", "addon-canvas/models/CText", "games/models/circle-heros"], function (_exports, _pfgame, _CRect, _sound, _CLine, _CCircle, _CText, _circleHeros) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"games/models/pfgame",0,"addon-canvas/models/CRect",0,"common-components/models/audio/sound",0,"addon-canvas/models/CLine",0,"addon-canvas/models/CCircle",0,"addon-canvas/models/CText",0,"games/models/circle-heros"eaimeta@70e063a35619d71f
  class RadarGame extends _pfgame.default {
    constructor(w_, h_) {
      super(w_, h_);
      this.indice = 0;
      this.heros = null;
      this.items = [];
      this.coins = [];
      this.ennemies = [];
    }
    getObjects() {
      const objects = [];
      objects.push(this.screen);
      for (let i = 0; i < this.items.length; i++) {
        objects.push(this.items[i]);
      }
      for (let i = 0; i < this.ennemies.length; i++) {
        objects.push(this.ennemies[i]);
      }
      for (let i = 0; i < this.coins.length; i++) {
        objects.push(this.coins[i]);
      }
      if (this.text1) {
        objects.push(this.text1);
      }
      objects.push(this.heros);
      return objects;
    }
    loadConfigScene() {
      this.screen = new _CRect.default(0, 0, 1, 1, [0, 0, 0], [0, 255, 0], '', 3);
      this.text1 = null;
      let h = 0;
      const nb = 12;
      let w = 0;
      for (let i = 0; i < nb; i++) {
        this.items.push(new _CLine.default(w, 0, w, 1, [0, 255, 0]));
        w += 1 / nb;
      }
      for (let j = 0; j < nb; j++) {
        this.items.push(new _CLine.default(0, h, 1, h, [0, 255, 0]));
        h += 1 / nb;
      }
      this.heros = new _circleHeros.default(0.2, 0.2, 0.035, 0.035, [0, 255, 0]);
      for (let j = 0; j < 200; j++) {
        this.ennemies.push(new _CCircle.default(Math.random(), (Math.random() * (4 - 0.5) + 0.5) * -1, 0.035, 0.035, [255, 0, 0]));
      }
      for (let i = 0; i < this.ennemies.length; i++) {
        this.ennemies[i].setVector([(Math.random() * (1 + 1) - 1) * this.w / 35, 0.06 * this.h]);
      }
      for (let j = 0; j < 100; j++) {
        this.coins.push(new _CCircle.default(Math.random(), (Math.random() * (4 - 0.5) + 0.5) * -1, 0.035, 0.035, [255, 255, 0]));
      }
      for (let i = 0; i < this.coins.length; i++) {
        this.coins[i].setVector([(Math.random() * (1 + 1) - 1) * this.w / 35, 0.04 * this.h]);
      }

      //	this.items.push(new CLine(c[0],0,c[0],1,[0,255,0]));
      //	this.items.push(new CLine(0,c[1],1,c[1],[0,255,0]));
      //	this.items.push(new CLine(0,0,1,1,[0,255,0]));
      //	this.items.push(new CLine(0,1,1,0,[0,255,0]));
      //	
      //	
      //	this.items.push(new CLine(0.75,0,0.25,1,[0,255,0]));

      //	this.items.push(new CLine(0,1,1,0,[0,255,0]));
      //	this.items.push(new CLine(0,1,1,0,[0,255,0]));
      //	this.items.push(new CLine(0,1,1,0,[0,255,0]));

      //this.items.push(new CCircle(0.1,0.1,0.8,0.8,null,[0,255,0],'',2));
    }
    moveHeros(v) {
      this.indice++;
      if (this.indice > 1000) {
        this.indice = 0;
      }
      if (this.activeGame === false) {
        return false;
      }
      if (v === null) {
        v = this.heros.getVectorO();
      }
      this.heros.setVector(v);
      this.heros.translation(this.heros.getVector());

      // touch an ennemny
      let e = this.touchCircle(this.heros, this.ennemies);
      if (e >= 0) {
        this.ennemies.splice(e, 1);
        this.gamePlay.updateNbLives(-1);
        this.gamePlay.displayNbLives();
        this.heros.setFillColor([255, 0, 255]);
        this.setText1('-1');
      } else {
        if (this.indice % 100 === 0) {
          this.heros.setFillColor([0, 255, 0]);
          this.text1 = null;
        }
      }

      // touch a coin
      const c = this.touchCircle(this.heros, this.coins);
      if (c >= 0) {
        this.coins.splice(c, 1);
        this.gamePlay.winACoin();
        const mySound = new _sound.default();
        mySound.load('assets/mp3/si.mp3');
        this.setText1('+1');
        if (this.gamePlay.getScore() % 3 === 0) {
          this.gamePlay.updateNbLives(1);
        }
        this.gamePlay.displayNbPoints();
      }

      // end of the game
      if (this.coins.length === 0) {
        this.activeGame = false;
        this.gamePlay.displayMsg('Bravo !');
      }
      if (this.gamePlay.manageNbLives() === false) {
        this.activeGame = false;
        this.gamePlay.displayMsg('Game over !');
        this.text1 = new _CText.default(150, 150, 150, 150, [255, 255, 255], 'GAME OVER');
      }
    }
    moveEnnemies() {
      if (this.activeGame === false) {
        return false;
      }
      for (let i = 0; i < this.ennemies.length; i++) {
        this.ennemies[i].translation(this.ennemies[i].getVector());
        if (this.ennemies[i].getY() > this.screen.getYTop()) {
          this.ennemies[i].setX(Math.random() * this.w);
          this.ennemies[i].setY((Math.random() * (2 - 1) + 1) * this.h * -1);
          this.ennemies[i].setVector([(Math.random() * (1 + 1) - 1) * this.w / 35, 0.06 * this.h]);
        }
      }
    }
    moveCoins() {
      if (this.activeGame === false) {
        return false;
      }
      for (let i = 0; i < this.coins.length; i++) {
        this.coins[i].translation(this.coins[i].getVector());
        if (this.coins[i].getY() > this.screen.getYTop()) {
          this.coins[i].setX(Math.random() * this.w);
          this.coins[i].setY((Math.random() * (5 - 1) + 1) * this.h * -1);
          this.coins[i].setVector([(Math.random() * (1 + 1) - 1) * this.w / 25, 0.04 * this.h]);
        }
      }
    }
    setHerosPos(pos) {
      this.heros.setPosition(pos);
      this.moveHeros([0, 0]);
    }
    playerAction() {}
  }
  var _default = _exports.default = RadarGame;
});
define.alias("@ember/render-modifiers/modifiers/did-insert", "games/modifiers/did-insert");
define.alias("@ember/render-modifiers/modifiers/did-update", "games/modifiers/did-update");
define.alias("@ember/render-modifiers/modifiers/will-destroy", "games/modifiers/will-destroy");
define("games/resolver", ["exports", "ember-resolver"], function (_exports, _emberResolver) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-resolver"eaimeta@70e063a35619d71f
  var _default = _exports.default = _emberResolver.default;
});
define("games/services/actions-handler", ["exports", "@ember/service"], function (_exports, _service) {
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
define("games/services/api-posts-service", ["exports", "@ember/service"], function (_exports, _service) {
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
define("games/services/deviant-art-service", ["exports", "@ember/service", "addon-canvas/models/CImg"], function (_exports, _service, _CImg) {
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
define("games/services/fullscreen-service", ["exports", "@ember/service"], function (_exports, _service) {
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
define.alias("ember-intl/services/intl", "games/services/intl");
define("games/services/model-notifier-service", ["exports", "@ember/service", "@glimmer/tracking"], function (_exports, _service, _tracking) {
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
define("games/services/navigation-service", ["exports", "@ember/service"], function (_exports, _service) {
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
define("games/templates/application", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
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
    "id": "jRjVb6FK",
    "block": "[[[46,[28,[37,1],null,null],null,null,null]],[],false,[\"component\",\"-outlet\"]]",
    "moduleName": "games/templates/application.hbs",
    "isStrictMode": false
  });
});
define("games/templates/balls-1", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    <article id="{{"componentID-1"}}" class="row mb-4 mt-4">
    <aside class="col col-md-12 mb-3">
      <Form::Balls1F @componentID={{"componentID-1"}} />
    </aside>
    <section class="col col-md-12">
      <Balls1C
        @fullscreenEnabled={{false}}
        @marginAutoComponent={{true}}
        @styleClassCanvas={{"border-gray"}}
        @componentID={{"componentID-1"}}
      />
    </section>
  </article>
  {{outlet}}
  */
  {
    "id": "+Hg5dfxD",
    "block": "[[[10,\"article\"],[15,1,[29,[\"componentID-1\"]]],[14,0,\"row mb-4 mt-4\"],[12],[1,\"\\n  \"],[10,\"aside\"],[14,0,\"col col-md-12 mb-3\"],[12],[1,\"\\n    \"],[8,[39,2],null,[[\"@componentID\"],[\"componentID-1\"]],null],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,\"section\"],[14,0,\"col col-md-12\"],[12],[1,\"\\n    \"],[8,[39,4],null,[[\"@fullscreenEnabled\",\"@marginAutoComponent\",\"@styleClassCanvas\",\"@componentID\"],[false,true,\"border-gray\",\"componentID-1\"]],null],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\"],[46,[28,[37,6],null,null],null,null,null]],[],false,[\"article\",\"aside\",\"form/balls1-f\",\"section\",\"balls1-c\",\"component\",\"-outlet\"]]",
    "moduleName": "games/templates/balls-1.hbs",
    "isStrictMode": false
  });
});
define("games/templates/black-synthe", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    <article id="{{'componentID-1'}}" class="row mt-4 mb-4">
    <div class="col col-md-8 col-12">
      <BlackSyntheP @fullscreenEnabled={{false}} />
    </div>
  </article>
  */
  {
    "id": "hWAP6xcg",
    "block": "[[[10,\"article\"],[15,1,[29,[\"componentID-1\"]]],[14,0,\"row mt-4 mb-4\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"col col-md-8 col-12\"],[12],[1,\"\\n    \"],[8,[39,2],null,[[\"@fullscreenEnabled\"],[false]],null],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[],false,[\"article\",\"div\",\"black-synthe-p\"]]",
    "moduleName": "games/templates/black-synthe.hbs",
    "isStrictMode": false
  });
});
define("games/templates/components/black-synthe-p", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    <section class="p-4">
    <ul class="list-group p-4">
      <li class="list-group-item p-2">
        <button
          class="btn-list-page btn btn-outline-secondary form-control p-3"
          role="button"
          type="button"
          onclick={{action "play" "do-d"}}
        >
          do - 1
        </button>
      </li>
      <li class="list-group-item p-2">
        <button
          class="btn-list-page btn btn-outline-secondary form-control p-3"
          role="button"
          type="button"
          onclick={{action "play" "re-d"}}
        >
          re - 2
        </button>
      </li>
      <li class="list-group-item p-2">
        <button
          class="btn-list-page btn btn-outline-secondary form-control p-3"
          role="button"
          type="button"
          onclick={{action "play" "mi-d"}}
        >
          mi - 3
        </button>
      </li>
      <li class="list-group-item p-2">
        <button
          class="btn-list-page btn btn-outline-secondary form-control p-3"
          role="button"
          type="button"
          onclick={{action "play" "fa-d"}}
        >
          fa - 4
        </button>
      </li>
      <li class="list-group-item p-2">
        <button
          class="btn-list-page btn btn-outline-secondary form-control p-3"
          role="button"
          type="button"
          onclick={{action "play" "sol-d"}}
        >
          sol - 5
        </button>
      </li>
      <li class="list-group-item p-2">
        <button
          class="btn-list-page btn btn-outline-secondary form-control p-3"
          role="button"
          type="button"
          onclick={{action "play" "lab-d"}}
        >
          la b - 6
        </button>
      </li>
      <li class="list-group-item p-2">
        <button
          class="btn-list-page btn btn-outline-secondary form-control p-3"
          role="button"
          type="button"
          onclick={{action "play" "la-d"}}
        >
          la - 7
        </button>
      </li>
      <li class="list-group-item p-2">
        <button
          class="btn-list-page btn btn-outline-secondary form-control p-3"
          role="button"
          type="button"
          onclick={{action "play" "sib-d"}}
        >
          si b - 8
        </button>
      </li>
      <li class="list-group-item p-2">
        <button
          class="btn-list-page btn btn-outline-secondary form-control p-3"
          role="button"
          type="button"
          onclick={{action "play" "si-d"}}
        >
          si - 9
        </button>
      </li>
    </ul>
  </section>
  
  <section class="col-12 col-md-9 mt-15">
    {{black-synthe-c}}
  </section>
  */
  {
    "id": "HTsDwhwY",
    "block": "[[[10,\"section\"],[14,0,\"p-4\"],[12],[1,\"\\n  \"],[10,\"ul\"],[14,0,\"list-group p-4\"],[12],[1,\"\\n    \"],[10,\"li\"],[14,0,\"list-group-item p-2\"],[12],[1,\"\\n      \"],[10,\"button\"],[14,0,\"btn-list-page btn btn-outline-secondary form-control p-3\"],[14,\"role\",\"button\"],[15,\"onclick\",[28,[37,4],[[30,0],\"play\",\"do-d\"],null]],[14,4,\"button\"],[12],[1,\"\\n        do - 1\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,\"li\"],[14,0,\"list-group-item p-2\"],[12],[1,\"\\n      \"],[10,\"button\"],[14,0,\"btn-list-page btn btn-outline-secondary form-control p-3\"],[14,\"role\",\"button\"],[15,\"onclick\",[28,[37,4],[[30,0],\"play\",\"re-d\"],null]],[14,4,\"button\"],[12],[1,\"\\n        re - 2\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,\"li\"],[14,0,\"list-group-item p-2\"],[12],[1,\"\\n      \"],[10,\"button\"],[14,0,\"btn-list-page btn btn-outline-secondary form-control p-3\"],[14,\"role\",\"button\"],[15,\"onclick\",[28,[37,4],[[30,0],\"play\",\"mi-d\"],null]],[14,4,\"button\"],[12],[1,\"\\n        mi - 3\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,\"li\"],[14,0,\"list-group-item p-2\"],[12],[1,\"\\n      \"],[10,\"button\"],[14,0,\"btn-list-page btn btn-outline-secondary form-control p-3\"],[14,\"role\",\"button\"],[15,\"onclick\",[28,[37,4],[[30,0],\"play\",\"fa-d\"],null]],[14,4,\"button\"],[12],[1,\"\\n        fa - 4\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,\"li\"],[14,0,\"list-group-item p-2\"],[12],[1,\"\\n      \"],[10,\"button\"],[14,0,\"btn-list-page btn btn-outline-secondary form-control p-3\"],[14,\"role\",\"button\"],[15,\"onclick\",[28,[37,4],[[30,0],\"play\",\"sol-d\"],null]],[14,4,\"button\"],[12],[1,\"\\n        sol - 5\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,\"li\"],[14,0,\"list-group-item p-2\"],[12],[1,\"\\n      \"],[10,\"button\"],[14,0,\"btn-list-page btn btn-outline-secondary form-control p-3\"],[14,\"role\",\"button\"],[15,\"onclick\",[28,[37,4],[[30,0],\"play\",\"lab-d\"],null]],[14,4,\"button\"],[12],[1,\"\\n        la b - 6\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,\"li\"],[14,0,\"list-group-item p-2\"],[12],[1,\"\\n      \"],[10,\"button\"],[14,0,\"btn-list-page btn btn-outline-secondary form-control p-3\"],[14,\"role\",\"button\"],[15,\"onclick\",[28,[37,4],[[30,0],\"play\",\"la-d\"],null]],[14,4,\"button\"],[12],[1,\"\\n        la - 7\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,\"li\"],[14,0,\"list-group-item p-2\"],[12],[1,\"\\n      \"],[10,\"button\"],[14,0,\"btn-list-page btn btn-outline-secondary form-control p-3\"],[14,\"role\",\"button\"],[15,\"onclick\",[28,[37,4],[[30,0],\"play\",\"sib-d\"],null]],[14,4,\"button\"],[12],[1,\"\\n        si b - 8\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,\"li\"],[14,0,\"list-group-item p-2\"],[12],[1,\"\\n      \"],[10,\"button\"],[14,0,\"btn-list-page btn btn-outline-secondary form-control p-3\"],[14,\"role\",\"button\"],[15,\"onclick\",[28,[37,4],[[30,0],\"play\",\"si-d\"],null]],[14,4,\"button\"],[12],[1,\"\\n        si - 9\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[10,\"section\"],[14,0,\"col-12 col-md-9 mt-15\"],[12],[1,\"\\n  \"],[1,[34,5]],[1,\"\\n\"],[13]],[],false,[\"section\",\"ul\",\"li\",\"button\",\"action\",\"black-synthe-c\"]]",
    "moduleName": "games/templates/components/black-synthe-p.hbs",
    "isStrictMode": false
  });
});
define("games/templates/components/form/balls1-f", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    <div id="results">
    <button
      class="btn-list-page btn btn-outline-secondary m-2"
      role="button"
      type="button"
      data-action-name="play"
      {{on "click" (fn this.componentExecAction @event)}}
    >
      {{tr "Play"}}
    </button>
    <span class="m-2">
      |
    </span>
    <button
      class="btn-list-page btn btn-outline-secondary m-2"
      role="button"
      type="button"
      data-action-name="stop"
      {{on "click" (fn this.componentExecAction @event)}}
    >
      {{tr "Stop"}}
    </button>
    <span class="m-2">
      |
    </span>
    <button
      class="btn-list-page btn btn-outline-secondary m-2"
      role="button"
      type="button"
      data-action-name="new"
      {{on "click" (fn this.componentExecAction @event)}}
    >
      {{tr "New game"}}
    </button>
    <span class="m-2">
      |
    </span>
    <span class="text-success m-2" id="span-nb-points">
      0 pt
    </span>
    <span class="m-2">
      |
    </span>
    <span class="text-danger m-2" color="red" id="span-nb-lives">
      3 vies
    </span>
    <span class="m-2">
      |
    </span>
    <span class="text-info m-2" id="span-nb-info"></span>
  </div>
  */
  {
    "id": "+qOXhSN7",
    "block": "[[[10,0],[14,1,\"results\"],[12],[1,\"\\n  \"],[11,\"button\"],[24,0,\"btn-list-page btn btn-outline-secondary m-2\"],[24,\"role\",\"button\"],[24,\"data-action-name\",\"play\"],[24,4,\"button\"],[4,[38,2],[\"click\",[28,[37,3],[[30,0,[\"componentExecAction\"]],[30,1]],null]],null],[12],[1,\"\\n    \"],[1,[28,[35,4],[\"Play\"],null]],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,1],[14,0,\"m-2\"],[12],[1,\"\\n    |\\n  \"],[13],[1,\"\\n  \"],[11,\"button\"],[24,0,\"btn-list-page btn btn-outline-secondary m-2\"],[24,\"role\",\"button\"],[24,\"data-action-name\",\"stop\"],[24,4,\"button\"],[4,[38,2],[\"click\",[28,[37,3],[[30,0,[\"componentExecAction\"]],[30,1]],null]],null],[12],[1,\"\\n    \"],[1,[28,[35,4],[\"Stop\"],null]],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,1],[14,0,\"m-2\"],[12],[1,\"\\n    |\\n  \"],[13],[1,\"\\n  \"],[11,\"button\"],[24,0,\"btn-list-page btn btn-outline-secondary m-2\"],[24,\"role\",\"button\"],[24,\"data-action-name\",\"new\"],[24,4,\"button\"],[4,[38,2],[\"click\",[28,[37,3],[[30,0,[\"componentExecAction\"]],[30,1]],null]],null],[12],[1,\"\\n    \"],[1,[28,[35,4],[\"New game\"],null]],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,1],[14,0,\"m-2\"],[12],[1,\"\\n    |\\n  \"],[13],[1,\"\\n  \"],[10,1],[14,0,\"text-success m-2\"],[14,1,\"span-nb-points\"],[12],[1,\"\\n    0 pt\\n  \"],[13],[1,\"\\n  \"],[10,1],[14,0,\"m-2\"],[12],[1,\"\\n    |\\n  \"],[13],[1,\"\\n  \"],[10,1],[14,0,\"text-danger m-2\"],[14,\"color\",\"red\"],[14,1,\"span-nb-lives\"],[12],[1,\"\\n    3 vies\\n  \"],[13],[1,\"\\n  \"],[10,1],[14,0,\"m-2\"],[12],[1,\"\\n    |\\n  \"],[13],[1,\"\\n  \"],[10,1],[14,0,\"text-info m-2\"],[14,1,\"span-nb-info\"],[12],[13],[1,\"\\n\"],[13]],[\"@event\"],false,[\"div\",\"button\",\"on\",\"fn\",\"tr\",\"span\"]]",
    "moduleName": "games/templates/components/form/balls1-f.hbs",
    "isStrictMode": false
  });
});
define("games/templates/components/form/platform1-f", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    <div id="results">
    <button
      class="btn-list-page btn btn-outline-secondary m-2"
      role="button"
      type="button"
      data-action-name="play"
      {{on "click" (fn this.componentExecAction @event)}}
    >
      {{tr "Play"}}
    </button>
    <span class="m-2">
      |
    </span>
    <button
      class="btn-list-page btn btn-outline-secondary m-2"
      role="button"
      type="button"
      data-action-name="stop"
      {{on "click" (fn this.componentExecAction @event)}}
    >
      {{tr "Stop"}}
    </button>
    <span class="m-2">
      |
    </span>
    <button
      class="btn-list-page btn btn-outline-secondary m-2"
      role="button"
      type="button"
      data-action-name="new"
      {{on "click" (fn this.componentExecAction @event)}}
    >
      {{tr "New game"}}
    </button>
    <span class="m-2">
      |
    </span>
    <span class="text-success m-2" id="span-nb-points">
      0 pt
    </span>
    <span class="m-2">
      |
    </span>
    <span class="text-danger m-2" color="red" id="span-nb-lives">
      3
      {{tr "lives"}}
    </span>
    <span class="m-2">
      |
    </span>
    <span class="text-info" id="span-nb-info"></span>
  </div>
  */
  {
    "id": "EjDbhXgS",
    "block": "[[[10,0],[14,1,\"results\"],[12],[1,\"\\n  \"],[11,\"button\"],[24,0,\"btn-list-page btn btn-outline-secondary m-2\"],[24,\"role\",\"button\"],[24,\"data-action-name\",\"play\"],[24,4,\"button\"],[4,[38,2],[\"click\",[28,[37,3],[[30,0,[\"componentExecAction\"]],[30,1]],null]],null],[12],[1,\"\\n    \"],[1,[28,[35,4],[\"Play\"],null]],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,1],[14,0,\"m-2\"],[12],[1,\"\\n    |\\n  \"],[13],[1,\"\\n  \"],[11,\"button\"],[24,0,\"btn-list-page btn btn-outline-secondary m-2\"],[24,\"role\",\"button\"],[24,\"data-action-name\",\"stop\"],[24,4,\"button\"],[4,[38,2],[\"click\",[28,[37,3],[[30,0,[\"componentExecAction\"]],[30,1]],null]],null],[12],[1,\"\\n    \"],[1,[28,[35,4],[\"Stop\"],null]],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,1],[14,0,\"m-2\"],[12],[1,\"\\n    |\\n  \"],[13],[1,\"\\n  \"],[11,\"button\"],[24,0,\"btn-list-page btn btn-outline-secondary m-2\"],[24,\"role\",\"button\"],[24,\"data-action-name\",\"new\"],[24,4,\"button\"],[4,[38,2],[\"click\",[28,[37,3],[[30,0,[\"componentExecAction\"]],[30,1]],null]],null],[12],[1,\"\\n    \"],[1,[28,[35,4],[\"New game\"],null]],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,1],[14,0,\"m-2\"],[12],[1,\"\\n    |\\n  \"],[13],[1,\"\\n  \"],[10,1],[14,0,\"text-success m-2\"],[14,1,\"span-nb-points\"],[12],[1,\"\\n    0 pt\\n  \"],[13],[1,\"\\n  \"],[10,1],[14,0,\"m-2\"],[12],[1,\"\\n    |\\n  \"],[13],[1,\"\\n  \"],[10,1],[14,0,\"text-danger m-2\"],[14,\"color\",\"red\"],[14,1,\"span-nb-lives\"],[12],[1,\"\\n    3\\n    \"],[1,[28,[35,4],[\"lives\"],null]],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,1],[14,0,\"m-2\"],[12],[1,\"\\n    |\\n  \"],[13],[1,\"\\n  \"],[10,1],[14,0,\"text-info\"],[14,1,\"span-nb-info\"],[12],[13],[1,\"\\n\"],[13]],[\"@event\"],false,[\"div\",\"button\",\"on\",\"fn\",\"tr\",\"span\"]]",
    "moduleName": "games/templates/components/form/platform1-f.hbs",
    "isStrictMode": false
  });
});
define("games/templates/components/form/radar-f", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    <div id="results">
    <button
      class="btn-list-page btn btn-outline-secondary m-2"
      role="button"
      type="button"
      data-action-name="play"
      {{on "click" (fn this.componentExecAction @event)}}
    >
      {{tr "Play"}}
    </button>
    <span class="m-2">
      |
    </span>
    <button
      class="btn-list-page btn btn-outline-secondary m-2"
      role="button"
      type="button"
      data-action-name="stop"
      {{on "click" (fn this.componentExecAction @event)}}
    >
      {{tr "Stop"}}
    </button>
    <span class="m-2">
      |
    </span>
    <button
      class="btn-list-page btn btn-outline-secondary m-2"
      role="button"
      type="button"
      data-action-name="new"
      {{on "click" (fn this.componentExecAction @event)}}
    >
      {{tr "New game"}}
    </button>
    <span class="m-2">
      |
    </span>
    <span class="text-success m-2" id="span-nb-points">
      0 pt
    </span>
    <span class="m-2">
      |
    </span>
    <span class="text-danger m-2" color="red" id="span-nb-lives">
      3 vies
    </span>
    <span class="m-2">
      |
    </span>
    <span class="text-info" id="span-nb-info"></span>
  </div>
  */
  {
    "id": "F1VV9jX8",
    "block": "[[[10,0],[14,1,\"results\"],[12],[1,\"\\n  \"],[11,\"button\"],[24,0,\"btn-list-page btn btn-outline-secondary m-2\"],[24,\"role\",\"button\"],[24,\"data-action-name\",\"play\"],[24,4,\"button\"],[4,[38,2],[\"click\",[28,[37,3],[[30,0,[\"componentExecAction\"]],[30,1]],null]],null],[12],[1,\"\\n    \"],[1,[28,[35,4],[\"Play\"],null]],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,1],[14,0,\"m-2\"],[12],[1,\"\\n    |\\n  \"],[13],[1,\"\\n  \"],[11,\"button\"],[24,0,\"btn-list-page btn btn-outline-secondary m-2\"],[24,\"role\",\"button\"],[24,\"data-action-name\",\"stop\"],[24,4,\"button\"],[4,[38,2],[\"click\",[28,[37,3],[[30,0,[\"componentExecAction\"]],[30,1]],null]],null],[12],[1,\"\\n    \"],[1,[28,[35,4],[\"Stop\"],null]],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,1],[14,0,\"m-2\"],[12],[1,\"\\n    |\\n  \"],[13],[1,\"\\n  \"],[11,\"button\"],[24,0,\"btn-list-page btn btn-outline-secondary m-2\"],[24,\"role\",\"button\"],[24,\"data-action-name\",\"new\"],[24,4,\"button\"],[4,[38,2],[\"click\",[28,[37,3],[[30,0,[\"componentExecAction\"]],[30,1]],null]],null],[12],[1,\"\\n    \"],[1,[28,[35,4],[\"New game\"],null]],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,1],[14,0,\"m-2\"],[12],[1,\"\\n    |\\n  \"],[13],[1,\"\\n  \"],[10,1],[14,0,\"text-success m-2\"],[14,1,\"span-nb-points\"],[12],[1,\"\\n    0 pt\\n  \"],[13],[1,\"\\n  \"],[10,1],[14,0,\"m-2\"],[12],[1,\"\\n    |\\n  \"],[13],[1,\"\\n  \"],[10,1],[14,0,\"text-danger m-2\"],[14,\"color\",\"red\"],[14,1,\"span-nb-lives\"],[12],[1,\"\\n    3 vies\\n  \"],[13],[1,\"\\n  \"],[10,1],[14,0,\"m-2\"],[12],[1,\"\\n    |\\n  \"],[13],[1,\"\\n  \"],[10,1],[14,0,\"text-info\"],[14,1,\"span-nb-info\"],[12],[13],[1,\"\\n\"],[13]],[\"@event\"],false,[\"div\",\"button\",\"on\",\"fn\",\"tr\",\"span\"]]",
    "moduleName": "games/templates/components/form/radar-f.hbs",
    "isStrictMode": false
  });
});
define("games/templates/index", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    <article class="container-xxl mt-4 mb-4">
    <section class="row mb-4">
      <div class="col col-md-4 col-12">
        <ul class="list-group index-list index-list-3 mb-3 list-group">
          <li class="list-group-item">
            <LinkTo role="link" @route="platform-1">
              {{tr "Balls"}}
            </LinkTo>
          </li>
          <li class="list-group-item">
            <LinkTo role="link" @route="balls-1">
              {{tr "Tennis"}}
            </LinkTo>
          </li>
          <li class="list-group-item">
            <LinkTo role="link" @route="radar">
              {{tr "Radar"}}
            </LinkTo>
          </li>
          <li class="list-group-item">
            <LinkTo role="link" @route="black-synthe">
              {{tr "Synthesizer"}}
            </LinkTo>
          </li>
        </ul>
      </div>
    </section>
  </article>
  {{outlet}}
  */
  {
    "id": "1n3RD08t",
    "block": "[[[10,\"article\"],[14,0,\"container-xxl mt-4 mb-4\"],[12],[1,\"\\n  \"],[10,\"section\"],[14,0,\"row mb-4\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col col-md-4 col-12\"],[12],[1,\"\\n      \"],[10,\"ul\"],[14,0,\"list-group index-list index-list-3 mb-3 list-group\"],[12],[1,\"\\n        \"],[10,\"li\"],[14,0,\"list-group-item\"],[12],[1,\"\\n          \"],[8,[39,5],[[24,\"role\",\"link\"]],[[\"@route\"],[\"platform-1\"]],[[\"default\"],[[[[1,\"\\n            \"],[1,[28,[35,6],[\"Balls\"],null]],[1,\"\\n          \"]],[]]]]],[1,\"\\n        \"],[13],[1,\"\\n        \"],[10,\"li\"],[14,0,\"list-group-item\"],[12],[1,\"\\n          \"],[8,[39,5],[[24,\"role\",\"link\"]],[[\"@route\"],[\"balls-1\"]],[[\"default\"],[[[[1,\"\\n            \"],[1,[28,[35,6],[\"Tennis\"],null]],[1,\"\\n          \"]],[]]]]],[1,\"\\n        \"],[13],[1,\"\\n        \"],[10,\"li\"],[14,0,\"list-group-item\"],[12],[1,\"\\n          \"],[8,[39,5],[[24,\"role\",\"link\"]],[[\"@route\"],[\"radar\"]],[[\"default\"],[[[[1,\"\\n            \"],[1,[28,[35,6],[\"Radar\"],null]],[1,\"\\n          \"]],[]]]]],[1,\"\\n        \"],[13],[1,\"\\n        \"],[10,\"li\"],[14,0,\"list-group-item\"],[12],[1,\"\\n          \"],[8,[39,5],[[24,\"role\",\"link\"]],[[\"@route\"],[\"black-synthe\"]],[[\"default\"],[[[[1,\"\\n            \"],[1,[28,[35,6],[\"Synthesizer\"],null]],[1,\"\\n          \"]],[]]]]],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\"],[46,[28,[37,8],null,null],null,null,null]],[],false,[\"article\",\"section\",\"div\",\"ul\",\"li\",\"link-to\",\"tr\",\"component\",\"-outlet\"]]",
    "moduleName": "games/templates/index.hbs",
    "isStrictMode": false
  });
});
define("games/templates/platform-1", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    <article id="{{'componentID-1'}}" class="row mb-4 mt-4">
    <aside class="col col-md-12 mb-3">
      <Form::Platform1F @componentID={{"componentID-1"}} />
    </aside>
    <section class="col col-md-12">
      <Platform1C
        @fullscreenEnabled={{false}}
        @marginAutoComponent={{true}}
        @styleClassCanvas={{"border-gray"}}
        @componentID={{"componentID-1"}}
      />
    </section>
  </article>
  {{outlet}}
  */
  {
    "id": "lWJ1sRv7",
    "block": "[[[10,\"article\"],[15,1,[29,[\"componentID-1\"]]],[14,0,\"row mb-4 mt-4\"],[12],[1,\"\\n  \"],[10,\"aside\"],[14,0,\"col col-md-12 mb-3\"],[12],[1,\"\\n    \"],[8,[39,2],null,[[\"@componentID\"],[\"componentID-1\"]],null],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,\"section\"],[14,0,\"col col-md-12\"],[12],[1,\"\\n    \"],[8,[39,4],null,[[\"@fullscreenEnabled\",\"@marginAutoComponent\",\"@styleClassCanvas\",\"@componentID\"],[false,true,\"border-gray\",\"componentID-1\"]],null],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\"],[46,[28,[37,6],null,null],null,null,null]],[],false,[\"article\",\"aside\",\"form/platform1-f\",\"section\",\"platform1-c\",\"component\",\"-outlet\"]]",
    "moduleName": "games/templates/platform-1.hbs",
    "isStrictMode": false
  });
});
define("games/templates/radar", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    <article id="{{"componentID-1"}}" class="row mb-4 mt-4">
    <aside class="col col-md-12 mb-3">
      <Form::RadarF @componentID={{"componentID-1"}} />
    </aside>
    <section class="col-md-12">
      <RadarC
        @fullscreenEnabled={{false}}
        @marginAutoComponent={{true}}
        @styleClassCanvas={{"border-gray"}}
        @componentID={{"componentID-1"}}
      />
    </section>
  </article>
  {{outlet}}
  */
  {
    "id": "bF7otbvU",
    "block": "[[[10,\"article\"],[15,1,[29,[\"componentID-1\"]]],[14,0,\"row mb-4 mt-4\"],[12],[1,\"\\n  \"],[10,\"aside\"],[14,0,\"col col-md-12 mb-3\"],[12],[1,\"\\n    \"],[8,[39,2],null,[[\"@componentID\"],[\"componentID-1\"]],null],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,\"section\"],[14,0,\"col-md-12\"],[12],[1,\"\\n    \"],[8,[39,4],null,[[\"@fullscreenEnabled\",\"@marginAutoComponent\",\"@styleClassCanvas\",\"@componentID\"],[false,true,\"border-gray\",\"componentID-1\"]],null],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\"],[46,[28,[37,6],null,null],null,null,null]],[],false,[\"article\",\"aside\",\"form/radar-f\",\"section\",\"radar-c\",\"component\",\"-outlet\"]]",
    "moduleName": "games/templates/radar.hbs",
    "isStrictMode": false
  });
});//# sourceMappingURL=engine.map
