"use strict";
const mongoose = require("mongoose");
const { userModel } = require("../../model");
const APIError = require("../APIError/APIError");
const { VALIDATION_ERROR, BAD_REQUEST } = require("../constants");

exports.validateMongooseId = async (mongooseId, field = null) => {
  if (!mongoose.Types.ObjectId.isValid(mongooseId))
    throw new APIError({
      message: (field ? field : "Id") + " is invalid : " + VALIDATION_ERROR,
      status: BAD_REQUEST,
    });
};

exports.validateExist = async (mongooseId, type) => {
  const id = mongoose.Types.ObjectId(mongooseId);
  let isExist;

  switch (type) {
    case "user":
      isExist = await userModel.findById(id);
      break;

    default:
      break;
  }

  if (!isExist)
    throw new APIError({ message: "Id not found", status: BAD_REQUEST });
};
