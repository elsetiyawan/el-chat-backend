"use strict";

const { validate } = require("express-validation");
const {
  createRoomController,
  readRoomController,
} = require("../api/room/controller");
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

/**
 * @swagger
 * /v1/rooms/{roomId}:
 *  get:
 *    security:
 *      - ApiKeyAuth: []
 *    tags:
 *      - rooms
 *    summary: read room
 *    parameters:
 *    - name: roomId
 *      in: path
 *      description: roomId to read
 *      required: true
 *      schema:
 *        type: string
 *    responses:
 *      '200':
 *         description: room detail
 */
roomRouter.get("/:roomId", verifySecret(), readRoomController);

module.exports = roomRouter;
