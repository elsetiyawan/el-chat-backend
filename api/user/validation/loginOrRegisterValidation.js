"use strict";

const Joi = require("@hapi/joi");

module.exports = {
  body: Joi.object({
    userId: Joi.string().max(150).required(),
    username: Joi.string().email().max(150).required(),
    name: Joi.string().max(150).required(),
    password: Joi.string().allow(""),
    avatar: Joi.string().allow(""),
  }),
};
