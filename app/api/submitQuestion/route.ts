import { NextResponse } from "next/server";
import { Database } from "sqlite3";

const db = new Database('./players.db');

export async function POST(req: Request){
    try {
        const body = await req.json();
        const playerId = body.playerId;
        const questionId = body.questionId;
        const answer = body.answer;
        // get the answer from the file <category>-answers.txt
        db.get(`SELECT category FROM players WHERE id = ?`, [playerId], (err, row: { category: string }) => {
            if (err) {
                return console.error(err.message);
            }
            if (row) {
                const category = row.category;
                const fs = require('fs');
                const answers = fs.readFileSync(`./answers/${category}-answers.txt`, 'utf8').split('\n');
                const correctAnswer = answers[questionId];
                if (answer === correctAnswer) {
                    return NextResponse.json({ correct: true });
                }
                else {
                    return NextResponse.json({ correct: false });
                }
            }
            else {
                return NextResponse.json({ error: "Player not found" }, { status: 404 });
            }
        });
    }
    catch (error) {
        console.log("API ERROR", error);
        return NextResponse.json({ error: "API ERROR" }, { status: 500 })
    }
}