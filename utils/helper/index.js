const jwt = require("jsonwebtoken");
const moment = require("moment");
const { jwtSecret, jwtExpirationInterval } = require("../../config/env");
const mongoose = require("mongoose");
const APIError = require("../APIError/APIError");
const { VALIDATION_ERROR, BAD_REQUEST } = require("../constants");

/**
 *
 * @param {object} data
 * @param {number} validity in minutes
 */
exports.generateJwt = (data, validity = jwtExpirationInterval) => {
  const payload = {
    ...data,
    iat: moment().unix(),
    exp: moment().add(validity, "minutes").unix(),
  };
  return jwt.sign(payload, jwtSecret);
};

/**
 *
 * @param {string} mongooseId
 * @param {string} fieldName
 */
exports.validateMongooseId = (mongooseId, fieldName = null) => {
  if (!mongoose.Types.ObjectId.isValid(mongooseId))
    throw new APIError({
      message: fieldName ? `${fieldName} is invalid` : VALIDATION_ERROR,
      status: BAD_REQUEST,
    });
};
