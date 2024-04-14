
import Button from "../elements/button.js";
import { ImageElement } from "../elements/imageElement.js"; 
import { TextElement } from "../elements/textElement.js";
import Screen from "./screen.js";
import { clientInstance } from "../../main.js";
import { MainMenu } from "./mainmenu.js";

export class SubjectScreen extends Screen {

    init = () => {
        console.log("subjects")
        let addMath = async () => {
            clientInstance.questionManager.math = true;
            clientInstance.questionManager.physics = false;
            clientInstance.questionManager.science = false;
            const response = await axios.post("https://jacob5257.com/api/newPlayer", {
                name: "player",
                category: "math"
            })
            const playerId = response.data.playerId;
            localStorage.setItem('playerId', playerId);
            this.addElement(new TextElement("Your Subject is Math! You may now continue",0,window.innerHeight, 100,window.innerHeight/2,'blue'))

        }

        let addScience = async () => {
            clientInstance.questionManager.math = false;
            clientInstance.questionManager.physics = false;
            clientInstance.questionManager.science = true;
            const response = await axios.post("https://jacob5257.com/api/newPlayer", {
                name: "player",
                category: "science"
            })
            const playerId = response.data.playerId;
            localStorage.setItem('playerId', playerId);
            this.addElement(new TextElement("Your Subject is Science! You may now continue",0,window.innerHeight, 100,window.innerHeight/2,'blue'))

        }

        let addPhysics = async () => {
            clientInstance.questionManager.math = false;
            clientInstance.questionManager.physics = true;
            clientInstance.questionManager.science = false;
            const response = await axios.post("https://jacob5257.com/api/newPlayer", {
                name: "player",
                category: "physics"
            })
            const playerId = response.data.playerId;
            localStorage.setItem('playerId', playerId);
            this.addElement(new TextElement("Your Subject is Physics! You may now continue",0,window.innerHeight, 100,window.innerHeight/2,'blue'))

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
