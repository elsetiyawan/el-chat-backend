"use strict";

const { OK } = require("../../../utils/constants");
const { readUserService } = require("../service");

module.exports = async (req, res, next) => {
  const { params, claims } = req;
  try {
    const readUser = await readUserService(params.userId, claims.workspaceId);
    res.status(OK).json(readUser);
  } catch (err) {
    next(err);
  }
};
