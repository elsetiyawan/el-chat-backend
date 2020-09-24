"use strict";

const socketio = require("socket.io");
const { readUserService } = require("../../api/user/service");
const { Types } = require("mongoose");
const { chatModel, userModel } = require("../../model");

let users = [];
module.exports = class SocketIo {
  constructor() {
    this._io = null;
  }

  static listen(app) {
    this._io = socketio.listen(app);

    this._io.on("connect", _onConnect);

    return this._io;
  }

  static broadcast() {
    this._io.emit("notification");
  }
};

const _onConnect = (socket) => {
  socket.on("disconnect", () => {
    socket.disconnect();
    const newUsers = users.filter((user) => {
      return user.socketId !== socket.id;
    });
    users = newUsers;
  });

  socket.on("login", async ({ userId }) => {
    const user = await readUserService(userId);
    if (user) {
      const socketId = socket.id;
      users.push({
        socketId,
        userId: Types.ObjectId(user._id).toString(),
        name: user.name,
      });
      for (let i = 0; i < user.rooms.length; i++) {
        await socket.join(Types.ObjectId(user.rooms[i]._id).toString());
      }
      socket.emit("auth", "login success");
    } else {
      socket.emit("auth", "login failed");
    }
  });

  socket.on("chat", async ({ room, message }) => {
    const user = users.find((user) => user.socketId === socket.id);
    const formatMsg = await formatMessage(socket.id, message);
    socket.to(room).emit("message", formatMsg);
    recordChat(room, user.userId, message);
  });

  socket.on("privateChat", async ({ userId, message }) => {
    const user = users.find((user) => user.userId === userId);
    const from = users.find((user) => user.socketId === socket.id);
    socket.to(user.socketId).emit("message", message);
    recordChat(user.socketId, from.userId, message);
  });
};

const recordChat = (room, from, message) => {
  const chat = new chatModel({
    _roomId: Types.ObjectId(room),
    _from: Types.ObjectId(from),
    message,
  });

  chat.save();
};

const formatMessage = async (from, message) => {
  const fromUser = users.find((user) => user.socketId === from);
  const userData = await userModel
    .findById(fromUser.userId)
    .select(["_id", "name", "username", "avatar"]);

  return { from: userData, message, sentOn: new Date() };
};
