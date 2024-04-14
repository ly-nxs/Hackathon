import Screen from "./screen.js"
import Button from "../elements/button.js"

export class BattleScreeen extends Screen {

    constructor(trainer) {
        super();
        this.trainer = trainer;
    }

    init = () => {
        let click = async () => {
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
            const getStreak = await axios.post("https://jacob5257.com/api/getStreak", {
                playerId: playerId
            });
            const streak = getStreak.data.streak;
            if (result) {
                const res = "Correct! Streak: " + streak + "\n";
                if (streak >= 3) { 
                    window.alert(res + "Congratulations! You've answered 3 questions correctly. You win!");
                    const response3 = await axios.post("https://jacob5257.com/api/resetStreak", {
                        playerId: playerId
                    });
                    this.trainer.endBattle();
                } else {
                    window.alert(res + "You need to answer " + (3 - streak) + " more questions correctly to win.");
                }
            } else {
                window.alert("Incorrect! Your streak has been reset to 0.");
            }
        }
        this.addElement(new Button("Answer Question", click,250,250,250,250));
    }
}
