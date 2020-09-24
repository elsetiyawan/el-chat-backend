"use strict";

const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const mongooseDelete = require("mongoose-delete");
const mongoosePaginate = require("mongoose-paginate-v2");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const mongooseHistory = require("mongoose-document-log");
const workspaceModel = require("./workspaceModel");
const userModel = require("./userModel");
const Schema = mongoose.Schema;

const chatSchema = new mongoose.Schema(
  {
    _roomId: { type: Schema.Types.ObjectId },
    _from: { type: Schema.Types.ObjectId },
    message: { type: String },
  },
  { timestamps: true }
);

// mongoose history
chatSchema.plugin(mongooseHistory);

// unique validator
chatSchema.plugin(uniqueValidator);

// pagination
chatSchema.plugin(mongoosePaginate);

// pagination
chatSchema.plugin(aggregatePaginate);

// soft deletes
chatSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

module.exports = mongoose.model("t_chat", chatSchema);
