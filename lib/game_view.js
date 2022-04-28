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

GameView.MOVES = {
  "up": [0, -0.5],
  "down": [0, 0.5],
  "left": [-0.5, 0],
  "right": [0.5, 0],
};

GameView.prototype.bindKeyHandlers = function () {
  Object.keys(GameView.MOVES).forEach(k => {
    let move = GameView.MOVES[k];
    key(k, function () {warrior.run(move)})
  });

  key("space", function () {
    warrior.breakBoulder()
  });
};

GameView.prototype.animate = function (time) {
  // const delta = time - 
  const delta = time;
  this.game.step(delta);
  requestAnimationFrame(this.animate.bind(this))
}

GameView.prototype.start = function () {
  this.bindKeyHandlers();
  requestAnimationFrame(this.animate.bind(this));
};

module.exports = GameView;