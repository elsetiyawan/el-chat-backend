"use strict";

const { OK } = require("../../../utils/constants");
const { listUserService } = require("../service");

module.exports = async (req, res, next) => {
  const { query, claims } = req;
  try {
    const listUser = await listUserService(query, claims);
    res.status(OK).json(listUser);
  } catch (err) {
    next(err);
  }
};
