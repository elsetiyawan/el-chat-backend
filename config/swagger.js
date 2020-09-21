"use strict";

const swaggerJsDoc = require("swagger-jsdoc");

const swaggerOptions = {
  explorer: true,
  swaggerDefinition: {
    openapi: "3.0.1",
    info: {
      title: "eL API",
      description: "eL API Information",
      contact: {
        name: "eL Setiyawan",
      },
      servers: ["http://localhost:5000"],
    },
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "APP_SECRET",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["app.js", "routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;
