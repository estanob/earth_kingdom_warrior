const Background = function () {
  this.backgroundImg = new Image ();
  this.backgroundImg.src = "lib/earth_kingdom.png"
}

Background.prototype.drawBackground = function (ctx) {
  ctx.drawImage(this.backgroundImg, 0, 0, 1200, 550);
};

module.exports = Background;