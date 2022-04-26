const GameView = function (game, ctx) {
  this.ctx = ctx;
  this.game = game;
  
  /*
  this.earthWarrior = this.game.addEarthWarrior();
  this.boulders = this.game.addBoulders();
  this.badgermoles = this.game.addBadgermoles();
   */

};

const gameContainer = document.getElementById("game-container");
const canvas = document.getElementById("game-canvas");
console.log("Game View is working")

GameView.MOVES = {
  "up": [0, -0.5],
  "down": [0, 0.5],
  "left": [-0.5, 0],
  "right": [0.5, 0],
};

module.exports = GameView;