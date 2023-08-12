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

const findUser = (id) => {
  return users.find((u) => u.userId === id);
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

  socket.on("sendMessage", (data) => {
    if (!data) {
      return null;
    }
    const user = findUser(data.recieverId);
    if (user !== undefined) {
      socket.to(user.socketId).emit("getMessage", data);
    }
  });

  socket.on("messageSeen", (msg) => {
    const user = findUser(msg.senderId);
    if (user !== undefined) {
      socket.to(user.socketId).emit("messageSeenResponse", msg);
    }
  });

  socket.on("typingMessage", (data) => {
    const user = findUser(data?.recieverId);
    if (user !== undefined) {
      socket.to(user.socketId).emit("typingMessageGet", {
        senderId: data.senderId,
        recieverId: data.recieverId,
        message: data.message,
      });
    }
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
    io.emit("getUser", users);
  });
});
