import { NextResponse } from "next/server";
import { Database } from "sqlite3";

const db = new Database('./players.db');

export async function POST(req: Request){
    try {
        const body = await req.json();
        const name = body.name;
        const category = body.category;

        // Generate a new player ID
        let playerId = Math.floor(Math.random() * 1000000);
        // check if the player ID already exists
        db.get(`SELECT id FROM players WHERE id = ?`, [playerId], (err, row) => {
            if (err) {
                return console.error(err.message);
            }
            if (row) {
                // If the player ID already exists, generate a new one
                playerId = Math.floor(Math.random() * 1000000);
            }
        });

        // Insert the new player into the SQLite database
        db.run(`INSERT INTO players(id, name, category) VALUES(?, ?, ?)`, [playerId, name, category], function(err) {
            if (err) {
                return console.log(err.message);
            }
            console.log(`Player added to database ${this.lastID}`);
        });

        // Return the new player ID
        return NextResponse.json({ playerId: playerId }, { status: 201 });
    }
    catch (error) {
        console.log("API ERROR", error);
        return NextResponse.json({ error: "API ERROR" }, { status: 500 })
    }
}