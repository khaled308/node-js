const http = require("http");
const url = require("url");
const path = require("path");
const express = require("express");
const { v4: uuid } = require("uuid");
const { Server } = require("socket.io");
const { ExpressPeerServer } = require("peer");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const peerServer = ExpressPeerServer(server, {
  debug: true,
});

// middleware
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// routes
app.get("/join", (req, res) => {
  res.redirect(
    url.format({
      pathname: `/join/${uuid()}`,
      query: req.query,
    })
  );
});

app.get("/join/:roomId", (req, res) => {
  res.render("room", {
    roomId: req.params.roomId,
    username: req.query.username,
  });
});

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, username) => {
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("user-connected", username);

    socket.on("disconnect", () => {
      socket.to(roomId).broadcast.emit("user-disconnected", username);
    });
  });
});

server.listen(process.env.PORT || 8000);
