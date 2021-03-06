((() => {

  const Bomb = Bomberman.Bomb = function (attributes) {
    this.game = attributes.game,
    this.pos = attributes.pos,
    this.sprite = new Bomberman.Sprite({img: 'sprites/bomberman.png', loc: [558,1], size: [25,25]})
    this.color = Bomb.COLOR,
    this.radius = Bomb.RADIUS,
    this.exploding = false,
    this.upFlame = true,
    this.downFlame = true,
    this.rightFlame = true,
    this.leftFlame = true

  };

  Bomb.COLOR = "black";
  Bomb.RADIUS = 23;
  let bomberPos;

  Bomb.prototype.draw = function (ctx) {

    newPos = this.pos.slice(0);
    newPos[0] -= 23;
    newPos[1] -= 23;
    this.sprite.draw(ctx, newPos);

    if (this.exploding) {
      this.drawFlames(ctx);
    }

  };

  Bomb.prototype.explode = function (ctx) {
    this.exploding = true;
    this.sprite = new Bomberman.Sprite({img: 'sprites/bomberman.png', loc: [533,95], size: [28,24], area: [46,45]})

    this.game.barriers.forEach(barrier => {
      if (this.pos[0] - barrier.length > barrier.pos[0] &&
          this.pos[0] - barrier.length < barrier.pos[0] + barrier.length &&
          this.pos[1] > barrier.pos[1] &&
          this.pos[1] < barrier.pos[1] + barrier.length) {
        this.leftFlame = false;
      }

      if (this.pos[0] + barrier.length > barrier.pos[0] &&
          this.pos[0] + barrier.length < barrier.pos[0] + barrier.length &&
          this.pos[1] > barrier.pos[1] &&
          this.pos[1] < barrier.pos[1] + barrier.length) {
        this.rightFlame = false;
      }

      if (this.pos[0] > barrier.pos[0] &&
          this.pos[0] < barrier.pos[0] + barrier.length &&
          this.pos[1] - barrier.length > barrier.pos[1] &&
          this.pos[1] - barrier.length < barrier.pos[1] + barrier.length) {
        this.upFlame = false;
      }

      if (this.pos[0] > barrier.pos[0] &&
          this.pos[0] < barrier.pos[0] + barrier.length &&
          this.pos[1] + barrier.length > barrier.pos[1] &&
          this.pos[1] + barrier.length < barrier.pos[1] + barrier.length) {
        this.downFlame = false;
      }
    });

    const superIndex = [];
    this.game.blocks.forEach(block => {
      if (this.pos[0] - block.length > block.pos[0] &&
          this.pos[0] - block.length < block.pos[0] + block.length &&
          this.pos[1] > block.pos[1] &&
          this.pos[1] < block.pos[1] + block.length) {
        this.leftFlame = false;
        superIndex.push(this.game.blocks.indexOf(block));
      }

      if (this.pos[0] + block.length > block.pos[0] &&
          this.pos[0] + block.length < block.pos[0] + block.length &&
          this.pos[1] > block.pos[1] &&
          this.pos[1] < block.pos[1] + block.length) {
        this.rightFlame = false;
        superIndex.push(this.game.blocks.indexOf(block));
      }

      if (this.pos[0] > block.pos[0] &&
          this.pos[0] < block.pos[0] + block.length &&
          this.pos[1] - block.length > block.pos[1] &&
          this.pos[1] - block.length < block.pos[1] + block.length) {
        this.upFlame = false;
        superIndex.push(this.game.blocks.indexOf(block));
      }


      if (this.pos[0] > block.pos[0] &&
          this.pos[0] < block.pos[0] + block.length &&
          this.pos[1] + block.length > block.pos[1] &&
          this.pos[1] + block.length < block.pos[1] + block.length) {
        this.downFlame = false;
        superIndex.push(this.game.blocks.indexOf(block));
      }
    });

    for (let i = 0; i < superIndex.length; i++) {
      this.game.blocks[superIndex[superIndex.length - 1 - i]].destroyBlock();
    }

    this.game.enemies.forEach(enemy => {
      if (this.pos[0] - enemy.length > enemy.pos[0] &&
          this.pos[0] - enemy.length < enemy.pos[0] + enemy.length &&
          this.pos[1] > enemy.pos[1] &&
          this.pos[1] < enemy.pos[1] + enemy.length) {
        enemy.destroyEnemy();
      }

      if (this.pos[0] + enemy.length > enemy.pos[0] &&
          this.pos[0] + enemy.length < enemy.pos[0] + enemy.length &&
          this.pos[1] > enemy.pos[1] &&
          this.pos[1] < enemy.pos[1] + enemy.length) {
        enemy.destroyEnemy();
      }

      if (this.pos[0] > enemy.pos[0] &&
          this.pos[0] < enemy.pos[0] + enemy.length &&
          this.pos[1] - enemy.length > enemy.pos[1] &&
          this.pos[1] - enemy.length < enemy.pos[1] + enemy.length) {
        enemy.destroyEnemy();
      }
      if (this.pos[0] > enemy.pos[0] &&
          this.pos[0] < enemy.pos[0] + enemy.length &&
          this.pos[1] + enemy.length > enemy.pos[1] &&
          this.pos[1] + enemy.length < enemy.pos[1] + enemy.length) {
        enemy.destroyEnemy();
      }
    });


    bomberPos = this.game.bomber.pos.slice(0);
    bomberPos[0] -= 23;
    bomberPos[1] -= 23;
    if (this.pos[0] - this.game.bomber.length > bomberPos[0] &&
        this.pos[0] - this.game.bomber.length < bomberPos[0] + this.game.bomber.length &&
        this.pos[1] > bomberPos[1] &&
        this.pos[1] < bomberPos[1] + this.game.bomber.length) {
      this.game.bomber.destroyBomber();
    }

    if (this.pos[0] + this.game.bomber.length > bomberPos[0] &&
        this.pos[0] + this.game.bomber.length < bomberPos[0] + this.game.bomber.length &&
        this.pos[1] > bomberPos[1] &&
        this.pos[1] < bomberPos[1] + this.game.bomber.length) {
      this.game.bomber.destroyBomber();
    }

    if (this.pos[0] > bomberPos[0] &&
        this.pos[0] < bomberPos[0] + this.game.bomber.length &&
        this.pos[1] - this.game.bomber.length > bomberPos[1] &&
        this.pos[1] - this.game.bomber.length < bomberPos[1] + this.game.bomber.length) {
      this.game.bomber.destroyBomber();
    }
    if (this.pos[0] > bomberPos[0] &&
        this.pos[0] < bomberPos[0] + this.game.bomber.length &&
        this.pos[1] + this.game.bomber.length > bomberPos[1] &&
        this.pos[1] + this.game.bomber.length < bomberPos[1] + this.game.bomber.length) {
      this.game.bomber.destroyBomber();
    }
    if (this.pos[0] > bomberPos[0] &&
        this.pos[0] < bomberPos[0] + this.game.bomber.length &&
        this.pos[1] > bomberPos[1] &&
        this.pos[1] < bomberPos[1] + this.game.bomber.length) {
      this.game.bomber.destroyBomber();
    }


  };
  Bomb.prototype.drawFlames = function(ctx) {
    if (this.upFlame) {
      this.upFlame = new Bomberman.Sprite({img: 'sprites/vertflames.png', loc: [0,0], size: [28,24], area: [45,45]})
      this.upFlame.draw(ctx, [newPos[0]+4, newPos[1]-44]);
    }
    if (this.downFlame) {
      this.downFlame = new Bomberman.Sprite({img: 'sprites/vertflames.png', loc: [0,48], size: [28,24], area: [45,45]})
      this.downFlame.draw(ctx, [newPos[0]+4, newPos[1]+44]);
    }
    if (this.leftFlame) {
      this.leftFlame = new Bomberman.Sprite({img: 'sprites/bomberman.png', loc: [583,71], size: [28,24], area: [45,45]})
      this.leftFlame.draw(ctx, [newPos[0]-42, newPos[1]]);
    }
    if (this.rightFlame) {
      this.rightFlame = new Bomberman.Sprite({img: 'sprites/bomberman.png', loc: [627,71], size: [28,24], area: [45,45]})
      this.rightFlame.draw(ctx, [newPos[0]+44, newPos[1]]);
    }

  }

}))();
