import { NextResponse } from "next/server";
import { db } from "../../dbSetup";
import fs from 'fs';

// function to get a question from the database
export async function POST(req: Request) {
    try {
        // get vars from the request body
        const body = await req.json();
        const playerId = body.playerId;
        // create variables to store the question and question id
        let question = "";
        let questionId = -1;

        // get the player's name and category from the database
        const row = await new Promise((resolve, reject) => {
            db.get(`SELECT name, category FROM players WHERE id = ?`, [playerId], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });

        // check to see if the player exists
        if (!row) {
            return NextResponse.json({ error: "Player data does not exist" }, { status: 404 });
        }

        // get the player's category
        const category: string = (row as { category: string }).category;
        // go to <category>.txt and get a random question
        const questions = fs.readFileSync(`./app/questions/${category}.txt`, 'utf8').split('\n');
        questionId = Math.floor(Math.random() * questions.length);
        question = questions[questionId];
        // return the question and question id
        return NextResponse.json({ question: question, questionId: questionId }, { status: 200 });
    }
    // catch errors
    catch (error) {
        console.log("API ERROR", error);
        return NextResponse.json({ error: "API ERROR" }, { status: 500 })
    }
}