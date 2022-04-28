// this is the entry file
document.addEventListener('DOMContentLoaded', () => {
  const GameView = require('./game_view.js');
  const Game = require('./game.js');

  const canvas = document.getElementById("game-canvas");
  const ctx = canvas ? canvas.getContext("2d") : {};
  
  if (canvas) {
    canvas.setAttribute("width", "1200px");
    canvas.setAttribute("height", "550px");
  }

  const welcome = document.getElementById('welcome');
  const explanation = document.getElementById('explanation');

  const g = new Game(ctx);
  const game = new GameView(g, ctx);
  const gameContainer = document.getElementById("game-container");

  const startButton = document.getElementById('start');
  const continueButton = document.getElementById('continue');

  
  if (startButton) {
    startButton.addEventListener("click", () => {
      welcome.classList.add("hidden");
      explanation.classList.remove("hidden");
    });
  };

  if (continueButton) {
    continueButton.addEventListener("click", () => {
      explanation.classList.add("hidden");
      gameContainer.classList.remove("hidden");
      canvas.classList.remove("hidden");
      game.start();
    });
  };
});