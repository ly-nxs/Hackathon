import Screen from "./screen.js"
import Button from "../elements/button.js"
import cors from "cors"

export class BattleScreeen extends Screen {
     
    init = () => {
        let click = () => {
            console.log("backend")
            const question = axios.post("https://jacob5257.com/api/getQuestion", {
                playerId: 237926
            }).then((res) => {
                console.log(res)
            }).catch((err) => {
                console.log(err)
            })
        }
        this.addElement(new Button("battle button", click,250,250,250,250))
    }
}