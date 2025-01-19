import PFGame from 'games/models/pfgame';
import CRect from 'addon-canvas/models/CRect';
import CLine from 'addon-canvas/models/CLine';
import CCircle from 'addon-canvas/models/CCircle';
import CircleHeros from 'games/models/circle-heros';
import CircleEnnemy from 'games/models/circle-ennemy';

class PFGame1 extends PFGame {
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
    this.screen = new CRect(0, 0, 1, 1, [0, 0, 0], [0, 0, 0]);

    this.listPlatforms = [];
    this.listCoins = [];
    this.listEnnemies = [];
    let s = 0.02;

    switch (this.decor) {
      case 1:
        this.listEnnemies.push(new CircleEnnemy(0.05, 0.5, 0.1, 0.1, [255, 0, 51]));
        this.listEnnemies.push(new CircleEnnemy(0.5, 0.7, 0.1, 0.1, [255, 0, 51]));
        this.listEnnemies.push(new CircleEnnemy(0.05, 0.3, 0.1, 0.1, [255, 0, 51]));
        this.listEnnemies.push(new CircleEnnemy(0.4, 0.3, 0.1, 0.1, [255, 0, 51]));

        this.listPlatforms.push(new CLine(0, 0.2, 0.3, 0.2, [255, 255, 255], 6));
        this.listPlatforms.push(new CLine(0.7, 0.2, 1, 0.2, [255, 255, 255], 6));
        this.listPlatforms.push(new CLine(0, 0.4, 0.1, 0.4, [255, 255, 255], 6));
        this.listPlatforms.push(new CLine(0.3, 0.5, 0.7, 0.5, [255, 255, 255], 6));
        this.listPlatforms.push(new CLine(0, 0.7, 0.4, 0.7, [255, 255, 255], 6));
        this.listPlatforms.push(new CLine(0.6, 0.85, 1, 0.85, [255, 255, 255], 6));

        s = 0.03;
        this.listCoins.push(new CCircle(0.3, 0.3, 0.05, 0.05, [255, 255, 0]));
        this.listCoins.push(new CCircle(0.75, 0.35, 0.05, 0.05, [255, 255, 0]));
        break;

      case 2:
        this.listEnnemies.push(new CircleEnnemy(0.9, 0.05, 0.1, 0.1, [255, 0, 51]));
        this.listEnnemies.push(new CircleEnnemy(0.05, 0.5, 0.1, 0.1, [255, 0, 51]));
        this.listEnnemies.push(new CircleEnnemy(0.5, 0.7, 0.1, 0.1, [255, 0, 51]));
        this.listEnnemies.push(new CircleEnnemy(0.85, 0.36, 0.1, 0.1, [255, 0, 51]));
        this.listEnnemies.push(new CircleEnnemy(0.4, 0.3, 0.1, 0.1, [255, 0, 51]));
        this.listEnnemies.push(new CircleEnnemy(0.3, 0.93, 0.1, 0.1, [255, 0, 51]));


        this.listPlatforms.push(new CLine(0, 0.2, 0.3, 0.2, [255, 255, 255], 6));
        this.listPlatforms.push(new CLine(0.7, 0.2, 0.9, 0.2, [255, 255, 255], 6));
        this.listPlatforms.push(new CLine(0, 0.4, 0.6, 0.4, [255, 255, 255], 6));
        this.listPlatforms.push(new CLine(0.9, 0.4, 1, 0.4, [255, 255, 255], 6));
        this.listPlatforms.push(new CLine(0, 0.7, 0.4, 0.7, [255, 255, 255], 6));
        this.listPlatforms.push(new CLine(0.4, 0.85, 0.8, 0.85, [255, 255, 255], 6));

        this.listCoins.push(new CCircle(0.1, 0.25, 0.05, 0.05, [255, 255, 0]));

        this.listCoins.push(new CCircle(0.9, 0.25, 0.05, 0.05, [255, 255, 0]));
        this.listCoins.push(new CCircle(0.15, 0.95, 0.05, 0.05, [255, 255, 0]));
        break;
      case 3:
        this.listPlatforms.push(new CLine(0, 0.2, 0.6, 0.2, [255, 255, 255], 6));
        this.listPlatforms.push(new CLine(0.8, 0.2, 1, 0.2, [255, 255, 255], 6));

        this.listPlatforms.push(new CLine(0, 0.4, 0.3, 0.4, [255, 255, 255], 6));
        this.listPlatforms.push(new CLine(0.6, 0.4, 1, 0.4, [255, 255, 255], 6));

        this.listPlatforms.push(new CLine(0, 0.6, 0.85, 0.6, [255, 255, 255], 6));

        this.listPlatforms.push(new CLine(0, 0.8, 0.6, 0.8, [255, 255, 255], 6));
        this.listPlatforms.push(new CLine(0.8, 0.8, 1, 0.8, [255, 255, 255], 6));

        this.listEnnemies.push(new CircleEnnemy(0.9, 0.15, 0.1, 0.1, [255, 0, 51]));
        this.listEnnemies.push(new CircleEnnemy(0.4, 0.1, 0.1, 0.1, [255, 0, 51]));
        this.listEnnemies.push(new CircleEnnemy(0.6, 0.4, 0.1, 0.1, [255, 0, 51]));

        this.listEnnemies.push(new CircleEnnemy(0, 0.35, 0.1, 0.1, [255, 0, 51]));

        this.listEnnemies.push(new CircleEnnemy(0.6, 0.55, 0.1, 0.1, [255, 0, 51]));
        this.listEnnemies.push(new CircleEnnemy(0.6, 0.15, 0.1, 0.1, [255, 0, 51]));

        this.listCoins.push(new CCircle(0.4, 0.5, 0.05, 0.05, [255, 255, 0]));

        this.listCoins.push(new CCircle(0.8, 0.9, 0.05, 0.05, [255, 255, 0]));
        this.listCoins.push(new CCircle(0.2, 0.9, 0.05, 0.05, [255, 255, 0]));
        break;
      case 4:
        this.listPlatforms.push(new CLine(0, 0.2, 0.6, 0.2, [255, 255, 255], 6));
        this.listPlatforms.push(new CLine(0.8, 0.2, 1, 0.2, [255, 255, 255], 6));

        this.listPlatforms.push(new CLine(0, 0.4, 0.9, 0.4, [255, 255, 255], 6));

        this.listPlatforms.push(new CLine(0.2, 0.6, 0.9, 0.6, [255, 255, 255], 6));

        this.listPlatforms.push(new CLine(0, 0.8, 0.6, 0.8, [255, 255, 255], 6));
        this.listPlatforms.push(new CLine(0.8, 0.8, 1, 0.8, [255, 255, 255], 6));

        this.listEnnemies.push(new CircleEnnemy(0.9, 0.15, 0.1, 0.1, [255, 0, 51]));
        this.listEnnemies.push(new CircleEnnemy(0.4, 0.1, 0.1, 0.1, [255, 0, 51]));
        this.listEnnemies.push(new CircleEnnemy(0.6, 0.4, 0.1, 0.1, [255, 0, 51]));

        this.listEnnemies.push(new CircleEnnemy(0, 0.35, 0.1, 0.1, [255, 0, 51]));

        this.listEnnemies.push(new CircleEnnemy(0.6, 0.55, 0.1, 0.1, [255, 0, 51]));
        this.listEnnemies.push(new CircleEnnemy(0.6, 0.15, 0.1, 0.1, [255, 0, 51]));

        this.listEnnemies.push(new CircleEnnemy(0.9, 0.76, 0.1, 0.1, [255, 0, 51]));

        this.listCoins.push(new CCircle(0.8, 0.1, 0.05, 0.05, [255, 255, 0]));
        this.listCoins.push(new CCircle(0.2, 0.9, 0.05, 0.05, [255, 255, 0]));
        break;
      case 5:
        this.listEnnemies.push(new CircleEnnemy(0, 0.9, 0.1, 0.1, [255, 0, 51]));
        this.listEnnemies.push(new CircleEnnemy(0.1, 0.5, 0.1, 0.1, [255, 0, 51]));
        this.listEnnemies.push(new CircleEnnemy(0.2, 0.1, 0.1, 0.1, [255, 0, 51]));
        this.listEnnemies.push(new CircleEnnemy(0.3, 0.4, 0.1, 0.1, [255, 0, 51]));
        this.listEnnemies.push(new CircleEnnemy(0.4, 0.1, 0.1, 0.1, [255, 0, 51]));
        this.listEnnemies.push(new CircleEnnemy(0.5, 0.2, 0.1, 0.1, [255, 0, 51]));
        this.listEnnemies.push(new CircleEnnemy(0.6, 0.8, 0.1, 0.1, [255, 0, 51]));
        this.listEnnemies.push(new CircleEnnemy(0.8, 0.7, 0.1, 0.1, [255, 0, 51]));
        this.listEnnemies.push(new CircleEnnemy(0.5, 0.5, 0.1, 0.1, [255, 0, 51]));

        this.listCoins.push(new CCircle(0.5, 0.5, 0.05, 0.05, [255, 255, 0]));
        this.listCoins.push(new CCircle(0.8, 0.9, 0.05, 0.05, [255, 255, 0]));
        this.listCoins.push(new CCircle(0.2, 0.9, 0.05, 0.05, [255, 255, 0]));

        this.listPlatforms.push(new CLine(0.5, 0.4, 0.9, 0.4, [255, 255, 255], 6));
        break;
    }

    this.heros = new CircleHeros(0.07, 0.07, 0.1, 0.1, [51, 153, 51]);
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
      document.onkeydown = document.onkeyup = (e) => {
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

export default PFGame1;
