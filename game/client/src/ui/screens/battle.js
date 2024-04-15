import Screen from "./screen.js"
import Button from "../elements/button.js"
import { player } from "../../maps/mapManager.js";
import { clientInstance } from "../../main.js";
import { Overlay } from "./overlay.js";

export class BattleScreeen extends Screen {
    init = () => {
        let click = async () => {
            let enemyHealth = localStorage.getItem("enemyHealth");
            console.log(enemyHealth);
            let playerHealth = player.health;
            const playerId = localStorage.getItem("playerId");
            const response = await axios.post("https://jacob5257.com/api/getQuestion", {
                playerId: playerId
            })
            const question = response.data.question;
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
                console.log(streak);
                for (let i = streak; i > 0; i--) {
                    enemyHealth -= i;
                    console.log(enemyHealth, i)
                }
                if (enemyHealth <= 0) { 
                    window.alert("Congratulations! You won!");
                    clientInstance.uiManager.setScreen(new Overlay())
                    player.battle = false;
                    if (localStorage.getItem("enemyHealth") == 250) {
                        window.alert("Congratulations! You won the game! Try with a different subject now!");
                        localStorage.removeItem("enemyHealth");
                        localStorage.removeItem("playerId");
                        window.location.href = "https://hackathon.jacob5257.com";
                    }
                }
                else window.alert("Correct!\nEnemy's health is now: " + (enemyHealth > 0 ? enemyHealth : 0));
            } else {
                playerHealth -= Math.ceil(Math.random() * 10);
                window.alert("Incorrect! The answer was " + response2.data.correctAnswer + ".\nYour streak has been reset to 0 and your health is now " + (playerHealth > 0 ? playerHealth : 0));
                if (playerHealth <= 0) {
                    window.alert("You lost! Better luck next time!");
                    localStorage.removeItem("playerId");
                    window.location.href = "https://hackathon.jacob5257.com";
                }
            }
            localStorage.setItem("enemyHealth", enemyHealth);
            player.health = playerHealth;
        }
        this.addElement(new Button("Answer Question", click,250,250,250,250));
    }
}
