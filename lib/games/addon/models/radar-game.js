import PFGame from 'games/models/pfgame';
import CRect from 'addon-canvas/models/CRect';
import Sound from 'common-components/models/audio/sound';
import CLine from 'addon-canvas/models/CLine';
import CCircle from 'addon-canvas/models/CCircle';
import CText from 'addon-canvas/models/CText';
import CircleHeros from 'games/models/circle-heros';

class RadarGame extends PFGame {
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
    this.screen = new CRect(0, 0, 1, 1, [0, 0, 0], [0, 255, 0], '', 3);
    this.text1 = null;
    let h = 0;
    const nb = 12;
    let w = 0;

    for (let i = 0; i < nb; i++) {
      this.items.push(new CLine(w, 0, w, 1, [0, 255, 0]));
      w += 1 / nb;
    }

    for (let j = 0; j < nb; j++) {
      this.items.push(new CLine(0, h, 1, h, [0, 255, 0]));
      h += 1 / nb;
    }

    this.heros = new CircleHeros(0.2, 0.2, 0.035, 0.035, [0, 255, 0]);

    for (let j = 0; j < 200; j++) {
      this.ennemies.push(new CCircle(Math.random(), (Math.random() * (4 - 0.5) + 0.5) * -1, 0.035, 0.035, [255, 0, 0]));
    }

    for (let i = 0; i < this.ennemies.length; i++) {
      this.ennemies[i].setVector([((Math.random() * (1 + 1) - 1) * this.w) / 35, 0.06 * this.h]);
    }

    for (let j = 0; j < 100; j++) {
      this.coins.push(new CCircle(Math.random(), (Math.random() * (4 - 0.5) + 0.5) * -1, 0.035, 0.035, [255, 255, 0]));
    }

    for (let i = 0; i < this.coins.length; i++) {
      this.coins[i].setVector([((Math.random() * (1 + 1) - 1) * this.w) / 35, 0.04 * this.h]);
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
      const mySound = new Sound();
      mySound.load('assets/mp3/si.mp3');
      this.setText1('+1');
      if ((this.gamePlay.getScore() % 3) === 0) {
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
      this.text1 = new CText(150, 150, 150, 150, [255, 255, 255], 'GAME OVER');
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
        this.ennemies[i].setVector([((Math.random() * (1 + 1) - 1) * this.w) / 35, 0.06 * this.h]);
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
        this.coins[i].setVector([((Math.random() * (1 + 1) - 1) * this.w) / 25, 0.04 * this.h]);
      }
    }
  }

  setHerosPos(pos) {
    this.heros.setPosition(pos);
    this.moveHeros([0, 0]);
  }

  playerAction() {

  }
}


export default RadarGame;
