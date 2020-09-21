"use strict";

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const workspaceModel = require("../model/workspaceModel");
const uuid = require("uuid");

dotenv.config();
const mongooUri =
  process.env.NODE_ENV === "production"
    ? process.env.MONGO_URI
    : process.env.MONGO_URI_DEV;

mongoose.connect(
  mongooUri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  () => console.log("Database is connected")
);

const workspaceData = new workspaceModel({
  workspace: "KlinikKoding",
  sdkSecret: uuid.v4(),
});

workspaceData.save();
