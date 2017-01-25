

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

    // resources.load('sprites/BombermanDojo.png');

    // console.log('hi');
  };

  // Game.NUM_BARRIERS = 10;
  // Game.DIM_X = window.length;
  // Game.DIM_Y = window.width;
  // Game.prototype.addBomber = function () {
  //   bomber = new Bomberman.Bomber({
  //     pos: this.randomPosition(),
  //     game: this
  //   });
  // };
  Game.prototype.addEnemies = function() {
    this.enemies = [];
    let pos;
    let block;
    const enemyCount = 8;

    // barrier = new Bomberman.Barrier({pos: [150,50], game: this});
    // this.barriers.push(barrier);

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

    // barrier = new Bomberman.Barrier({pos: [150,50], game: this});
    // this.barriers.push(barrier);

    const blockLength = Bomberman.Barrier.LENGTH;

    for (let x = 0; x < this.xDim; x += blockLength) {
      for (let y = 0; y < this.yDim; y += blockLength) {
        if (Math.random() < 0.40 && (x > 3*blockLength || y > blockLength)) {
          pos = [x, y];
          block = new Bomberman.Block({ pos, game: this });
          this.blocks.push(block);

        }
        // if (x % (barrierLength * 2) === 0 && y % (barrierLength * 2) === 0) {
          // debugger;
        // }
      }
    }

  };
  Game.prototype.addBarriers = function() {
    this.barriers = [];
    let pos;
    let barrier;

    // barrier = new Bomberman.Barrier({pos: [150,50], game: this});
    // this.barriers.push(barrier);

    const barrierLength = Bomberman.Barrier.LENGTH;

    for (let x = barrierLength; x < this.xDim; x+=2 * barrierLength) {
      for (let y = barrierLength; y < this.yDim; y+=2 * barrierLength) {
        // if (x % (barrierLength * 2) === 0 && y % (barrierLength * 2) === 0) {
          // debugger;
          pos = [x, y];
          barrier = new Bomberman.Barrier({ pos, game: this });
          this.barriers.push(barrier);
        // }
      }
    }
    // this.barriers.forEach(function (barrier) {
    //   barrier.draw(this.ctx);
    // }.bind(this));
  };

  // Game.prototype.setup = function (ctx) {
  //   ctx.clearRect(0, 0, this.xDim, this.yDim);
  //
  //   this.barriers.forEach(function (barrier) {
  //     barrier.draw(ctx);
  //   });
  // };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, this.xDim, this.yDim);

    ctx.fillStyle = "green";

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
    // this.bomber.sprite.draw(ctx);
  };
  //
  // Game.prototype.moveObjects = function () {
  //   this.asteroids.forEach(function (asteroid) {
  //     asteroid.move();
  //   });
  // };

  // Game.prototype.checkCollisions = function () {
  //   var that = this;
  //
  //   this.asteroids.forEach(function (asteroid1) {
  //     that.asteroids.forEach(function (asteroid2) {
  //       if (asteroid1 !== asteroid2) {
  //         if (asteroid1.isCollidedWith(asteroid2)) {
  //           console.log("COLLISION");
  //           asteroid1.collideWith(asteroid2);
  //         }
  //       }
  //     });
  //   });
  // };
  //
  Game.prototype.step = function () {
    this.handleInput();
    // this.moveObjects();
    // this.checkCollisions();
    // this.enemies.forEach(function(enemy){
    //   enemy.move();
    // })
  };
  Game.prototype.handleInput = function (dt) {
    const bomber = this.bomber;

    // if (player.piping || player.dying || player.noInput) return; //don't accept input

    if (input.isDown('SPACE')) {
      bomber.addBomb(this.ctx);
    } else {
      //we need this to handle the timing for how long you hold it
      // player.noJump();
    }


    if (input.isDown('LEFT')) { // 'd' or left arrow
      bomber.move([-3,  0]);
    } else if (input.isDown('RIGHT')) { // 'k' or right arrow
      bomber.move([3,  0]);
    } else if (input.isDown('UP')) { // 'k' or right arrow
      bomber.move([0,  -3]);
    } else if (input.isDown('DOWN')) { // 'k' or right arrow
      bomber.move([0,  3]);
    } else {
      bomber.move([0,  0]);
    }
  }
  //
  // Game.prototype.remove = function (asteroid) {
  //   var index = this.asteroids.indexOf(asteroid);
  //   this.asteroids.splice(index, 1);
  // };

})();
