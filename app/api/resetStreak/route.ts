import { NextResponse } from "next/server";
import { db } from "../../dbSetup";

export async function POST(req: Request){
    try {
        const body = await req.json();
        const playerId = body.playerId;

        // reset the player's current streak in the database
        await new Promise<void>((resolve, reject) => {
            db.run(`UPDATE players SET streak = 0 WHERE id = ?`, [playerId], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });

        // get the player's current streak from the database to confirm it's reset
        const row: { streak: number } = await new Promise((resolve, reject) => {
            db.get(`SELECT streak FROM players WHERE id = ?`, [playerId], (err, row: { streak: number }) => {
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

        return NextResponse.json({ streak: row.streak });
    }
    catch (error) {
        console.log("API ERROR", error);
        return NextResponse.json({ error: "API ERROR" }, { status: 500 })
    }
}