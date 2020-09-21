"use strict";

const http = require("http");
const { port } = require("./config/env");
const app = require("./config/express");
const { Connect } = require("./config/mongoose");
const socketIo = require("./utils/Socket/Socket");
const server = http.createServer(app);

server.listen(port);

socketIo.listen(server);

server.on("listening", () => {
  Connect();
  console.log("Server is up and listening on port : " + port);
});

module.exports = server;
