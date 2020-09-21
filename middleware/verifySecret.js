"use strict";

const { workspaceModel } = require("../model");
const APIError = require("../utils/APIError/APIError");
const { BAD_REQUEST } = require("../utils/constants");

module.exports = () => async (req, res, next) => {
  const secret = req.header("APP_SECRET");
  try {
    const data = await workspaceModel.findOne({ sdkSecret: secret });
    if (!data) {
      throw new APIError({
        message: "APP_SECRET not verified",
        status: BAD_REQUEST,
      });
    } else {
      req.claims = { workspaceId: data._id };
      next();
    }
  } catch (err) {
    next(err);
  }
};
