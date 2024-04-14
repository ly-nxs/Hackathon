import { NextResponse } from "next/server";
import { db } from "../../dbSetup";

export async function POST(req: Request){
    try {
        const body = await req.json();
        const playerId = body.playerId;
        const questionId = body.questionId;
        const answer = body.answer;

        // get the player's category and current streak from the database
        const row = await new Promise((resolve, reject) => {
            db.get(`SELECT category, streak FROM players WHERE id = ?`, [playerId], (err, row: { category: string, streak: number }) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });

        if (!row) {
            return NextResponse.json({ error: "Player not found" }, { status: 404 });
        }

        const category: string = (row as { category: string }).category;
        const currentStreak: number = (row as { streak: number }).streak;
        const fs = require('fs');
        const answers = fs.readFileSync(`./app/questions/${category}-answers.txt`, 'utf8').split('\n');
        const correctAnswer = answers[questionId];
        let newStreak = 0;
        if (answer.toLowerCase() === correctAnswer) {
            newStreak = currentStreak + 1;
        }

        // update the player's streak in the database
        await new Promise<void>((resolve, reject) => {
            db.run(`UPDATE players SET streak = ? WHERE id = ?`, [newStreak, playerId], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });

        return NextResponse.json({ correct: answer === correctAnswer, streak: newStreak });
    }
    catch (error) {
        console.log("API ERROR", error);
        return NextResponse.json({ error: "API ERROR" }, { status: 500 })
    }
}