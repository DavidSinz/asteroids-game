
var gameModel = (function () {
    
  var that = {},
    canvas,
    context,
    bulletMng,
    enemyMng,
    scrLevMng,
    player
    gameIsRunning = false;

  function initCanvas(width, height) {
    canvas = document.getElementById("canvas");
    canvas.width = width;
    canvas.height = height;
    context = canvas.getContext("2d");
  }

  function initEntities() {
    bulletMng = new BulletManager(canvas.width, canvas.height);
    enemyMng = new EnemyManager(canvas.width, canvas.height);
    scrLevMng = new ScoreLevelManager();
    player = new Player(canvas.width/2, canvas.height/2, 50, 50, 'resources/data/sprites/space_ship.png');
  }

  function animate() {
    if (gameIsRunning) {
      clearCanvas();
      updateGame();
      window.requestAnimationFrame(animate);
    }
  }

  function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  function updateGame() {
    gameView.setPlayerPoints(scrLevMng.score);
    gameView.setPlayerLevel(scrLevMng.level);
    enemyMng.setEnemySpeed(scrLevMng.speedLevel);
    scrLevMng.setBulletLevel(scrLevMng.level);
    bulletMng.draw(context);
    enemyMng.draw(context);
    player.update(canvas.width, canvas.height);
    player.draw(context);
    playerControls();
    checkCollision();
  }

  function playerControls() {
    if (gameKeys[37] || gameKeys[65]) player.turnLeft();
    if (gameKeys[39] || gameKeys[68]) player.turnRight();
    if (gameKeys[38] || gameKeys[87]) player.accelerate();
    if (gameKeys[40] || gameKeys[83]) player.decelerate();
    if (gameKeys[32]) bulletMng.shootBullets(player, scrLevMng.bulletLevel);
  }

  function checkCollision() {
    let enemiesKilled = 0;
    enemiesKilled += enemyMng.checkBulletCollision(bulletMng.firstBulletStream);
    enemiesKilled += enemyMng.checkBulletCollision(bulletMng.secondBulletStream);
    enemiesKilled += enemyMng.checkBulletCollision(bulletMng.thirdBulletStream);
    enemiesKilled += enemyMng.checkBulletCollision(bulletMng.fourthBulletStream);
    scrLevMng.setEnemiesKilled(enemiesKilled);
    if (enemyMng.checkPlayerCollision(player)) {
      player.health -= 10;
      gameView.setHealthBar(player.health);
      if (player.health === 0) endGame();
    }
  }

  function newGame() {
    initEntities();
    gameIsRunning = true;
    animate();
    player.health = 100;
    scrLevMng.resetScore();
    gameView.setHealthBar(player.health);
    gameView.gameScreen();
    gameView.continuePossible();
  }

  function pauseGame() {
    gameIsRunning = false;
    gameView.pauseGame();
  }

  function continueGame() {
    gameIsRunning = true;
    animate();
    gameView.gameScreen();
  }

  function endGame() {
    gameIsRunning = false;
    gameView.endGame();
    gameView.continueDisabled();
    bulletMng = undefined;
    enemyMng = undefined;
    scrLevMng = undefined;
    player = undefined;
  }

  function init(canvasWidth, canvasHeight) {
    initCanvas(canvasWidth, canvasHeight);
  }

  that.clearCanvas = clearCanvas;
  that.updateGame = updateGame;
  that.newGame = newGame;
  that.pauseGame = pauseGame;
  that.continueGame = continueGame;
  that.endGame = endGame;
  that.init = init;
  return that;

})();