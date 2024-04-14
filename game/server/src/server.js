const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();

const clientPath = `${__dirname}/../../client`;
console.log(`Serving static from ${clientPath}`);

app.use(express.static(clientPath));

const server = http.createServer(app);

const io = socketio(server);

const playerIds = [];
let i = 0;

io.on('connection', (sock) => {
console.log("someone connected")
sock.emit('message',"hello!")
playerIds[i] = i;  //IP adresses?  How to save progress, SQL?
sock.emit('id',playerIds[i])
i++;
sock.on('key', (key) => {
console.log(key)
})
});


server.on('error', (err) => {
  console.error('Server error:', err);
});

server.listen(8080, () => {
  console.log('started on 8080');
  console.log('fdsa');
});
