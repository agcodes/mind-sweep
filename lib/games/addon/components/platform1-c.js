import GamesComponent from 'games/components/game-c';
import PFGame1 from 'games/models/platform-game-1';

export default class Platform1C extends GamesComponent {
  initRender() {
    if (super.initRender() === false) {
      return false
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
    this.game = new PFGame1(this.canvasService.shapesGenerator.getWidth(), this.canvasService.shapesGenerator.getHeight());
    this.game.loadConfigScene();
    this.game.initDisplayGame(3, 0, 10);
    this.game.setActiveGame(true);
    this.game.playerAction();
    this.game.startGame();
    this.canvasService.drawService.drawObjects(this.game.getObjects(), true);
    return this.startComponentAnimation();
  }
}
