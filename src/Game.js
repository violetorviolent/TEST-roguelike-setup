import TileMap from "./TileMap.js";

const tileSize = 50;
const velocity = 5;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const tileMap = new TileMap(tileSize);
const knight = tileMap.getKnight();

function gameLoop() {
  tileMap.draw(ctx);
  knight.draw(ctx);
}


tileMap.setCanvasSize(canvas);
setInterval(gameLoop, 1000 / 75);
