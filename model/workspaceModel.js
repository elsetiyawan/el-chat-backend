"use strict";

const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const mongooseDelete = require("mongoose-delete");
const mongoosePaginate = require("mongoose-paginate-v2");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const mongooseHistory = require("mongoose-document-log");

const workspaceSchema = new mongoose.Schema(
  {
    workspace: { type: String, required: true, unique: true, max: 150 },
    sdkSecret: { type: String },
  },
  { timestamps: true }
);

// mongoose history
workspaceSchema.plugin(mongooseHistory);

// unique validator
workspaceSchema.plugin(uniqueValidator);

// pagination
workspaceSchema.plugin(mongoosePaginate);

// pagination
workspaceSchema.plugin(aggregatePaginate);

// soft deletes
workspaceSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

module.exports = mongoose.model("m_workspaces", workspaceSchema);
