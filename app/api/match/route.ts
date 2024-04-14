import { NextResponse } from "next/server";
import { playerConnections } from '../../webSocketServer';
import { WebSocket } from 'ws';

// This could be a database or cache in a distributed application
let queue : number[] = [];

export async function POST(req: Request){
    try {
        const body = await req.json();
        const opponentId = queue.shift();
        const playerId = body.playerId; // Add this line to declare playerId
        // Notify the opponent that the match is starting
        const opponentWs = findWebSocketConnectionByPlayerId(opponentId as number);
        if (opponentWs) {
            opponentWs.send(JSON.stringify({ message: "Match starting", opponentId: playerId }));
            return NextResponse.json({ message: "Match starting", opponentId: opponentId });
        }
        return NextResponse.json({ message: "Waiting for a match" });
    }
    catch (error) {
        console.log("API ERROR", error);
        return NextResponse.json({ error: "API ERROR" }, { status: 500 })
    }
}

function findWebSocketConnectionByPlayerId(playerId: number): WebSocket | undefined {
    return playerConnections.get(playerId);
}