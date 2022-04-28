const MovingObject = function (options) {
  this.pos = options.pos;
  this.originalPos = [this.pos[0] - 20, this.pos[1]];
  this.vel = options.vel;
  this.radius = options.radius;
  this.color = options.color;
  this.game = options.game;
};

const TIME_DELTA = 1000/60;

MovingObject.prototype.draw = function (ctx) {
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.art(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false);
  ctx.fill();
};

MovingObject.prototype.remove = function () {
  this.game.remove(this);
};

module.exports = MovingObject;