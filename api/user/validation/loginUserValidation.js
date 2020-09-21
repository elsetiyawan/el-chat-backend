"use strict";

const Joi = require("@hapi/joi");

module.exports = {
  body: Joi.object({
    username: Joi.string().max(100).required(),
    password: Joi.string().max(100).required(),
  }),
};
