"use strict";

const socketio = require("socket.io");

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
  console.log("a user connected");
  console.log(socket.id);

  socket.on("disconnect", () => {
    console.log(socket.id);
    socket.disconnect();
  });

  socket.on("login", (data) => {
    console.log(data);
  });
};
