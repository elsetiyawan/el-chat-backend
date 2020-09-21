"use strict";

const { CREATED } = require("../../../utils/constants");
const { createUserService } = require("../service");

module.exports = async (req, res, next) => {
  const { body } = req;
  try {
    const createUser = await createUserService(body);
    res.status(CREATED).json(createUser);
  } catch (err) {
    next(err);
  }
};
