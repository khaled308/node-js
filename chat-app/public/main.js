const sendMessageBtn = document.getElementById("send_message_btn");
const createRoomBtn = document.getElementById("room_add_icon_holder");
const messageInput = document.getElementById("messageInput");
const roomInput = document.getElementById("roomInput");
const chatArea = document.getElementById("chat");
const roomList = document.getElementById("active_rooms_list");
const usersList = document.getElementById("active_users_list");

const socket = io();

let currentUser;
let allRooms;
let currentRoom = "global";

socket.on("getUser", () => {
  currentUser = prompt("Enter Your name");

  socket.emit("createUser", currentUser);
});

socket.on("updateChat", (username, data) => {
  if (username === "INFO") {
    chatArea.innerHTML += `<div class="announcement"><span>${data}</span></div>`;
  } else {
    chatArea.innerHTML += `<div class="message_holder ${
      username === currentUser ? "me" : ""
    }">
                                <div class="pic"></div>
                                <div class="message_box">
                                  <div id="message" class="message">
                                    <span class="message_name">${username}</span>
                                    <span class="message_text">${data}</span>
                                  </div>
                                </div>
                              </div>`;
  }

  chatArea.scrollTop = chatArea.scrollHeight;
});

socket.on("displayRooms", (rooms) => {
  allRooms = rooms;
  roomList.innerHTML = "";
  let html = "";

  for (let room of rooms) {
    html += `
    <div class="room_card" id="${room.name}" onclick="changeRoom('${room.name}')">
      <div class="room_item_content">
          <div class="pic"></div>
          <div class="roomInfo">
          <span class="room_name">#${room.name}</span>
          <span class="room_author">${room.createdBy}</span>
          </div>
      </div>
    </div>
    `;
  }

  roomList.insertAdjacentHTML("beforeend", html);
  document.getElementById(currentRoom).classList.add("active_item");
});

sendMessageBtn.addEventListener("click", () => {
  const message = messageInput.value;
  socket.emit("sendMessage", message);
  messageInput.value = "";
  messageInput.focus();
});

function changeRoom(room) {
  if (room != currentRoom) {
    chatArea.innerHTML = "";
    document.getElementById(currentRoom).classList.remove("active_item");
    currentRoom = room;
    document.getElementById(currentRoom).classList.add("active_item");
    socket.emit("updateCurrentRoom", room);
  }
}

createRoomBtn.addEventListener("click", () => {
  if (roomInput.value.trim()) {
    socket.emit("createRoom", roomInput.value);
  }
});
