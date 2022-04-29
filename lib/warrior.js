const Util = require("./util.js");
const MovingObject = require("./moving_object.js");

const DEFAULTS = {
  CHARACTER_WIDTH: 90,
  CHARACTER_HEIGHT: 100,
  COLOR: '#50b9d9',
  RADIUS: 15,
  SPEED: 1,
};

const TIME_DELTA = 1000 / 60;

const tophImg = new Image ();
tophImg.src = "lib/toph_image.png"

const canvas = document.getElementById("game-canvas");

const Warrior = function(options) {
  options.color = DEFAULTS.COLOR;
  options.radius = DEFAULTS.RADIUS;
  options.pos = options.pos || [150, 250];
  options.vel = options.vel || [0,0];
  options.x = 200;
  options.y = 200;
  options.image = tophImg.src
  // options.image = warriorImg.src
  MovingObject.call(this, options);
};

Util.inherits(Warrior, MovingObject);

Warrior.prototype.drawWarrior = function (ctx) {
  ctx.drawImage(tophImg, this.pos[0], this.pos[1], 100, 100);
  // ctx.drawImage(DEFAULTS, this.pos[0], this.pos[1], 100, 100);
};

Warrior.prototype.moveWarrior = function (delta) {
  const vel = delta / TIME_DELTA;
  const moveX = this.vel[0] * vel;
  const moveY = this.vel[1] * vel;
  
  this.pos = [this.pos[0] + moveX, this.pos[1] + moveY];

  if (this.game.isOutOfBounds(this.pos)) {
    this.vel[0] = 0;
    this.vel[1] = 0;
  };
};

Warrior.prototype.run = function (impulse) {
  this.vel[0] += impulse[0];
  this.vel[1] += impulse[1];
}

Warrior.prototype.bounds = function () {
  return {
    left: this.x,
    right: this.x + DEFAULTS.CHARACTER_WIDTH,
    top: this.y,
    bottom: this.y - DEFAULTS.CHARACTER_HEIGHT,
  };
};

console.log("Warrior: ", Warrior);

module.exports = Warrior;