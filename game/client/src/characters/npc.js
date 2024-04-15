import { IImage } from "../IImage.js";
import { clientInstance } from "../main.js";
import Util from "../util.js";

export class NPC {
    constructor(img,x,y, text) {
        this.imageName = img
        this.image = new IImage(img)
        this.x = x;
        this.y = y;

        this.xVel = 0;
        this.yVel = 0;

        this.xFrame = 0 *64;
        this.yFrame = 0 * 64;

        this.direction = "down"
        this.moving = false;

        this.boundingWidth = 32;
        this.boundingHeight = 48
        this.boundingX = this.x +32
        this.boundingY = this.y + 16

        this.text = text;
        this.talking = false;
        this.canTalkBox = {
            x: this.x,
            y: this.y,
            size: 96
        }
        this.textboxX =  clientInstance.canvas.canvas.width/2 - 320
        this.textboxY = clientInstance.canvas.canvas.height -120

        this.init();
    }

    init = async () => {
        this.textImage = await Util.loadImage(Util.getImageLocation("textbox.png"))
    }

    update = () => {
        if(!clientInstance.player) return;
        if (clientInstance.tick % 5 == 0) {
            if(this.moving)
            this.xFrame = (this.xFrame + 1) % 4;
        }

        switch(this.direction){
            case "down": this.yFrame = 0;
            break;
            case "left": this.yFrame = 1*64;
            break;
            case "right": this.yFrame = 2*64;
            break;
            case "up": this.yFrame = 3*64;
        }
        this.checkForPlayer();
    }

    getAnimationLocation = () => {
        if(this.yVel === 0 && this.xVel === 0) return;
        
        if(this.yVel >0 ){
            this.direction = "down"
            return;
        }
        if(this.yVel < 0) {
            this.direction = "up"
            return;
        }
        if(this.xVel >0)
        this.direction = "right"
        if(this.xVel < 0)
    this.direction = "left"
    }

    updatePosition = () => {
        this.x += this.xVel;
        this.y += this.yVel
    }

    draw = () => {
        // clientInstance.canvas.ctx.strokeStyle = "black"
        // clientInstance.canvas.ctx.strokeRect(this.x+clientInstance.player.getCenterX()+32,this.y+clientInstance.player.getCenterY()+16,this.boundingWidth,this.boundingHeight)
        if(this.talking && this.textImage){
            clientInstance.canvas.ctx.drawImage(this.textImage, this.textboxX, this.textboxY,this.textImage.width*2, this.textImage.height *2)
            clientInstance.canvas.ctx.fillStyle = 'black'
            clientInstance.canvas.ctx.font = "16px FutilePro"
            clientInstance.canvas.ctx.textAlign = "left";
            clientInstance.canvas.ctx.textBaseline = 'left';
            clientInstance.canvas.ctx.fillText(this.text,this.textboxX+20,this.textboxY+20)
        }
        
        if(this.image)
        this.image.draw(this.xFrame*64,this.yFrame,64,64,this.x+clientInstance.player.getCenterX()+16,this.y+clientInstance.player.getCenterY(),64,64)
    }

    checkForPlayer =() => {
        if(clientInstance.player.hitbox.x <= this.canTalkBox.x-16 + this.canTalkBox.size && clientInstance.player.hitbox.x + clientInstance.player.hitbox.width > this.canTalkBox.x-16 &&
        clientInstance.player.hitbox.y <= this.canTalkBox.y-16 + this.canTalkBox.size && clientInstance.player.hitbox.y + clientInstance.player.hitbox.height > this.canTalkBox.y-16) {
            this.talking = true;
        } else {
            this.talking = false;
            return;
        }
    }

}