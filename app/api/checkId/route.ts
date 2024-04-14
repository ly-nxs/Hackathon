import { NextResponse } from "next/server";
import { db } from "../../dbSetup";

export async function POST(req: Request){
    try {
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

        return NextResponse.json({ valid: row });
    }
    catch (error) {
        console.log("API ERROR", error);
        return NextResponse.json({ error: "API ERROR" }, { status: 500 })
    }
}