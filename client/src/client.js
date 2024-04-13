import { AudioManager } from "./audiomanager.js";
import { Canvas } from "./canvas.js";
import UiManager from "./ui/uiManager.js";
import { Listeners } from "./listeners.js";
import { MapList } from "./maps/mapList.js";
import { MapManager2 } from "./maps/mapManager.js";
import { EntityManager } from "./entityManager.js";

export class Client {
    init  = async () => {
        this.sock = io();
        this.entityManager = new EntityManager();
        this.listeners = new Listeners();
        this.canvas = new Canvas();
        this.uiManager = new UiManager();
        this.mapList = new MapList();
        this.mapManager = new MapManager2();
        this.audioManager = new AudioManager();
        
        this.futileProFont = new FontFace("FutilePro", "url(./resources/fonts/FutilePro.ttf)");
        this.compassPro = new FontFace("CompassPro", "url(./resources/fonts/CompassPro.ttf)")
        await this.futileProFont.load().then((font) => {
            document.fonts.add(font);
        });
        
        this.fps = 0;
        this.times = []
        setInterval(this.tickLoop,50);
        this.renderLoop();
    }

    tickLoop = () => {
        if(this.tick<20)
        this.tick++;
        else
        this.tick=1;
        if(this.player){
            this.player.update();
        }
    
        this.entityManager.updateEntities();
        
    
        
    }

    renderLoop = () =>{
        const now = performance.now();
        while(this.times.length > 0 && this.times[0] <= now - 1000){
            this.times.shift();
        }
        this.times.push(now)
        this.fps = this.times.length;
        this.canvas.ctx.clearRect(0,0,this.canvas.canvas.width, this.canvas.canvas.height);

        this.mapManager.drawScreen();
        this.canvas.ctx.resetTransform();
        
        this.entityManager.renderEntities();
        if(this.player)
        this.player.draw();

        this.mapManager.drawSky();
        this.uiManager.drawScreen();
        if(this.player)
        this.player.updateRender();

        
        this.canvas.ctx.textBaseline = 'top';
        this.canvas.ctx.fillStyle='blue'
        this.canvas.ctx.fillText(this.fps, 32, 8)

        if(this.player)
        this.canvas.ctx.strokeRect(((Math.floor(this.listeners.mouseX/32)*32)) + window.innerWidth/2 - this.player.character.x-32,
        (Math.floor(this.listeners.mouseY/32)*32) + window.innerHeight/2 - this.player.character.y-32
        ,32,32)
        if(this.player)
        this.canvas.ctx.fillText(Math.floor(this.listeners.mouseX/32) + " " + Math.floor(this.listeners.mouseY/32), this.listeners.mouseX-50, this.listeners.mouseY-60)

        requestAnimationFrame(this.renderLoop)
    }
}