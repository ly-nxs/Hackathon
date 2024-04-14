
import Button from "../elements/button.js";
import { ImageElement } from "../elements/imageElement.js"; 
import { TextElement } from "../elements/textElement.js";
import Screen from "./screen.js";
import { clientInstance } from "../../main.js";
import { Overlay } from "./overlay.js";
import { MainMenu } from "./mainmenu.js";

export class SubjectScreen extends Screen {

    init = () => {
        console.log("subjects")
        let addMath = () => {
            clientInstance.questionManager.math = !clientInstance.questionManager.math;
            console.log(clientInstance.questionManager.math)
        }
        let addScience = () => {
            clientInstance.questionManager.science = !clientInstance.questionManager.science;
            console.log(clientInstance.questionManager.science)
        }
        let addPhysics = () => {
            clientInstance.questionManager.physics = !clientInstance.questionManager.physics;
            console.log(clientInstance.questionManager.physics)
        }
        let back = () => {
            clientInstance.uiManager.setScreen(new MainMenu())
        }
        this.addElement(new ImageElement("background.png", window.innerWidth/2 - window.innerWidth/2, window.innerHeight/2 - window.innerHeight/2, window.innerWidth, window.innerHeight))
        this.addElement(new TextElement("Select a Subject", window.innerWidth/2,window.innerHeight/2-150, 550,300,'black'))

        // this.addElement(new TextElement("Select a Subject", window.innerWidth/2,window.innerHeight+200,200,200,'black'))
        this.addElement(new Button("Math", addMath, window.innerWidth/2-200, window.innerHeight/2-100,400,100))
        this.addElement(new Button("Science", addScience, window.innerWidth/2-200, window.innerHeight/2,400,100))
        this.addElement(new Button("Physics", addPhysics, window.innerWidth/2-200, window.innerHeight/2+100,400,100))
        this.addElement(new Button("Back", back, 50,50,100,60))
    }
}