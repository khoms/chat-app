const io = require("socket.io")(8000, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let users = [];

const addUser = async (userId, socketId, userInfo) => {
  const checkUser = users.some((u) => u.userId === userId);

  if (!checkUser && userId) {
    await users.push({ userId, socketId, userInfo });
  }
};

const removeUser = async (socketId) => {
  users = users.filter((u) => u.socketId !== socketId);
};

io.on("connection", (socket) => {
  console.log("Socket is connecting ...");

  socket.on("adduser", (userId, userInfo) => {
    addUser(userId, socket.id, userInfo);

    io.emit("getUser", users);
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
    io.emit("getUser", users);
  });
});