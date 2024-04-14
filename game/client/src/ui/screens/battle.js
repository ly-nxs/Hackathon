import Screen from "./screen.js"
import Button from "../elements/button.js"

export class BattleScreeen extends Screen {
    init = () => {
        let click = () => {
            console.log("backend")
            const question = await axios.post("https://jacob5257.com/api/getQuestion", {
                playerId: 237926
            })
	    console.log(question.data)
	    console.log("done")
        }
        this.addElement(new Button("battle button", click,250,250,250,250))
    }
}
