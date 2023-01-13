require("dotenv").config();
const path = require("path");
const http = require("http");
const express = require("express");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, "public")));

const rooms = [
  {
    name: "global",
    createdBy: "anonymous",
  },

  {
    name: "players",
    createdBy: "anonymous",
  },
];

io.on("connection", (socket) => {
  socket.emit("getUser");

  socket.on("createUser", (username) => {
    socket.username = username;
    socket.currentRoom = "global";

    socket.join(socket.currentRoom);
    socket.emit("updateChat", "INFO", "You have joined global chat");
    socket.broadcast
      .to(socket.currentRoom)
      .emit("updateChat", "INFO", `${socket.username} join to chat`);
  });

  socket.on("sendMessage", (message) => {
    io.sockets
      .to(socket.currentRoom)
      .emit("updateChat", socket.username, message);
  });

  socket.on("updateCurrentRoom", (room) => {
    socket.broadcast
      .to(socket.currentRoom)
      .emit("updateChat", "INFO", `${socket.username} left chat`);

    socket.leave(socket.currentRoom);
    socket.currentRoom = room;
    socket.join(socket.currentRoom);
    socket.emit("updateChat", "INFO", `You have joined ${room} chat`);
    socket.broadcast
      .to(socket.currentRoom)
      .emit("updateChat", "INFO", `${socket.username} join to chat`);
  });

  socket.on("createRoom", (room) => {
    rooms.push({
      name: room,
      createdBy: socket.username,
    });

    io.emit("displayRooms", rooms);
  });

  io.emit("displayRooms", rooms);
});

// run server
server.listen(process.env.PORT || 8000);
