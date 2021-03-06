((() => {

  const Bomber = Bomberman.Bomber = function(attributes) {
    this.game = attributes.game,
    this.ctx = attributes.game.ctx,
    this.pos = attributes.pos,
    this.radius = Bomber.RADIUS,
    this.length = 50,
    this.color = Bomber.COLOR,
    this.bombs = [],
    this.alive = true,
    this.location = [228, 3],
    this.movable = true,
    this.count = 0;
    this.sprite = new Bomberman.Sprite({img: 'sprites/bomberman.png', loc: [this.location], size: [26,33], area: [50,46]})
  };

  Bomber.RADIUS = 23;
  let locationHolder = 0;
  let movingDir = "down";

  Bomber.prototype.draw = function (ctx) {
    let newPos = this.pos.slice(0);
    newPos[0] -= 23;
    newPos[1] -= 23;

    this.sprite.draw(ctx, newPos, this.location);
  };

  Bomber.prototype.destroyBomber = function () {
    this.location = [351, 40];
    this.movable = false;

    if (this.count === 0) {
      const gameover = document.createElement('h2');
      gameover.innerHTML = 'GAME OVER Press SHIFT to play again';
      const instructions = document.getElementsByClassName('instructions')[0];
      instructions.appendChild(gameover);
      this.count += 1;
    }

    setTimeout(() => {
      this.alive = false;
    }, 1500);

  };

  Bomber.prototype.move = function(vel) {

    // forces sliding when bumping into barriers
    this.game.barriers.forEach(barrier => {
      if (this.pos[0] + this.radius + vel[0] > barrier.pos[0] &&
          this.pos[0] - this.radius + vel[0] < barrier.pos[0] + barrier.length &&
          this.pos[1] + this.radius + vel[1] > barrier.pos[1] &&
          this.pos[1] - this.radius + vel[1] < barrier.pos[1] + barrier.length
        ) {
          if (vel[0] > 0 || vel[0] < 0) {
            if (this.pos[1] < barrier.pos[1] + barrier.length/2) {
              vel = [0,-3];
            } else {
              vel = [0,3];
            }
          } else if (vel[1] > 0 || vel[1] < 0) {
            if (this.pos[0] < barrier.pos[0] + barrier.length/2) {
              vel = [-3,0];
            } else {
              vel = [3,0];
            }
          }
      }
    })

    let blocked = false;
    this.game.blocks.forEach(block => {
      if (this.pos[0] + this.radius + vel[0] > block.pos[0] &&
          this.pos[0] - this.radius + vel[0] < block.pos[0] + block.length &&
          this.pos[1] + this.radius + vel[1] > block.pos[1] &&
          this.pos[1] - this.radius + vel[1] < block.pos[1] + block.length) {
        blocked = true;
      }
    })

    this.game.bomber.bombs.forEach(bomb => {
      if (this.pos[0] + this.radius + vel[0] > bomb.pos[0] - bomb.radius &&
          this.pos[0] - this.radius + vel[0] < bomb.pos[0] + bomb.radius &&
          this.pos[1] + this.radius + vel[1] > bomb.pos[1] - bomb.radius &&
          this.pos[1] - this.radius + vel[1] < bomb.pos[1] + bomb.radius) {
        if (this.pos[0] + this.radius > bomb.pos[0] - bomb.radius &&
            this.pos[0] - this.radius < bomb.pos[0] + bomb.radius &&
            this.pos[1] + this.radius > bomb.pos[1] - bomb.radius &&
            this.pos[1] - this.radius < bomb.pos[1] + bomb.radius) {
          // blocked = false;
        } else {
          blocked = true;
        }
      }
    })

    this.game.enemies.forEach(enemy => {
      if (this.pos[0] + this.radius + vel[0] > enemy.pos[0] + 10 &&
          this.pos[0] - this.radius + vel[0] < enemy.pos[0] + enemy.length - 10 &&
          this.pos[1] + this.radius + vel[1] > enemy.pos[1] + 10 &&
          this.pos[1] - this.radius + vel[1] < enemy.pos[1] + enemy.length - 10) {
        this.destroyBomber();
      }
    })

    // animate bomber
    if (this.movable) {
      if (vel[1] > 0) {
        this.moveAvatarDown();
      } else if (vel[1] < 0){
        this.moveAvatarUp();
      } else if (vel[0] < 0) {
        this.moveAvatarLeft();
      } else if (vel[0] > 0) {
        this.moveAvatarRight();
      } else {

      }
    }

    if (this.inBoard(vel) && !blocked && this.movable) {
      this.pos[0] += vel[0];
      this.pos[1] += vel[1];
    }

  };

  Bomber.prototype.moveAvatarLeft = function () {

    if (movingDir !== "left") {
      this.location[0] = 396;
      movingDir = "left";
    }

    locationHolder += 1;
    if (locationHolder % 15 ===  0) {
      this.location[0] += 25;
    }
    if (locationHolder === 45) {
      this.location[0] = 396;
      locationHolder = 15;
    }
  };

  Bomber.prototype.moveAvatarRight = function () {
    if (movingDir !== "right") {
      movingDir = "right";
      this.location[0] = 467;
      locationHolder = 15;
    }

    locationHolder += 1;
    if (locationHolder % 15 ===  0) {
      this.location[0] += 25;
    }
    if (locationHolder === 45) {
      this.location[0] = 467;
      locationHolder = 15;
    }
  };

  Bomber.prototype.moveAvatarUp = function () {
    if (movingDir !== "up") {
      this.location[0] = 325;
      movingDir = "up";
    }

    locationHolder += 1;
    if (locationHolder % 15 ===  0) {
      this.location[0] += 25;
    }
    if (locationHolder === 45) {
      this.location[0] = 325;
      locationHolder = 15;
    }
  };

  Bomber.prototype.moveAvatarDown = function () {
    if (movingDir != "down") {
      movingDir = "down";
      this.location[0] = 228;
    }

    locationHolder += 1;
    if (locationHolder % 15 ===  0) {
      this.location[0] += 25;
    }
    if (locationHolder === 45) {
      this.location[0] = 251;
      locationHolder = 15;
    }
  };

  Bomber.prototype.inBoard = function (vel) {
    if (0 + Bomber.RADIUS < this.pos[0] + vel[0] &&
        this.pos[0] + vel[0] + Bomber.RADIUS < this.game.xDim &&
        0 + Bomber.RADIUS < this.pos[1] + vel[1] &&
        this.pos[1] + vel[1] + Bomber.RADIUS < this.game.yDim) {
      return true;
    } else {
      return false;
    }
  };
  Bomber.prototype.addBomb = function (ctx) {
    const bomber = this;
    let isTouching = false;

    // checks to make sure only one bomb is placed in a single position
    this.bombs.forEach(bomb => {
      const distance = Bomberman.Util.distance(bomber, bomb);
      const radiusSum = bomber.radius + bomb.radius;
      if (radiusSum > distance) {
        isTouching = true;
      }
    })

    // decouples from bomber position and puts in correct spots
    const barrierLength = this.game.barriers[0].length;
    const newPos = this.pos.slice(0);
    newPos[0] = Math.floor(newPos[0]/barrierLength) * barrierLength + barrierLength/2;
    newPos[1] = Math.floor(newPos[1]/barrierLength) * barrierLength + barrierLength/2;

    if (!isTouching) {
      const bomb = new Bomberman.Bomb({pos: newPos, game: this.game});
      this.bombs.push(bomb);

      setTimeout(() => {
        bomb.explode(this.ctx);
      }, 2200);

      setTimeout(() => {
        this.bombs.shift();
      }, 2700);


    }
  };

}))();
