import { IImage } from "../IImage.js";
import { clientInstance } from "../main.js";

export class NPC {
    constructor(img,x,y) {
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

        this.init();
    }

    init = () => {

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
        this.image.draw(this.xFrame * 64,this.yFrame, 64, 64, this.x + clientInstance.player.getCenterX() + 16, this.y + clientInstance.player.getCenterY(), 64, 64)
    }

}