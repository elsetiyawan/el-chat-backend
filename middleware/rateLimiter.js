"use strict";

const RateLimiter = require("express-rate-limit");
const { RateLimitHandler } = require("./error");
const { rateLimitTime, rateLimitRequest } = require("../config/env");

module.exports = () => {
  return new RateLimiter({
    windowMs: rateLimitTime * 60 * 1000, // 15 minutes
    max: rateLimitRequest, // limit each ip to 30 request per windows
    delayMs: 0,
    handler: RateLimitHandler,
  });
};
