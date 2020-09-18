"use strict";

const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpirationInterval: process.env.JWT_EXPIRATION_MINUTES,
  mongo: {
    uri:
      process.env.NODE_ENV === "production"
        ? process.env.MONGO_URI
        : process.env.MONGO_URI_DEV,
    options: {
      keepAlive: 1000,
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
  },
  rateLimitTime: process.env.RATE_LIMIT_TIME,
  rateLimitRequest: process.env.RATE_LIMIT_REQUEST,
  salt: process.env.SALT,
  feUri:
    process.env.NODE_ENV === "production"
      ? process.env.FE_URL
      : process.env.FE_URL_DEV,
};
