"use strict";

const { OK } = require("../../../utils/constants");
const { listUserService } = require("../service");

module.exports = async (req, res, next) => {
  const { query } = req;
  try {
    const listUser = await listUserService(query);
    res.status(OK).json(listUser);
  } catch (err) {
    next(err);
  }
};
