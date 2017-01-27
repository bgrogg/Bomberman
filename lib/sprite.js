((() => {
  if (typeof Bomberman === 'undefined')
    window.Bomberman = {};

  const Sprite = Bomberman.Sprite = function(attributes) {
    this.loc = attributes.loc;
    this.size = attributes.size;

    this.img = attributes.img;
    attributes.area ? this.area = attributes.area : this.area = [50,50]

  };

  Sprite.prototype.draw = function (ctx, pos, location) {
    if (typeof location === 'undefined') {
      ctx.drawImage(resources.get(this.img), this.loc[0], this.loc[1], this.size[0],this.size[1], pos[0], pos[1], this.area[0], this.area[1]);
    } else {
      ctx.drawImage(resources.get(this.img), location[0], location[1], this.size[0],this.size[1], pos[0], pos[1], this.area[0], this.area[1]);
    }
  };


}))();
