"use strict";

const Joi = require("@hapi/joi");

module.exports = {
  body: Joi.object({
    email: Joi.string().email().max(150).required(),
    name: Joi.string().max(100).required(),
    username: Joi.string().max(100).required(),
    password: Joi.string().max(100).required(),
  }),
};
