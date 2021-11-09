const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

//socket.io cheats:
//CLIENT:
//Send event to server use: socket.emit
//Take event from server use: socket.on
//SERVER:
//Send event to client use: io
//Send to every client use: io.emit
//Send to one client use: io.to(socketID).emit
//Take event from client use: socket.on


let users = []

//to make sure to add one user with its socketId just once
const addUser = (userId, socketId) => {
  !users.some(user => user.userId === userId) &&
    users.push((userId, socketId))
}

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //when connect
  console.log("a user connected.")
  io.emit('welcome', 'hello this is socket server')
  //take userId and socketId from user
  socket.on("addUser", userId => {
    addUser(userId, socket.id)
    console.log("New users userId:", userId)
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });


  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });


})

