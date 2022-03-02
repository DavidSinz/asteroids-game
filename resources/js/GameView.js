
var gameView = (function () {
    
  var that = {},
    healthBar,
    playerPoints,
    playerLevel,
    gameState;

  function mainMenu() {
    document.getElementById('mainmenu').style.display = 'block';
    document.getElementById('gamescreen').style.display = 'none';
  }

  function gameScreen() {
    document.getElementById('mainmenu').style.display = 'none';
    document.getElementById('gamescreen').style.display = 'block';
  }

  function pauseGame() {
    mainMenu();
    gameState.style.visibility = 'visible';
    gameState.children[0].classList.remove('w3-text-red');
    gameState.children[0].classList.add('w3-text-black');
    gameState.children[0].innerHTML = 'Pause Game';
  }

  function endGame() {
    mainMenu();
    gameState.style.visibility = 'visible';
    gameState.children[0].classList.remove('w3-text-black');
    gameState.children[0].classList.add('w3-text-red');
    gameState.children[0].innerHTML = 'Game Over';
  }

  function continueDisabled() {
    document.getElementById('ctn-btn').disabled = true;
  }

  function continuePossible() {
    document.getElementById('ctn-btn').disabled = false;
  }

  function setHealthBar(health) {
    healthBar.style.width = health + '%';
  }

  function setPlayerPoints(points) {
    for (var i = 0; i < playerPoints.length; i++) {
      playerPoints[i].innerHTML = points + ' Points';
    }
  }

  function setPlayerLevel(level) {
    for (var i = 0; i < playerLevel.length; i++) {
      playerLevel[i].innerHTML = 'Level ' + level;
    }
  }

  function init() {
    healthBar = document.getElementById('health-bar');
    playerPoints = document.querySelectorAll('.player-points');
    playerLevel = document.querySelectorAll('.player-level');
    gameState = document.getElementById('game-state');
  }

  that.mainMenu = mainMenu;
  that.gameScreen = gameScreen;
  that.pauseGame = pauseGame;
  that.endGame = endGame;
  that.continueDisabled = continueDisabled;
  that.continuePossible = continuePossible;
  that.setHealthBar = setHealthBar;
  that.setPlayerPoints = setPlayerPoints;
  that.setPlayerLevel = setPlayerLevel;
  that.init = init;
  return that;

})();