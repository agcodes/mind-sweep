import GamesComponent from 'games/components/game-c';
import BallsGame1 from 'games/models/balls-game-1';

export default class Balls1C extends GamesComponent {
 initRender() {
		if (super.initRender() === false) {
			return false
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
    this.game = new BallsGame1(this.canvasService.getWidth(), this.canvasService.getHeight());
    this.game.loadConfigScene();
    this.game.initDisplayGame(3, 0, 20);
    this.game.setActiveGame(true);
    // draw object (witg resize)
    this.canvasService.drawService.drawObjects(this.game.getObjects(), true);
    this.game.playerAction();
    return this.startComponentAnimation();
  }
}
