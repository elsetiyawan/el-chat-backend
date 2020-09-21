"use strict";

const { userModel } = require("../../../model");
const { BAD_REQUEST } = require("../../../utils/constants");
const APIError = require("../../../utils/APIError");
module.exports = async (data) => {
  // check email
  if (await _isEmailExist(data.email)) {
    throw new APIError({
      message: "Email has been registered",
      status: BAD_REQUEST,
    });
  }

  //   check username
  if (await _isUsernameExist(data.username)) {
    throw new APIError({
      message: "Username has been registered",
      status: BAD_REQUEST,
    });
  }

  const userToCreate = new userModel(data);
  return userToCreate.save();
};

const _isEmailExist = async (email) => {
  return await userModel.findOne({ email });
};

const _isUsernameExist = async (username) => {
  return await userModel.findOne({ username });
};
