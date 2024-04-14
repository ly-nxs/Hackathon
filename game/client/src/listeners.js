import { clientInstance } from "./main.js";


export class Listeners {
    constructor () {
        this.init();
        this.mouseX = 0;
        this.mouseY = 0;
    }
    

    init = () => {
        window.addEventListener('click', this.onClick);
        window.addEventListener('mousemove', this.onMouseMove);
        window.addEventListener('keydown', this.onKeyDown);
        window.addEventListener('keyup', this.onKeyUp);
        window.addEventListener('mouseover',this.onMouseOver);        //For mouse hovering --- For the button animation
        window.addEventListener('mouseup', this.onMouseUp);           //For when mouse stops hovering --- For the button animation
    }

    onClick = (e) => {
        
        clientInstance.audioManager.init()
        if(clientInstance.player)
        clientInstance.player.onClick(e);
        clientInstance.uiManager.currentScreen.onClick(e);
    }

    onMouseMove = (e) => {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
    }

    onKeyDown = (e) => {
        if(clientInstance.player)
        clientInstance.player.onKeyDown(e);
    }

    onKeyUp = (e) => {
        if(clientInstance.player)
        clientInstance.player.onKeyUp(e);
    }

    onMouseOver = (e) => {
        //clientInstance.player.onMouseOver(e);
    }

    onMouseUp = (e) => {
        //clientInstance.player.onMouseUp(e);
    }

}