import { IncomingMessage } from 'http';
import WebSocket from 'ws';

const wss = new WebSocket.Server({ port: 8080 });

// Map of player IDs to WebSocket connections
export const playerConnections = new Map<number, WebSocket>();

wss.on('connection', (ws: WebSocket, req: IncomingMessage) => {
    const playerId = parseInt(req.url?.substring(1) || '0'); // Get player ID from URL
    playerConnections.set(playerId, ws);

    ws.on('close', () => {
        playerConnections.delete(playerId); // Remove connection from map when it's closed
    });

    ws.on('message', (message: string) => {
        console.log('Received: %s', message);
    });

    ws.send('Welcome!');
});

export default wss;