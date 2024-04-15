import { NextResponse } from "next/server";
import { db } from "../../dbSetup";

// function designed to check if a player id still exists in the database
export async function POST(req: Request){
    try {
        // get vars from request body
        const body = await req.json();
        const playerId = body.playerId;

        // Check if playerId is in the database
        const row: { id: string } = await new Promise((resolve, reject) => {
            db.get(`SELECT id FROM players WHERE id = ?`, [playerId], (err, row: { id: string }) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });

        // return if player id is valid
        return NextResponse.json({ valid: row });
    }
    // catch errors
    catch (error) {
        console.log("API ERROR", error);
        return NextResponse.json({ error: "API ERROR" }, { status: 500 })
    }
}