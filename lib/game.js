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
};

Game.DIM_X = 1200;
Game.DIM_Y = 550;

console.log("Game:", Game)

module.exports = Game;