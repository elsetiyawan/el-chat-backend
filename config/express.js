"use strict";

const express = require("express");
const compress = require("compression");
const cors = require("cors");
const helmet = require("helmet");
const swaggerUi = require("swagger-ui-express");

const { NotFound, ConvertError, ErrorHandler } = require("../middleware/error");
const rateLimiter = require("../middleware/rateLimiter");
const swaggerDocs = require("./swagger");

const { env } = require("./env");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// compression request
app.use(compress());

// secure apps
app.use(helmet());

// enable cors
app.use(cors());

// rate limiter
app.use(rateLimiter());

env === "development" &&
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// routing
app.get("/test", (req, res) => {
  res.status(200).send("OK");
});

app.use("/v1", require("../routes"));

// if error is not an instance of API Error, convert it
app.use(ConvertError);

// Catch 404
app.use(NotFound);

// error handler, send stacktrace only during development
app.use(ErrorHandler);

module.exports = app;
