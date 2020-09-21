"use strict";

const { userModel } = require("../../../model");
const {
  INVALID_CREDENTIALS,
  UNAUTHORIZED,
} = require("../../../utils/constants");
const { generateJwt } = require("../../../utils/helper");
const bcrypt = require("bcryptjs");
const APIError = require("../../../utils/APIError");

module.exports = async (data) => {
  const username = data.username;
  const password = data.password;

  const loginData = await userModel.findOne({ username }).select("+password");
  console.log(loginData);
  if (!loginData)
    throw new APIError({ message: INVALID_CREDENTIALS, status: UNAUTHORIZED });

  if (!(await _isPasswordMatch(password, loginData.password)))
    throw new APIError({ message: "INVALID_CREDENTIALS", status: UNAUTHORIZED });

  const accessToken = generateJwt({
    _id: loginData._id,
    email: loginData.email,
    username: loginData.username,
    name: loginData.name,
  });

  const refreshToken = generateJwt(
    {
      _id: loginData._id,
    },
    10080
  );

  return {
    _id: loginData._id,
    name: loginData.name,
    username: loginData.username,
    email: loginData.email,
    accessToken,
    refreshToken,
  };
};

/**
 *
 * @param {string} loginPassword
 * @param {string} userPassword
 */
const _isPasswordMatch = async (loginPassword, userPassword) => {
  return await bcrypt.compare(loginPassword, userPassword);
};
