((() => {

  const Block = Bomberman.Block = function (attributes) {
    this.game = attributes.game,
    this.pos = attributes.pos,
    this.color = Block.COLOR;
    this.length = Block.LENGTH;
    this.location = [0,0];
    this.sprite = new Bomberman.Sprite({img: 'sprites/ExplodableBlock.png', loc: [0,0], size: [26,26]})

  };

  Block.COLOR = "pink";
  Block.LENGTH = 50;

  Block.prototype.draw = function (ctx) {
    this.sprite.draw(ctx, this.pos, this.location);

  };

  Block.prototype.destroyBlock = function () {

    this.location = [279, 102];
    this.sprite = new Bomberman.Sprite({img: 'sprites/bomberman.png', loc: [this.location], size: [23,22]})
    this.location = [303, 106];

    setTimeout(() => {
      this.location = [327, 106];
    }, 300);

    setTimeout(() => {
      this.game.blocks.splice(this.game.blocks.indexOf(this),1)
    }, 600);
  };


}))();
