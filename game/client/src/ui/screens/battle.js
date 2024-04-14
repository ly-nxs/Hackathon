import Screen from "./screen.js"
import Button from "../elements/button.js"

export class BattleScreeen extends Screen {
    init = () => {
        let click = async () => {
            console.log("backend")
            const playerId = localStorage.getItem("playerId");
            const response = await axios.post("https://jacob5257.com/api/getQuestion", {
                playerId: playerId
            })
            const question = response.data.question; // assuming the question is in the 'question' property of the response
            const answer = window.prompt(question);
            const response2 = await axios.post("https://jacob5257.com/api/submitQuestion", {
                playerId: playerId,
                questionId: response.data.questionId,
                answer: answer
            });
            const result = response2.data.correct;
            const streak = response2.data.streak;
            if (result) {
                window.alert("Correct! Streak: " + streak)
            } else {
                window.alert("Incorrect! Streak: " + streak)
            }
        }
        this.addElement(new Button("battle button", click,250,250,250,250))
    }
}
