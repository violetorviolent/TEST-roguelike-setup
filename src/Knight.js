import MovingDirection from "./MovingDirection.js";

export default class Knight {
  constructor(x, y, tileSize,  tileMap) {
    this.x = x;
    this.y = y;
    this.tileSize = tileSize;
    
    this.tileMap = tileMap;
    this.requestedMovingDirection = null;

    document.addEventListener("keydown", this.#keydown);
    
    this.#loadKnightImages();
  }



  draw(ctx) {
    
    ctx.drawImage(
      this.knightImage,
      this.x,
      this.y,
      this.tileSize,
      this.tileSize
    );
    this.#concumePotionHP();
    this.#gotSword();

  }

  #loadKnightImages() {
    const knightImage = new Image();
    knightImage.src = "images/knight.png";

    this.knightImage = knightImage;
  }
  
 
  #keydown = (event) => {
    //up
    if (event.keyCode == 38 || event.keyCode == 87) {
      console.log('up')
      this.requestedMovingDirection = MovingDirection.up;
      if (!this.tileMap.didCollideWithEnvironment(
        this.x,
        this.y,
        this.requestedMovingDirection)
      ){this.y -= this.tileSize;}
      
    }
    //down
    if (event.keyCode == 40 || event.keyCode == 83) {
      console.log('down')
      this.requestedMovingDirection = MovingDirection.down;
      if (!this.tileMap.didCollideWithEnvironment(
        this.x,
        this.y,
        this.requestedMovingDirection)
      ){this.y += this.tileSize;}
     
    }
    //left
    if (event.keyCode == 37 || event.keyCode == 65) {
      console.log('left')
      this.requestedMovingDirection = MovingDirection.left;
      if (!this.tileMap.didCollideWithEnvironment(
        this.x,
        this.y,
        this.requestedMovingDirection)
      ){this.x -= this.tileSize;}
    }
    //right
    if (event.keyCode == 39 || event.keyCode == 68) {
      console.log('right')
      this.requestedMovingDirection = MovingDirection.right;
      if (!this.tileMap.didCollideWithEnvironment(
            this.x,
            this.y,
            this.requestedMovingDirection)
          ){this.x += this.tileSize;}
    }
  };

  #concumePotionHP() {
    if (this.tileMap.concumePotionHP(this.x, this.y)) {
      //Latr can implement stat upgrade here
  
    }
  }

  #gotSword() {
    if (this.tileMap.gotSword(this.x, this.y)) {
      //Latr can implement stat upgrade here
  
    }
  }
}
