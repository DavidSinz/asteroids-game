
class ScoreLevelManager {

  constructor() {
    this.level = 1;
    this.bulletLevel = 1;
    this.speedLevel = 1;
    this.scoreMultiplier = 5;
    this.levelUpAt = 5 * this.scoreMultiplier;
    this.levelUp = false;
    this.score = 0;
    this.isNotLeveledUpYet = true;
  }

  increaseLevel() {
    this.level++;
    this.speedLevel++;
  }

  setBulletLevel(bl) {
    if (bl < 1) this.bulletLevel = 1;
    else if (bl <= 4) this.bulletLevel = bl;
    else if (bl > 4) this.bulletLevel = 4;
  }

  setEnemiesKilled(value) {
    this.score += value * this.scoreMultiplier;
    if (this.levelUp && this.score % this.levelUpAt === 0) {
      this.increaseLevel();
      this.levelUp = false;
    }
    if (this.score % this.levelUpAt !== 0) this.levelUp = true;
  }

  resetScore() {
    this.score = 0;
  }

}