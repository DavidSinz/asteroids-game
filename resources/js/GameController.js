
var gameKeys = [],
  buttons = [];

var gameController = (function () {
  var that = {};

  function keyDown(event) {
    gameKeys[event.keyCode] = true;
  }

  function keyUp(event) {
    gameKeys[event.keyCode] = false;
  }

  function onNewGame(event) {
    gameModel.newGame();
  }

  function onPauseGame(event) {
    gameModel.pauseGame();
  }

  function onContinue(event) {
    gameModel.continueGame();
  }


  function init() {
    window.addEventListener('keydown', keyDown);
    window.addEventListener('keyup', keyUp);
    document.getElementById('new-game').addEventListener('click', onNewGame);
    document.getElementById('pause-game').addEventListener('click', onPauseGame);
    document.getElementById('continue').addEventListener('click', onContinue);
  }

  that.init = init;
  return that;
})();