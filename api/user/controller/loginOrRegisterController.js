"use strict";

const { CREATED } = require("../../../utils/constants");
const { loginOrRegisterService } = require("../service");

module.exports = async (req, res, next) => {
  const { body, claims } = req;
  try {
    const userData = await loginOrRegisterService(body, claims.workspaceId);
    res.status(CREATED).json(userData);
  } catch (err) {
    next(err);
  }
};
