import { NextResponse } from "next/server";
import { db } from "../../dbSetup";

// function to add a new player to the database
export async function POST(req: Request) {
    try {
        // get vars from the request body
        const body = await req.json();
        const name = body.name;
        const category = body.category;

        // generate a new player id
        let playerId = Math.floor(Math.random() * 1000000);

        // check if the player id already exists
        const row = await new Promise((resolve, reject) => {
            db.get(`SELECT id FROM players WHERE id = ?`, [playerId], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });

        if (row) {
            // if the player id already exists, generate a new one
            playerId = Math.floor(Math.random() * 1000000);
        }

        // add the user to the database
        await new Promise((resolve, reject) => {
            db.run(`INSERT INTO players(id, name, category) VALUES(?, ?, ?)`, [playerId, name, category], function(err) {
                if (err) {
                    reject(err);
                } else {
                    console.log(`Player added to database ${this.lastID}`);
                    resolve(this.lastID);
                }
            });
        });

        // Return the new player id
        return NextResponse.json({ playerId: playerId }, { status: 201 });
    }
    // catch errors
    catch (error) {
        console.log("API ERROR", error);
        return NextResponse.json({ error: "API ERROR" }, { status: 500 })
    }
}