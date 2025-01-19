import PFGamePlay from 'games/models/pfgameplay';
import CRect from 'addon-canvas/models/CRect';
import CText from 'addon-canvas/models/CText';

class PFGame {
  constructor(w_, h_) {
    this.screen = null;
    this.screen = new CRect(0, 0, 1, 1, [0, 0, 0], [0, 0, 0]);
    this.activeGame = false;
    this.w = w_;
    this.h = h_;
    this.decor = 1;
    this.gameOver = false;
    this.text1 = null;
  }
  setText1(msg) {
    this.text1 = new CText(50, 80, 50, 50, [255, 255, 255], msg);
  }
  initDisplayGame(lives_, score_, pointsForACoin_) {
    this.gamePlay = new PFGamePlay(lives_, score_, pointsForACoin_);
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

export default PFGame;
