import DrawingComponent from 'addon-canvas/components/drawing-component';

export default class GameComponent extends DrawingComponent {
  game = null;
  activeGame = false;
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
