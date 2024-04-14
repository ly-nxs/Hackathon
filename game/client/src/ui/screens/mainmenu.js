
import Button from "../elements/button.js";
import { ImageElement } from "../elements/imageElement.js"; 
import { TextElement } from "../elements/textElement.js";
import Screen from "./screen.js";
import { clientInstance } from "../../main.js";
import { Overlay } from "./overlay.js";
import { SubjectScreen } from "./subject.js";

export class MainMenu extends Screen {
    
    init = async () => {
        let loadMap = async (e) => {
            if (localStorage.getItem("playerId") == null) {
                window.alert("Please select a subject before playing the game.");
                return;
            }
            await clientInstance.mapManager.loadNewMap("startingarea");
            clientInstance.uiManager.setScreen(new Overlay())
            clientInstance.canvas.ctx.font = "30px FutilePro"
        }
        let subjectScreen = async (e) => {
            clientInstance.uiManager.setScreen(new SubjectScreen())
        }
        this.addElement(new ImageElement("background.png", window.innerWidth/2 - window.innerWidth/2, window.innerHeight/2 - window.innerHeight/2, window.innerWidth, window.innerHeight))
        this.addElement(new Button("Play",loadMap,window.innerWidth/2-200,window.innerHeight/2+20,400,100))
        this.addElement(new Button("Select Subject", subjectScreen, window.innerWidth/2-200, window.innerHeight/2+120,400,100))
        this.addElement(new TextElement("Game", window.innerWidth/2,window.innerHeight/2-100, 200,200,'black'))
    }

    
}
