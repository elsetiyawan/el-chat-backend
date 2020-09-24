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

const roomSchema = new mongoose.Schema(
  {
    roomName: { type: String, required: true, max: 150 },
    creator: { type: String },
    participants: [{ type: Schema.Types.ObjectId, ref: userModel }],
    _workspaceId: {
      type: Schema.Types.ObjectId,
      ref: workspaceModel,
      select: false,
    },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// mongoose history
roomSchema.plugin(mongooseHistory);

// unique validator
roomSchema.plugin(uniqueValidator);

// pagination
roomSchema.plugin(mongoosePaginate);

// pagination
roomSchema.plugin(aggregatePaginate);

// soft deletes
roomSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

module.exports = mongoose.model("t_rooms", roomSchema);
