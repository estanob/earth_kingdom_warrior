const Warrior = require('./warrior.js');

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