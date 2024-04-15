const http = require('http');
const express = require('express');

// create express server
const app = express();

// tell express where the client files are
const clientPath = `${__dirname}/../../client`;
app.use(express.static(clientPath));

// create the server
const server = http.createServer(app);

// handle errors
server.on('error', (err) => {
  console.error('Server error:', err);
});

// start the server listening on port 8080
server.listen(8080, () => {
  console.log('started on 8080');
});