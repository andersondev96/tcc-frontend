const io = require("socket.io-client");

const socket = io("http://localhost:3333");
let idChatRoom = "";

function onLoad() {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get("name");
    const email = urlParams.get("email");
    const telephone = urlParams.get("telephone");

    document.querySelector(".user_logged").innerHTML += `
    <img
      class="avatar_user_logged"
      src="https://avatars.githubusercontent.com/u/20424197?v=4"
    />
    <strong id="user_logged">${name}</strong>
  `;

    socket.emit("start", {
        telephone,
        email,
    });

    socket.on("new_connection", (connection) => {
        const existInDiv = document.getElementById(`user_${connection.id}`);

        if (!existInDiv) {
            addConnection(connection);
        }
    });

    socket.emit("get_connections", (connections) => {
        connections.map((connection) => {
            if (connection.user.email !== email) {
                addConnection(connection);
            }
        });
    });

    socket.on("message", (data) => {
        console.log(data);
        if (data.message.chatroom_id === idChatRoom) {
            addMessage(data);
        }
    });
}

function addMessage(data) {
    const divMessageUser = document.getElementById("message_user");

    console.log(data.message.createdAt);

    divMessageUser.innerHTML += `
    <span class="user_name user_name_date">
    <img
      class="img_user"
      src=${
          data.connection.user.avatar ||
          "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=785&q=80"
      }
    />
    <strong>${data.message.name} &nbsp;</strong>
    <span> ${dayjs(data.message.createdAt).format(
        "DD/MM/YYYY HH:mm"
    )}</span></span
  >
  <div class="messages">
    <span class="chat_message">${data.message.text}</span>
  </div>
  `;
}

function addConnection(connection) {
    const usersList = document.getElementById("users_list");
    usersList.innerHTML += `
    <li
      class="user_name_list"
      id="user_${connection.id}"
      idUser="${connection.id}"
    >
      <img
        class="nav_avatar"
        src="https://avatars.githubusercontent.com/u/20424197?v=4"
      />
      ${connection.user.name}
  </li>
  `;
}

document.getElementById("users_list").addEventListener("click", (event) => {
    if (event.target && event.target.matches("li.user_name_list")) {
        const idUser = event.target.getAttribute("idUser");

        socket.emit("start_chat", { idUser }, (response) => {
            idChatRoom = response.room.id;

            response.messages.forEach((message) => {
                const data = {
                    message,
                    connection: message.connection,
                };

                addMessage(data);
            });
        });
    }
});

document.getElementById("user_message").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const message = e.target.value;

        e.target.value = "";

        const data = {
            message,
            idChatRoom,
        };

        socket.emit("message", data);
    }
});

onLoad();
