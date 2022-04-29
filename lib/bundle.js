/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./lib/background.js":
/*!***************************!*\
  !*** ./lib/background.js ***!
  \***************************/
/***/ ((module) => {

const Background = function () {
  this.backgroundImg = new Image ();
  this.backgroundImg.src = "lib/earth_kingdom.png"
}

Background.prototype.drawBackground = function (ctx) {
  ctx.drawImage(this.backgroundImg, 0, 0, 1200, 550);
};

module.exports = Background;

/***/ }),

/***/ "./lib/game.js":
/*!*********************!*\
  !*** ./lib/game.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Warrior = __webpack_require__(/*! ./warrior.js */ "./lib/warrior.js");

class Game {
  constructor(ctx) {
    this.warrior = {};
    this.boulders = [];
    this.bouldersPassed = 0;
    this.bouldersHit = 0;
    this.metalPieces = [];
    this.metalPiecesPassed = 0;
    this.metalPiecesHit = 0;
    this.numBoulders = Math.floor(Math.random() * (100 - 15 + 1) + 15); // Min: 15, Max: 100
    this.gameCanvas = document.getElementById("game-canvas")
    this.ctx = ctx;
  };

  warriorStartPosition() {
    return [150, 250];
  };

  gameDraw(ctx) {
    this.warrior.drawWarrior(ctx);
  };

  addWarrior() {
    const warrior = new Warrior({
      pos: this.warriorStartPosition(),
      game: this,
    });
    this.warrior = warrior;
    return this.warrior;
  };

  step(delta) {
    if (this.warrior) {
      this.warrior.moveWarrior(delta, this.warrior.vel, this.warrior.pos);
    };
  };

  isOutOfBounds(pos, originalPos = 0) {
    return (
      (pos[0] < 0) ||
      (pos[1] < 0) ||
      (pos[0] > Game.DIM_X) ||
      (pos[1] > Game.DIM_Y - 100)
    );
  };
  
  remove(object) {
    if (object instanceof Boulder) {
      this.boulders.splice(this.boulders.indexOf(object), 1);
    };
    if (object instanceof Ammo) {
      this.ammo.splice(this.ammo.indexOf(object), 1);
    };
    if (object instanceof Warrior) {
      this.warrior = {};
    };
  };
};

Game.DIM_X = 1200;
Game.DIM_Y = 550;

module.exports = Game;

/***/ }),

/***/ "./lib/game_view.js":
/*!**************************!*\
  !*** ./lib/game_view.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Warrior = __webpack_require__(/*! ./warrior.js */ "./lib/warrior.js");
const Game = __webpack_require__(/*! ./game.js */ "./lib/game.js");
const Background = __webpack_require__(/*! ./background.js */ "./lib/background.js");

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

/***/ }),

/***/ "./lib/moving_object.js":
/*!******************************!*\
  !*** ./lib/moving_object.js ***!
  \******************************/
/***/ ((module) => {

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

/***/ }),

/***/ "./lib/util.js":
/*!*********************!*\
  !*** ./lib/util.js ***!
  \*********************/
/***/ ((module) => {

const Util = {
  dir (vec) {
    var norm = Util.norm(vec);
    return Util.scale(vec, 1 / norm);
  },

  dist (pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  },

  norm (vec) {
    return Util.dist([0,0], vec);
  },

  randomVec (length) {
    var deg = 2 * Math.PI * Math.random();
    return Util.scale([-1 * Math.abs(Math.sin(deg)), Math.abs(Math.cos(deg))], length);
  },

  scale (vec, m) {
    return [vec[0] * m, vec[1] * m];
  },

  inherits(ChildClass, BaseClass) {
    function Surrogate () { this.constructor = ChildClass; }
    Surrogate.prototype = BaseClass.prototype;
    ChildClass.prototype = new Surrogate();
  },
};

module.exports = Util;

/***/ }),

/***/ "./lib/warrior.js":
/*!************************!*\
  !*** ./lib/warrior.js ***!
  \************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Util = __webpack_require__(/*! ./util.js */ "./lib/util.js");
const MovingObject = __webpack_require__(/*! ./moving_object.js */ "./lib/moving_object.js");

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

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************************!*\
  !*** ./lib/earth_kingdom_warrior.js ***!
  \**************************************/
// this is the entry file
document.addEventListener('DOMContentLoaded', () => {
  const GameView = __webpack_require__(/*! ./game_view.js */ "./lib/game_view.js");
  const Game = __webpack_require__(/*! ./game.js */ "./lib/game.js");

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
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map