"use strict";

const { CREATED } = require("../../../utils/constants");
const { createRoomService } = require("../service");

module.exports = async (req, res, next) => {
  const { body, claims } = req;
  try {
    const newRoom = await createRoomService(body, claims.workspaceId);
    res.status(CREATED).json(newRoom);
  } catch (err) {
    next(err);
  }
};
