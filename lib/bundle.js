/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./lib/game.js":
/*!*********************!*\
  !*** ./lib/game.js ***!
  \*********************/
/***/ ((module) => {

class Game {
  constructor(ctx) {
    this.earthWarrior = {};
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

  earthWarriorStartPosition() {
    return [150, 250];
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

console.log(`Game: ${Game}`);
module.exports = Game;

/***/ }),

/***/ "./lib/game_view.js":
/*!**************************!*\
  !*** ./lib/game_view.js ***!
  \**************************/
/***/ ((module) => {

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
    });
  };
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map