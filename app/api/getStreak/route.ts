import { NextResponse } from "next/server";
import { db } from "../../dbSetup";

// function to get the player's streak from the database
export async function POST(req: Request) {
    try {
        // get vars from the request body
        const body = await req.json();
        const playerId = body.playerId;

        // get the player's current streak from the database
        const row: { streak: number } = await new Promise((resolve, reject) => {
            db.get(`SELECT streak FROM players WHERE id = ?`, [playerId], (err, row: { streak: number }) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });

        // check to see if the id was found
        if (!row) {
            return NextResponse.json({ error: "Player not found" }, { status: 404 });
        }

        // return the player's streak
        return NextResponse.json({ streak: row.streak });
    }
    // catch errors
    catch (error) {
        console.log("API ERROR", error);
        return NextResponse.json({ error: "API ERROR" }, { status: 500 })
    }
}