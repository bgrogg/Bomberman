((() => {

  const GameView = Bomberman.GameView = function (canvas) {
    this.game = new Bomberman.Game (canvas);
    this.ctx = canvas.getContext('2d');
    this.xDim = canvas.width;
    this.yDim = canvas.height;
  };
  GameView.prototype.newGame = function (canvas) {
    this.game = new Bomberman.Game (canvas);
    requestAnimationFrame(this.animate.bind(this));
  };

  GameView.prototype.start = function (canvas) {
    const img = document.createElement('IMG');
    img.src = "assets/bomberintro.png";
    const welcome = document.getElementsByClassName('welcome')[0];
    welcome.appendChild(img);

    requestAnimationFrame(this.animate.bind(this));
  };
  GameView.prototype.animate = function(){

    if (this.game.bomber.alive && this.game.playing){
      this.game.step();
      if (resources.isReady()) {
        this.game.draw(this.ctx);
      }
      requestAnimationFrame(this.animate.bind(this));

    } else if (!this.game.bomber.alive && this.game.playing){
      const canvasEl = document.getElementById("canvas");
      this.newGame(canvasEl);

    } else {
      this.ctx.fillStyle = "rgba(205, 192, 176, 1)";
      this.ctx.fillRect(0, 0, this.xDim,this.yDim);

      if (input.isDown('SHIFT')) {
        this.game.playing = true;
        const instructions = document.getElementsByClassName('instructions')[0];
        const welcome = document.getElementsByClassName('welcome')[0];
        if (instructions.hasChildNodes()) {
          const gameover = document.getElementsByTagName('h2')[0];
          instructions.removeChild(gameover);
        }
        if (welcome.hasChildNodes()) {
          const image = document.getElementsByTagName('img')[0];
          welcome.removeChild(image);
        }
      }
      requestAnimationFrame(this.animate.bind(this));
    }
  };





}))();
