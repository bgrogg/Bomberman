(() => {

  const Game = Bomberman.Game = function (canvas) {
    this.ctx = canvas.getContext('2d');
    this.xDim = canvas.width;
    this.yDim = canvas.height;
    this.bomber = new Bomberman.Bomber({vel: [0, 0], pos: [25, 25], game: this});
    this.addBlocks();
    this.addBarriers();
    this.addEnemies();
    this.loadImgs();
    this.playing = false;
  };

  Game.prototype.loadImgs = () => {
    resources.load('sprites/bomberman.png');
    resources.load('sprites/vertflames.png');
    resources.load('sprites/blueenemy.png');
    resources.load('sprites/SolidBlock.png');
    resources.load('sprites/ExplodableBlock.png');

  };

  Game.prototype.addEnemies = function() {
    this.enemies = [];
    let pos;
    let block;
    const enemyCount = 8;

    barrierPositions = this.barriers.map(barrier => barrier.pos.toString());
    blockPositions = this.blocks.map(block => block.pos.toString())

    const blockLength = Bomberman.Barrier.LENGTH;

    for (let x = 0; x < this.xDim; x += blockLength) {
      for (let y = 0; y < this.yDim; y += blockLength) {
        if (this.enemies.length < enemyCount && Math.random() < 0.10 && (x > 3*blockLength || y > 3*blockLength)) {
          pos = [x, y];
          if (!barrierPositions.includes(pos.toString()) && !blockPositions.includes(pos.toString())) {
            enemy = new Bomberman.Enemy({ pos, game: this });
            this.enemies.push(enemy);
          }
        }
      }
    }
  };

  Game.prototype.addBlocks = function() {
    this.blocks = [];
    let pos;
    let block;

    const blockLength = Bomberman.Barrier.LENGTH;

    for (let x = 0; x < this.xDim; x += blockLength) {
      for (let y = 0; y < this.yDim; y += blockLength) {
        if (Math.random() < 0.40 && (x > 3*blockLength || y > blockLength)) {
          pos = [x, y];
          block = new Bomberman.Block({ pos, game: this });
          this.blocks.push(block);

        }
      }
    }

  };
  Game.prototype.addBarriers = function() {
    this.barriers = [];
    let pos;
    let barrier;

    const barrierLength = Bomberman.Barrier.LENGTH;

    for (let x = barrierLength; x < this.xDim; x+=2 * barrierLength) {
      for (let y = barrierLength; y < this.yDim; y+=2 * barrierLength) {
          pos = [x, y];
          barrier = new Bomberman.Barrier({ pos, game: this });
          this.barriers.push(barrier);
      }
    }
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, this.xDim, this.yDim);
    let image = new Image();
    image.src = 'sprites/BackgroundTile.png';


    ctx.fillStyle = ctx.createPattern(image, 'repeat');

    ctx.fillRect(0, 0, this.xDim,this.yDim);

    this.blocks.forEach(block => {
      block.draw(ctx);
    });

    this.barriers.forEach(barrier => {
      barrier.draw(ctx);
    });


    this.bomber.bombs.forEach(bomb => {
      bomb.draw(ctx);
    });

    this.enemies.forEach(enemy => {
      enemy.draw(ctx);
    });

    this.bomber.draw(ctx);
  };

  Game.prototype.step = function () {
    this.handleInput();
  };

  Game.prototype.handleInput = function (dt) {
    const bomber = this.bomber;

    if (input.isDown('SPACE')) {
      bomber.addBomb(this.ctx);
    } else {

    }


    if (input.isDown('LEFT')) {
      bomber.move([-3,  0]);
    } else if (input.isDown('RIGHT')) {
      bomber.move([3,  0]);
    } else if (input.isDown('UP')) {
      bomber.move([0,  -3]);
    } else if (input.isDown('DOWN')) {
      bomber.move([0,  3]);
    } else {
      bomber.move([0,  0]);
    }
  };

})();
