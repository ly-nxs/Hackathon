import Util from "../util.js"
import { clientInstance } from "../main.js";
import { IImage } from "../IImage.js";

export class Character {
    constructor(img,x,y) {
        this.image = new IImage(img);

        this.x = x || 50;
        this.y = y || 50;
        this.width = 64;
        this.height = 64;

        this.actualWidth = 34;
        this.actualHeight =46;

        this.boundingHeight = 20;
        this.boundingWidth = 30
        this.boundingXOffset = 14;
        this.boudningYOffset =40;

        this.isPlayer = false;
        this.init();
    }

    init = async (img) => {
        return;
    }

    goTo = (newX, newY) => {
        this.newX = newX;
        this.newY = newY;
    }

    boundingBox = () => {
        this.boundingX = this.x + this.boundingXOffset
        this.boundingY = this.y + this.boudningYOffset
    }

    getNearbyCollisionBoxes = () => {
        const collisionData = clientInstance.mapManager.currentMap.collision.data;
        //console.log(collisionData)
        const collisionArray = [];
        const mapWidth = clientInstance.mapManager.currentMap.mapWidth;
        const playerTileX = Math.floor((this.boundingX+this.boundingWidth/2) / 32);
        const playerTileY = Math.floor((this.boundingY+this.boundingHeight/2) / 32);
    
        for (let y = playerTileY - 1; y <= playerTileY + 1; y++) {
          for (let x = playerTileX - 1; x <= playerTileX + 1; x++) {
            if (x < 0 || y < 0 || x >= mapWidth || y >= collisionData.length / mapWidth) {
              // If the tile is out of bounds, add a blank space to the array
              //console.log("WHAT")
              collisionArray.push(null);
            } else {
              const index = y * mapWidth + x;
              //console.log(index)
              collisionArray.push({collision: collisionData[index],index: index});
            }
          }
        }
    
        return collisionArray;
      }
    
    
      colliding = (tile) => {
        const position = this.indexToXY(tile);
        //console.log(position)
          //set all the parts of the if statment to variables and then log the direction the collision is happening
        const left = this.boundingX;
        const right = this.boundingX + this.boundingWidth;
        const top = this.boundingY;
        const bottom = this.boundingY + this.boundingHeight;
    
        const blockLeft = position.x * 32;
        const blockRight = position.x * 32 + 32;
        const blockTop = position.y * 32;
        const blockBottom = position.y * 32 + 32;
    
        if (
          left < blockRight &&
          right > blockLeft &&
          top < blockBottom &&
          bottom > blockTop
        ) {
          // The blocks are colliding!
    
          const collisionDirection = {
            left: (blockRight - left) >= 60 && (blockBottom - top) < 50,
            right: (right - blockLeft) >= 60 && (bottom - blockTop) < 50,
            top: (blockBottom - top) >= 50,
            bottom: (bottom - blockTop) >= 50
          };
          //console.log(collisionDirection);
          clientInstance.canvas.ctx.beginPath();
          clientInstance.canvas.ctx.lineWidth = "8";
          if (collisionDirection.left)
            clientInstance.canvas.ctx.strokeStyle = "cyan";
          if (collisionDirection.right)
            clientInstance.canvas.ctx.strokeStyle = "red";
          if(collisionDirection.top)
          clientInstance.canvas.ctx.strokeStyle = "green";
          if(collisionDirection.bottom)
          clientInstance.canvas.ctx.strokeStyle = "yellow";
          clientInstance.canvas.ctx.rect(blockLeft, blockTop, 32, 32);
          // clientInstance.canvas.ctx.stroke();
          return collisionDirection;
        }
        return;
      }
      updatePosition = (x, y) => {
        if(!clientInstance.mapManager.currentMap.collision) return;
        // Update the player's position
        const oldX=this.x;
        const oldY=this.y;
        this.x = x;
        this.y = y;
        this.velX = x - oldX;
        this.velY = y - oldY;
        //console.log(this.x,oldX)
        // Update the player's bounding box, which is used to detect collisions
        this.boundingBox();
        // Get the nearby collision boxes for the player
        
        this.nearby = this.getNearbyCollisionBoxes();
        if(!this.isPlayer) return;
        // Loop through the nearby collision boxes
        this.nearby.forEach(collide => {
          if (collide && collide.collision !== 0){
            const blockPos = this.indexToXY(collide.index);
            if(this.velX>0){
              if(this.boundingY+this.boundingHeight>blockPos.y*32+2 && this.boundingY<blockPos.y*32+32-2
              && this.boundingX+this.boundingWidth>blockPos.x*32 && this.boundingX<blockPos.x*32+32){
                this.x=blockPos.x*32-this.boundingWidth-14;
              }
            }
            if(this.velY>0){
              if(this.boundingX+this.boundingWidth>blockPos.x*32+2 && this.boundingX<blockPos.x*32+32-2
              && this.boundingY+this.boundingHeight>blockPos.y*32 && this.boundingY<blockPos.y*32+32){
                this.y=blockPos.y*32-this.boundingHeight-40;
              }
            }
            this.boundingBox();
            if(this.velX<0){
              if(this.boundingY+this.boundingHeight>blockPos.y*32+2 && this.boundingY<blockPos.y*32+32-2
              && this.boundingX+this.boundingWidth>blockPos.x*32 && this.boundingX<blockPos.x*32+32){
                this.x=blockPos.x*32+32-14;
              }
            }
            if(this.velY<0){
              if(this.boundingX+this.boundingWidth>blockPos.x*32+2 && this.boundingX<blockPos.x*32+32-2
              && this.boundingY+this.boundingHeight>blockPos.y*32 && this.boundingY<blockPos.y*32+32){
                this.y=blockPos.y*32+32-40;
              }
            }
        }
          // If the collision box is non-null, and has a collision set,
          if (collide && collide.collision !== 0) {
            // Get the position of the collision box
            const cPos = this.indexToXY(collide.index);
            // Draw a pink rectangle around the collision box to indicate the collision
            clientInstance.canvas.ctx.beginPath();
            clientInstance.canvas.ctx.lineWidth = "2";
            clientInstance.canvas.ctx.strokeStyle = "pink";
            clientInstance.canvas.ctx.rect(cPos.x * 32, cPos.y * 32, 32, 32);
            // clientInstance.canvas.ctx.stroke();
          }
        });
        this.boundingBox();
      }
    
        init = async (img) => {
             //this.image = await Util.loadImage(Util.getCharacterImageLocation(img));
            // console.log(this.image)
            return;
        }
    
        draw = (xFrame,yFrame,x,y) => {
          if(this.image){
            //console.log(this.image)
          this.image.draw(xFrame,yFrame,64,64,x,y,this.width,this.height)
        //   clientInstance.canvas.ctx.beginPath();
        //   clientInstance.canvas.ctx.lineWidth = "2";
        //   clientInstance.canvas.ctx.strokeStyle = "red";
        //   clientInstance.canvas.ctx.rect(this.boundingX, this.boundingY, this.boundingWidth, this.boundingHeight);
        //   clientInstance.canvas.ctx.stroke();
          this.nearby.forEach(colide => {
              if(colide)
              if(colide.collision!=0){
                  //console.log("render box")
                  const cPos = this.indexToXY(colide.index);
                  clientInstance.canvas.ctx.beginPath();
                  clientInstance.canvas.ctx.lineWidth = "2";
                  clientInstance.canvas.ctx.strokeStyle = "pink";
                  //console.log(cPos.x*32,cPos.y*32,this.boundingX,this.boundingY)
                  // clientInstance.canvas.ctx.rect(cPos.x*32, cPos.y*32, 32, 32);
                  // clientInstance.canvas.ctx.stroke();
              }
          })
          }
      }
    
        
    
    
    
        indexToXY = (index) => {
            const tileMapWidth = clientInstance.mapManager.currentMap.mapWidth;
            const x = index % tileMapWidth;
            const y = Math.floor(index / tileMapWidth);
          
            return { x, y };
          };
    
}
