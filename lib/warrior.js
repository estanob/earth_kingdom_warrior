const { util } = require("webpack");
const MovingObject = require("./moving_object.js");

const DEFAULTS = {
  CHARACTER_WIDTH: 90,
  CHARACTER_HEIGHT: 100,
  COLOR: '#50b9d9',
  RADIUS: 15,
  SPEED: 1,
}

const Warrior = function(options) {
  options.color = DEFAULTS.COLOR;
  options.radius = DEFAULTS.RADIUS;
  options.pos = options.pos || [150, 250];
  options.vel = options.vel || [0,0];
  options.x = 200;
  options.y = 200;
  // options.image = warriorImg.src
  MovingObject.call(this, options);
};

util.inherits(Warrior, MovingObject);