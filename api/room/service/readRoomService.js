"use strict";

const { Types } = require("mongoose");
const { roomModel } = require("../../../model");
const {
  validateMongooseId,
} = require("../../../utils/mongooseHelper/mongooseHelper");

module.exports = async (roomId, _workspaceId) => {
  await validateMongooseId(roomId, "roomId");
  return roomModel
    .findOne({ _id: Types.ObjectId(roomId), _workspaceId })
    .select({
      _workspaceId: 0,
      deleted: 0,
    });
};
