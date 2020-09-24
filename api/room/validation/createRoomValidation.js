"use strict";

const Joi = require("@hapi/joi");

module.exports = {
  body: Joi.object({
    roomName: Joi.string().max(150).required(),
    creator: Joi.string().max(150).required(),
    participants: Joi.array().items(Joi.string().max(150).required()),
  }),
};
