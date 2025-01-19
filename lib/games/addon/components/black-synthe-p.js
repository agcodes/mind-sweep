import Sound from 'common-components/models/audio/sound';
import Component from "@glimmer/component";
import { action } from '@ember/object';

export default class BlackSyntheP extends Component {
  notes = null;
  arr = null;
  indice = 0;
  @action play(t) {
    this.playSound(t);
  }
  constructor(owner, args) {
		super(owner, args);

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
    const mySound = new Sound();
    mySound.load(`assets/mp3/${name}.mp3`);
  }
  initPlayerAction() {
    document.onkeydown = (e) => {
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
}