"use strict";

const { userModel } = require("../../../model");

module.exports = async ({ userId, name, avatar = null }, _workspaceId) => {
  const userData = await userModel.findOne({ userId, _workspaceId });

  if (userData) {
    return userData;
  } else {
    const newUser = new userModel({ userId, name, avatar, _workspaceId });
    return await newUser.save();
  }
};
