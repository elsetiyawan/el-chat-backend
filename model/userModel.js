"use strict";

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { salt } = require("../config/env");
const uniqueValidator = require("mongoose-unique-validator");
const mongooseDelete = require("mongoose-delete");
const mongoosePaginate = require("mongoose-paginate-v2");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const mongooseHistory = require("mongoose-document-log");
const workspaceModel = require("./workspaceModel");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, max: 150 },
    name: { type: String, max: 150 },
    avatar: { type: String },
    _workspaceId: {
      type: Schema.Types.ObjectId,
      ref: workspaceModel,
      select: false,
    },
  },
  { timestamps: true }
);

// bcrype password in save and update
userSchema.pre("save", async function save(next) {
  try {
    if (!this.isModified("password")) return next();
    const hash = await bcrypt.hash(this.password, Number(salt));
    this.password = hash;
  } catch (err) {
    return next(err);
  }
});

userSchema.pre("findOneAndUpdate", async function findOneAndUpdate(next) {
  try {
    if (!this._update.password) return next();
    const hash = await bcrypt.hash(this._update.password, Number(salt));
    this._update.password = hash;
  } catch (err) {
    return next(err);
  }
});

// mongoose history
userSchema.plugin(mongooseHistory);

// unique validator
userSchema.plugin(uniqueValidator);

// pagination
userSchema.plugin(mongoosePaginate);

// pagination
userSchema.plugin(aggregatePaginate);

// soft deletes
userSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

module.exports = mongoose.model("m_users", userSchema);
