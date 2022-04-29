const Warrior = require("./warrior.js");
const Game = require("./game.js");
const Background = require("./background.js");

const GameView = function (game, ctx) {
  this.ctx = ctx;
  this.game = game;
  
  this.warrior = this.game.addWarrior();
  /*
  this.boulders = this.game.addBoulders();
  this.badgermoles = this.game.addBadgermoles();
   */

};

const gameContainer = document.getElementById("game-container");
const canvas = document.getElementById("game-canvas");

GameView.MOVES = {
  "up": [0, -0.5],
  "down": [0, 0.5],
  "left": [-0.5, 0],
  "right": [0.5, 0],
};

GameView.prototype.bindKeyHandlers = function () {
  const warrior = this.warrior;
  Object.keys(GameView.MOVES).forEach(k => {
    let move = GameView.MOVES[k];
    key(k, function () {warrior.run(move)})
  });

  key("space", function () {
    warrior.breakBoulder()
  });
};

GameView.prototype.animate = function (time) {
  const delta = time - this.lastTime;
  this.backGround.drawBackground(this.ctx);
  this.game.gameDraw(this.ctx);
  this.lastTime = time;
  this.game.step(delta);
  requestAnimationFrame(this.animate.bind(this));
};

GameView.prototype.start = function () {
  this.bindKeyHandlers();
  this.lastTime = 0;
  this.backGround = new Background(this.ctx);
  requestAnimationFrame(this.animate.bind(this));
};

module.exports = GameView;