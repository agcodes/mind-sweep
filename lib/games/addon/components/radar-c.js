import GamesComponent from 'games/components/game-c';
import RadarGame from 'games/models/radar-game'

export default class RadarC extends GamesComponent {
  initRender() {
    if (super.initRender() === false) {
      return false
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
    this.game = new RadarGame(this.canvasService.shapesGenerator.getWidth(), this.canvasService.shapesGenerator.getHeight());
    this.game.loadConfigScene();
    this.game.initDisplayGame(5, 0, 10);
    this.game.setActiveGame(true);
    this.game.playerAction();
    this.canvasService.drawService.drawObjects(this.game.getObjects(), true);

    this.canvasService.canvasElement.onmousemove = (event) => {
      const newMousePos = this.canvasService.getMousePosOnCanvas(event);
      this.game.setHerosPos(newMousePos);
      this.mousePosition = [newMousePos[0], newMousePos[1]];
    };
    return this.startComponentAnimation();
  }
}
