import { Character } from "./characters/character.js";
import { NPC } from "./characters/npc.js";
import { clientInstance } from "./main.js";

export class Player {

    constructor() {
        this.frame = 0;
        this.yVel = 0
        this.xVel = 0
        this.lastKeyUsed = "w";
        this.health = 100;

        this.battle = false;

        this.hitbox = {
            x: 0,
            y: 0,
            width: 34,
            height:52,
            xOffset: 14,
            yOffset:10,
        }

        this.maps = clientInstance.mapList.maps
        // console.log(this.maps)
        this.init();


    }

    init = () => {
        this.character = new Character("ethan.png");
        this.character.init("ethan.png");

        this.character.isPlayer = true;
        
    };

    getCenterX = () => {
        return Math.floor(-(this.character.boundingX-this.character.boundingWidth/2)+window.innerWidth/2)-32
    }

    getCenterY = () => {
        return Math.floor(-(this.character.boundingY-this.character.boundingHeight/2)+window.innerHeight/2)
    }

    keys = {
        w: false,
        a: false,
        s: false,
        d: false,
    };

    update = () => {
        if (clientInstance.tick % 5 == 0) {
            this.frame = (this.frame + 1) % 4;
        }
        
        const loc = this.getBoundingLocation();
        const { x, y } = loc;
        
        clientInstance.mapList.getMap(clientInstance.mapManager.currentMap.name).forEach(teleport => {
            const coords = teleport.coords;
            //console.log(teleport)
            if(x == coords[0] && y == coords[1]) {
                console.log("teleport")
            clientInstance.mapManager.loadNewMap(teleport.next,coords[2],coords[3]);
        }
        

        })
    };
        

    getPosition = () => {
        this.hitbox.x = this.character.x + this.hitbox.xOffset;
        this.hitbox.y = this.character.y + this.hitbox.yOffset;
        return { x: this.character.x, y: this.character.y };

    }

    getAnimationLocation = () => {
        let row = 0;
        let col = 0;
        let temp = 3;
    

        if(this.keys.w) { 
            row = 3; 
            this.lastKeyUsed = "w";
            this.direction = "up"
        }
        else if(this.keys.s) {
            row = 0;
            this.lastKeyUsed = "s";
            this.direction = "down"
        }
        else if(this.keys.d && (!this.keys.w || !this.keys.s)) { 
            row = 2; 
            this.lastKeyUsed = "d";
            this.direction = "right"
        }
        else if(this.keys.a && (!this.keys.w || this.keys.s)) {
            row = 1;
            this.lastKeyUsed = "a"
            this.direction = "left"
        }
        
        if(!this.keys.w && !this.keys.s && !this.keys.a && !this.keys.d) {

            if(this.lastKeyUsed === "w") {
                temp = 3;
            } else if (this.lastKeyUsed === "s") {
                temp = 0;
            } else if (this.lastKeyUsed === "a") {
                temp = 1;
            } else {
                temp = 2;
            }

            return {
                x: 0,
                y: temp * 64
            }
        }
        return {
            x: this.frame * 64,
            y: row * 64,
        };
    };

    getBoundingLocation = () => {
        const x = this.character.boundingX+this.character.boundingWidth/2;
        const y = this.character.boundingY+this.character.boundingHeight/2;
        const tileWidth = 32;
        const tileHeight = 32;
        const tileX = Math.floor(x / tileWidth);
        const tileY = Math.floor(y / tileHeight);
        return { x: tileX, y: tileY };
    }

    draw = () => {
        clientInstance.canvas.ctx.save()
        clientInstance.canvas.ctx.globalAlpha = this.character.invincible ? 0.5 : 1;

        const { x, y } = this.getAnimationLocation();

        // this.character.draw(x, y);
        this.character.draw(x, y,window.innerWidth/2-32,window.innerHeight/2-32);
        const ctx = clientInstance.canvas.ctx;
        clientInstance.canvas.ctx.strokeRect(this.hitbox.x,this.hitbox.y,this.hitbox.width,this.hitbox.height)
        clientInstance.canvas.ctx.restore();
    };

    updateRender = () => {
        

        

        this.updateKeyPress();

        this.applyMovement();
    }

    updateKeyPress = () => {
        const keys = [
            { key: "w", up: () => (this.yVel -= 1) },
            { key: "s", up: () => (this.yVel += 1) },
            { key: "a", up: () => (this.xVel -= 1) },
            { key: "d", up: () => (this.xVel += 1) },
        ];

        for (const key of keys) {
            if (this.keys[key.key]) {
                key.up();
            }
        }
    };

    

    

    onClick = (e) => {
    //    clientInstance.entityManager.addNPC(new NPC("Billy.png",250,250))
    };

    onKeyDown = (e) => {
        
        if(e.key === "Escape"){
            location.reload();
        }

        
        if(this.battle){
            this.keys.w = false;
            this.keys.a = false;
            this.keys.s = false;
            this.keys.d = false;
            return;
        }
        this.keys[e.key] = true;
        
        //console.log(e.key + this.keys[e.key])
    };

    onKeyUp = (e) => {
        this.keys[e.key] = false;
    };

    applyMovement = () => {
        if (!clientInstance.mapManager.currentMap) return;
        
        const { x, y } = this.getPosition();
        
        //console.log(this.xVel, this.yVel, "vel");
        const newPosition = {
            x: x + this.xVel,
            y: y + this.yVel,
        };

        this.character.updatePosition(newPosition.x, newPosition.y);

        // Reset velocity to 0 after each update
        this.xVel = 0;
        this.yVel = 0;
    };

    // Add the following utility method to the `Player` class
    indexToXY = (index) => {
        const tileMapWidth = clientInstance.mapManager.currentMap.mapWidth;
        const x = index % tileMapWidth;
        const y = Math.floor(index / tileMapWidth);

        return { x, y };
    };

    

    
}
