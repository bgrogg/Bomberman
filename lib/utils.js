((() => {

  Bomberman.Util = {};

  Bomberman.Util.inherits = (childClass, parentClass) => {
    function Surrogate () {};
    Surrogate.prototype = parentClass.prototype;
    childClass.prototype = new Surrogate();
    childClass.prototype.constructor = childClass;
  };

  Bomberman.Util.distance = (object1, object2) => {
    const x1 = object1.pos[0];
    const y1 = object1.pos[1];
    const x2 = object2.pos[0];
    const y2 = object2.pos[1];
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
  };
}))();
