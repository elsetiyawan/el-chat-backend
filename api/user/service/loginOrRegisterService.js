"use strict";

const mongoose = require("mongoose");
const { userModel } = require("../../../model");

module.exports = async (
  { userId, username, name, avatar = null },
  _workspaceId
) => {
  const userData = await userModel.findOne({
    _id: mongoose.Types.ObjectId(userId),
    username,
    _workspaceId,
  });

  if (userData) {
    return userData;
  } else {
    const newUser = new userModel({
      _id: mongoose.Types.ObjectId(userId),
      username,
      name,
      avatar,
      _workspaceId,
    });
    return await newUser.save();
  }
};
