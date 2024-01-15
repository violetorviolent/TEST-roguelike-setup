import Knight from "./Knight.js";
import MovingDirection from "./MovingDirection.js";

export default class TileMap {
  constructor(tileSize) {
    this.tileSize = tileSize;

    this.wall = new Image();
    this.wall.src = "images/wall.png";

    this.empty = new Image();
    this.empty.src = "images/empty.png";

    this.sword = new Image();
    this.sword.src = "images/sword.png";

    this.potionHP = new Image();
    this.potionHP.src = "images/potionHP.png";

  }

  //0 - empty
  //1 - wall
  //2 - hero
  //3 - enemy
  //4 - sword
  //5 - potionHP
  map = [
    [1, 5, 0, 0, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 1],
    [1, 5, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 5, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 1],
    [1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 5, 1]
  ];

  draw(ctx) {
    for (let row = 0; row < this.map.length; row++) {
      for (let column = 0; column < this.map[row].length; column++) {
        let tile = this.map[row][column];
        if (tile === 1) {
          this.#drawWall(ctx, column, row, this.tileSize);
        } else if (tile === 4) {
          this.#drawSword(ctx, column, row, this.tileSize);
        } else if (tile === 5) {
          this.#drawPotionHP(ctx, column, row, this.tileSize);
        } else {
          this.#drawEmpty(ctx, column, row, this.tileSize);
        }

      }
    }
  }

  #drawWall(ctx, column, row, size) {
    ctx.drawImage(
      this.wall,
      column * this.tileSize,
      row * this.tileSize,
      size,
      size
    );
  }
  #drawSword(ctx, column, row, size) {
    ctx.drawImage(
      this.sword,
      column * this.tileSize,
      row * this.tileSize,
      size,
      size
    );
  }
  #drawPotionHP(ctx, column, row, size) {
    ctx.drawImage(
      this.potionHP,
      column * this.tileSize,
      row * this.tileSize,
      size,
      size
    );
  }

  #drawEmpty(ctx, column, row, size) {
    ctx.drawImage(
      this.empty,
      column * this.tileSize,
      row * this.tileSize,
      size,
      size
    );
  }
  
  getKnight() {
    for (let row = 0; row < this.map.length; row++) {
      for (let column = 0; column < this.map[row].length; column++) {
        let tile = this.map[row][column];
        if (tile === 2) {
          this.map[row][column] = 0;
          return new Knight(
            column * this.tileSize,
            row * this.tileSize,
            this.tileSize,
            
            this
          );
        }
      }
    }
  }

  didCollideWithEnvironment(x, y, direction) {
    if (direction == null) {
      return;
    }
      let column = 0;
      let row = 0;
      let nextColumn = 0;
      let nextRow = 0;

      switch (direction) {
        case MovingDirection.right:
          nextColumn = x + this.tileSize;
          column = nextColumn / this.tileSize;
          row = y / this.tileSize;
          break;
        case MovingDirection.left:
          nextColumn = x - this.tileSize;
          column = nextColumn / this.tileSize;
          row = y / this.tileSize;
          break;
        case MovingDirection.up:
          nextRow = y - this.tileSize;
          row = nextRow / this.tileSize;
          column = x / this.tileSize;
          break;
        case MovingDirection.down:
          nextRow = y + this.tileSize;
          row = nextRow / this.tileSize;
          column = x / this.tileSize;
          break;
      }
      const tile = this.map[row][column];
      if (tile === 1) {
        return true;
      } else {return false;}

  }

  concumePotionHP(x, y) {
    const row = y / this.tileSize;
    const column = x / this.tileSize;
    if (Number.isInteger(row) && Number.isInteger(column)) {
      if (this.map[row][column] === 5) {
        this.map[row][column] = 0;
        return true;
      }
    }
    return false;
  }

  gotSword(x, y) {
    const row = y / this.tileSize;
    const column = x / this.tileSize;
    if (Number.isInteger(row) && Number.isInteger(column)) {
      if (this.map[row][column] === 4) {
        this.map[row][column] = 0;
        return true;
      }
    }
    return false;
  }


  setCanvasSize(canvas) {
    canvas.width = this.map[0].length * this.tileSize;
    canvas.height = this.map.length * this.tileSize;
  }

}
