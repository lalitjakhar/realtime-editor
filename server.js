import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",  // Enable CORS for all origins, adjust if needed
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("join", ({ roomId, username }) => {
    // Join the room
    socket.join(roomId);
    console.log(`${username} joined room ${roomId}`);

    // Get all clients in the room
    const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
      (socketId) => ({
        socketId,
        username: socketId === socket.id ? username : "Anonymous", // Assuming the username is known only for the current client
      })
    );

    // Broadcast the updated list of clients to the room
    clients.forEach(({ socketId }) => {
      io.to(socketId).emit("joined", {
        clients,
        username,
        socketId: socket.id,
      });
    });

    // Notify other clients in the room
    socket.to(roomId).emit("user-joined", {
      username,
      socketId: socket.id,
    });
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
    // Handle disconnect logic (e.g., notify other clients, remove from client list)
  });
});

const PORT = process.env.PORT || 5173;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
