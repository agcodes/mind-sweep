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
    return (this.lives > 0);
  }

  getWin() {
    return (this.score >= 100);
  }

  displayNbPoints() {
    const element = document.getElementById('span-nb-points');
    if (element) {
      element.innerHTML = this.score + ((this.score > 1) ? ' points' : ' point');
    }
  }

  displayNbLives() {
    const element = document.getElementById('span-nb-lives');
    if (element) {
      element.innerHTML = this.lives + ((this.lives > 1) ? ' vies' : ' vie');
    }
  }

  displayMsg(msg) {
    const element = document.getElementById('span-nb-info');
    if (element) {
      element.innerHTML = msg;
    }
  }
}

export default PFGamePlay;
