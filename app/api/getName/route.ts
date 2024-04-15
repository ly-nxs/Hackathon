import { NextResponse } from "next/server";
import { db } from "../../dbSetup";

// function to get the user's name from the database
export async function POST(req: Request){
    try {
        // get vars from the request body
        const body = await req.json();
        const playerId = body.playerId;

        // search the database for the player's name
        const row: { name: string } = await new Promise((resolve, reject) => {
            db.get(`SELECT name FROM players WHERE id = ?`, [playerId], (err, row: { name: string }) => {
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

        // return the player's name
        return NextResponse.json({ name: row.name });
    }
    catch (error) {
        console.log("API ERROR", error);
        return NextResponse.json({ error: "API ERROR" }, { status: 500 })
    }
}