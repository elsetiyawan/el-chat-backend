"use strict";

const { OK } = require("../../../utils/constants");
const { readRoomService } = require("../service");

module.exports = async (req, res, next) => {
  const { params, claims } = req;
  try {
    const readRoom = await readRoomService(params.roomId, claims.workspaceId);
    res.status(OK).json(readRoom);
  } catch (err) {
    next(err);
  }
};
