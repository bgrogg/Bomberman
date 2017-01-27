((() => {

  const Barrier = Bomberman.Barrier = function (attributes) {
    this.game = attributes.game,
    this.pos = attributes.pos,
    this.color = Barrier.COLOR;
    this.length = Barrier.LENGTH;
    this.location = [0,0];
    this.sprite = new Bomberman.Sprite({img: 'sprites/SolidBlock.png', loc: [0,0], size: [26,26]})

  };

  Barrier.COLOR = "black";
  Barrier.LENGTH = 50;

  Barrier.prototype.draw = function (ctx) {

    this.sprite.draw(ctx, this.pos, this.location);
  };

}))();
