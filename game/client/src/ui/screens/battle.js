import Screen from "./screen.js"
import Button from "../elements/button.js"
import { TextElement } from "../elements/textElement.js"

export class BattleScreeen extends Screen {
     
    init = () => {
        let click = () => {
            console.log("backend")
        }
        this.addElement(new Button("battle button", click,250,250,250,250))
    }
}