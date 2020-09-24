"use strict";

const { validate } = require("express-validation");
const { createRoomController } = require("../api/room/controller");
const { createRoomValidation } = require("../api/room/validation");
const verifySecret = require("../middleware/verifySecret");

const roomRouter = require("express").Router();

/**
 * @swagger
 * /v1/rooms:
 *  post:
 *    security:
 *      - ApiKeyAuth: []
 *    tags:
 *      - rooms
 *    summary: create room
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              roomName:
 *                type: string
 *                required: true
 *              creator:
 *                type: string
 *                required: true
 *              participants:
 *                type: array
 *                items:
 *                  type: string
 *    responses:
 *      '200':
 *         description: login or register user
 */
roomRouter.post(
  "/",
  verifySecret(),
  validate(createRoomValidation, {}, { abortEarly: false }),
  createRoomController
);

module.exports = roomRouter;
