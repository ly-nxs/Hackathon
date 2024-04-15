import { NextResponse } from "next/server";
import { db } from "../../dbSetup";

// function to submit the player's answer to a question
export async function POST(req: Request) {
    try {
        // get vars from the request body
        const body = await req.json();
        const playerId = body.playerId;
        const questionId = body.questionId;
        const answer = body.answer.toLowerCase();

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

        // check to see if the player exists
        if (!row) {
            return NextResponse.json({ error: "Player not found" }, { status: 404 });
        }

        // get the player's category and current streak
        const category: string = (row as { category: string }).category;
        const currentStreak: number = (row as { streak: number }).streak;
        // get the correct answer from the answers file
        const fs = require('fs');
        const answers = fs.readFileSync(`./app/questions/${category}-answers.txt`, 'utf8').toLowerCase().split('\n');
        const correctAnswer = answers[questionId];
        // update the streak based on the answer
        let newStreak = 0;
        if (answer == correctAnswer) {
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

        // return if the answer was correct, the new streak, and the correct answer
        return NextResponse.json({ correct: answer == correctAnswer, streak: newStreak, correctAnswer: correctAnswer });
    }
    // catch errors
    catch (error) {
        console.log("API ERROR", error);
        return NextResponse.json({ error: "API ERROR" }, { status: 500 })
    }
}