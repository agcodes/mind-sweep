import PFGame from 'games/models/pfgame';
import CRect from 'addon-canvas/models/CRect';
import CLine from 'addon-canvas/models/CLine';
import CircleHeros from 'games/models/circle-heros';

class BallsGame1 extends PFGame {
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
    this.screen = new CRect(0, 0, 1, 1, [0, 0, 0], [0, 0, 0]);
    for (let i = 0; i < 3; i++) {
      this.balls.push(new CircleHeros(0.502, 0.402, 0.08, 0.08, [255, 255, 255], null, '', i));
    }

    this.balls[0].setVector([0.001 * this.w, -0.005 * this.h]);
    this.balls[1].setVector([0.003 * this.w, -0.008 * this.h]);
    this.balls[2].setVector([-0.007 * this.w, 0.002 * this.h]);
    //this.balls[3].setVector([-0.008*this.w,-0.003*this.h]);

    this.rackets.push(new CLine(0.08, 0.4, 0.08, 0.6, [255, 255, 255], 8));
    this.rackets.push(new CLine(0.92, 0.4, 0.92, 0.6, [255, 255, 255], 8));

    this.items.push(new CLine(0.001, 0, 0.001, 1, [247, 176, 61], 17));
    this.items.push(new CLine(1, 0, 1, 1, [247, 176, 61], 17));

    this.items.push(new CLine(0.5, 0, 0.5, 1, [255, 255, 255], 3));
  }

  moveBalls() {
    for (let i = 0; i < this.balls.length; i++) {
      this.moveBall(this.balls[i]);
    }
  }

  addPoint() {
    this.gamePlay.updateScore(1);
    const score = this.gamePlay.getScore();
    if ((score % 2) === 0) {
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
        dir0 = (i === 0) ? 1 : -1;
        dir1 = (Math.random() > 0.5) ? 1 : -1;
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
      dir0 = (b.getVectorX() > 0) ? 1 : -1;
      dir1 = (d[1] > 0) ? 1 : -1;
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
    document.onkeydown = document.onkeyup = (e) => {
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

export default BallsGame1;
