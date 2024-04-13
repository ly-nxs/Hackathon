import { AudioManager } from "./audiomanager.js";
import { Canvas } from "./canvas.js";
import UiManager from "./ui/uiManager.js";
import { Listeners } from "./listeners.js";


export class Client {
    init  = async () => {
        this.sock = io();
        this.canvas = new Canvas();
        this.audioManager = new AudioManager();
        this.uiManager = new UiManager();
        this.Listeners = new Listeners();
        
        this.futileProFont = new FontFace("FutilePro", "url(./resources/fonts/FutilePro.ttf)");
        this.compassPro = new FontFace("CompassPro", "url(./resources/fonts/CompassPro.ttf)")
        await this.futileProFont.load().then((font) => {
            document.fonts.add(font);
        });
        
        this.fps = 0;
        this.times = []
        setInterval(this.tickloop,50);
        this.renderLoop();
    }

    tickLoop = () => {
        if(this.tick<20)
        this.tick++;
        else
        this.tick=1;
        
    
        
    }

    renderLoop = () =>{
        const now = performance.now();
        while(this.times.length > 0 && this.times[0] <= now - 1000){
            this.times.shift();
        }
        this.times.push(now)
        this.fps = this.times.length;
        this.canvas.ctx.clearRect(0,0,this.canvas.canvas.width, this.canvas.canvas.height);
        this.canvas.ctx.fillRect(100,100,100,100)

        this.uiManager.drawScreen();
    }
}