import { NextResponse } from "next/server";
import { db } from "../../dbSetup";

export async function GET(req: Request){
    try {
        // Retrieve all players from the SQLite database
        const players = await new Promise((resolve, reject) => {
            db.all(`SELECT * FROM players`, [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });

        // Return the players
        return NextResponse.json({ players: players });
    }
    catch (error) {
        console.log("API ERROR", error);
        return NextResponse.json({ error: "API ERROR" }, { status: 500 })
    }
}