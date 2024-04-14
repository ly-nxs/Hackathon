import { NextResponse } from "next/server";
import { db } from "../../dbSetup";

export async function POST(req: Request){
    try {
        const body = await req.json();
        const playerId = body.playerId;

        const row: { name: string } = await new Promise((resolve, reject) => {
            db.get(`SELECT name FROM players WHERE id = ?`, [playerId], (err, row: { name: string }) => {
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

        return NextResponse.json({ name: row.name });
    }
    catch (error) {
        console.log("API ERROR", error);
        return NextResponse.json({ error: "API ERROR" }, { status: 500 })
    }
}