const Game = require("./game");
const GameView = require("./gameview");

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("canvas");
  canvasEl.width = 650;
  canvasEl.height = 500;

  const ctx = canvasEl.getContext("2d");
  const game = new Game();
  new GameView(game, ctx).start();
});
