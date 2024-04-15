import Screen from "./screen.js"
import Button from "../elements/button.js"
import { TextElement } from "../elements/textElement.js"
import { ImageElement } from "../elements/imageElement.js"

export class BattleScreeen extends Screen {
     
    init = () => {
        let click = () => {
            console.log("backend")
        }
        this.addElement(new Button("battle button", click,250,250,250,250))
        // this.addElement(new ImageElement("battlebackground1.png",window.innerWidth/2 - window.innerWidth/2, window.innerHeight/2 - window.innerHeight/2, window.innerWidth, window.innerHeight))
        // this.addElement(new ImageElement("textbox.png", 0, window.innerHeight - window.innerHeight*0.3,window.innerWidth, window.innerHeight*0.3))
        // this.addElement(new ImageElement("healthbar.png",0,window.innerHeight/2-10,360,93))
        // this.addElement(new ImageElement("healthbar.png", 0,window.innerHeight/2 - 220,360, 93))
        
    }
}