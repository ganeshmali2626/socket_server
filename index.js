const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);

// Create a Socket.io instance with CORS configuration
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:4200', // Replace with the actual origin of your Angular app
    methods: ['GET', 'POST'],
  },
});

// Handle WebSocket connections
io.on('connection', (socket) => {
    console.log('User connected');
    // Listen for 'client-action' events from the client
    socket.on('client-action', (data) => {
      // Process the data (e.g., echo it back)
      const responseData = `Server received: ${data}`;
  
      // Emit a response event to send data back to the client
      socket.emit('server-response', data);
    });
    // Listen for disconnection events
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
  
// Start the HTTP server and listen on port 3000
server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
