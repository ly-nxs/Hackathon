
import Button from "../elements/button.js";
import { ImageElement } from "../elements/imageElement.js"; 
import { TextElement } from "../elements/textElement.js";
import Screen from "./screen.js";
import { clientInstance } from "../../main.js";
import { Overlay } from "./overlay.js";

export class MainMenu extends Screen {
    
    init = async () => {
        //this.addElement(new ImageElement("./resources/images/background.png", 0, 0, window.innerWidth, window.innerHeight))
        let loadMap = async (e) => {
            console.log("loading the map!");
            console.log(e)
            await clientInstance.mapManager.loadNewMap("startingarea");
            clientInstance.uiManager.setScreen(new Overlay())
            clientInstance.canvas.ctx.font = "30px FutilePro"
        }
        this.addElement(new TextElement("Game", window.innerWidth/2-100,window.innerHeight/2-100, 100,100,'black'))
        this.addElement(new ImageElement("background.png", window.innerWidth/2 - window.innerWidth/2, window.innerHeight/2 - window.innerHeight/2, window.innerWidth, window.innerHeight))
        this.addElement(new Button("Play",loadMap,window.innerWidth/2-200,window.innerHeight/2+20,400,100))
    }

    
}
