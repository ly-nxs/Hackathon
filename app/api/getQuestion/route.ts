import { NextResponse } from "next/server";
import { Database } from "sqlite3";

const db = new Database('./players.db');

export async function POST(req: Request){
    try {
        const body = await req.json();
        const playerId = body.playerId;
        // get the player's name and category from the database
        db.get(`SELECT name, category FROM players WHERE id = ?`, [playerId], (err, row: { name: string, category: string }) => {
            if (err) {
                return console.error(err.message);
            }
            if (row) {
                const category = row.category;
                // go to <category>.txt and get a random question
                const fs = require('fs');
                const questions = fs.readFileSync(`./questions/${category}.txt`, 'utf8').split('\n');
                const randomIndex = Math.floor(Math.random() * questions.length);
                const question = questions[randomIndex];
                return NextResponse.json({ question: question, questionId: randomIndex });
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