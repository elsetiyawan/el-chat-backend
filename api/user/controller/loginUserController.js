"use strict";

const { OK } = require("../../../utils/constants");
const { loginUserService } = require("../service");

module.exports = async (req, res, next) => {
  const { body } = req;
  try {
    const userLogin = await loginUserService(body);
    res.status(OK).json(userLogin);
  } catch (err) {
    next(err);
  }
};
