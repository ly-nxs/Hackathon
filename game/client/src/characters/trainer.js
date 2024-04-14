import { clientInstance } from "../main.js";
import Util from "../util.js";
import { NPC } from "./npc.js";
import { BattleScreeen } from "../ui/screens/battle.js";
import { Overlay } from "../ui/screens/overlay.js";

export class Trainer extends NPC {
    constructor(img,x,y, health, exp,range) {
        super(img,x,y);

        this.health = health;
        this.exp = exp;
        this.init();

        this.canBattle = true //set to false after trainer defeated
        this.battle = false; //determines if battle has started or not
        this.attentionDrawn = false; //determines if trainer has seen a player
        this.range = {
            x: this.x +30,
            y: this.y +16,
            width: 36,
            height: 128
        }
        this.init();
    }

    init = async () => {
        this.attentionIcon = await Util.loadImage(Util.getImageLocation("attention.png"))
    }

    startBattle = () => {
        if(this.battle) return;
        clientInstance.player.battle = true;
        console.log("startbattle")
        clientInstance.uiManager.setScreen(new BattleScreeen());
        this.battle = true;
        this.range.width = 0;
        this.range.height = 0;
    }

    endBattle = () => {
        clientInstance.uiManager.setScreen(new Overlay())
        this.battle = false;
    }

    update = () => {
        if(!clientInstance.player) return
        if(this.battle) return;
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
        this.range.x = this.x + +30;
        this.range.y = this.y + +16;

        if(this.attentionDrawn)
        this.startBattle();
    }

    checkForPlayer = () => {
        //checks if player hitbox is inside the trainer attention box
        if((this.range.x >= clientInstance.player.hitbox.x && this.range.x <= clientInstance.player.hitbox.x+clientInstance.player.hitbox.width)&&
        (this.range.y >= -clientInstance.player.hitbox.y && this.range.y <= clientInstance.player.hitbox.y + clientInstance.player.hitbox.height)) {
            console.log("inside")
            this.attentionDrawn = true;
        } else {
            this.attentionDrawn = false;
        }
    }

    draw =  () => {
        if(this.battle) return;
        this.checkForPlayer();
        if(this.attentionDrawn) {
            clientInstance.canvas.ctx.drawImage(this.attentionIcon,this.x+clientInstance.player.getCenterX()+32,this.y+clientInstance.player.getCenterY() - 25,32,32)
        }

        if(this.image)
        this.image.draw(this.xFrame*64,this.yFrame,64,64,this.x+clientInstance.player.getCenterX()+16,this.y+clientInstance.player.getCenterY(),64,64)
        // clientInstance.canvas.ctx.strokeRect(this.x+clientInstance.player.getCenterX()+32,this.y+clientInstance.player.getCenterY()+16,32,128)
        clientInstance.canvas.ctx.strokeRect(this.range.x, this.range.y, this.range.width,this.range.height)
    }
}
