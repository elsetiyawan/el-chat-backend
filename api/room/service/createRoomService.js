"use strict";

const mongoose = require("mongoose");
const { roomModel } = require("../../../model");
const APIError = require("../../../utils/APIError/APIError");
const {
  validateMongooseId,
  validateExist,
} = require("../../../utils/mongooseHelper/mongooseHelper");

module.exports = async ({ roomName, participants, creator }, _workspaceId) => {
  await _validateCreator(creator);
  await _validateParticipants(participants);

  const newRoom = new roomModel({
    roomName,
    participants,
    creator,
    _workspaceId,
  });

  return await newRoom.save();
};

const _validateCreator = async (creator) => {
  await validateMongooseId(creator, "creator");
};

const _validateParticipants = async (participants) => {
  for (let x = 0; x < participants.length; x++) {
    await validateMongooseId(participants[x], "participants");
  }
};
