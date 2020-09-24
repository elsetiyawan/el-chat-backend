"use strict";

const { validate } = require("express-validation");
const {
  listUserController,
  loginOrRegisterController,
} = require("../api/user/controller");
const { loginOrRegisterValidation } = require("../api/user/validation");
const verifySecret = require("../middleware/verifySecret");

const userRouter = require("express").Router();

/**
 * @swagger
 * /v1/users/login-or-register:
 *  post:
 *    security:
 *      - ApiKeyAuth: []
 *    tags:
 *      - users
 *    summary: register users
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              userId:
 *                type: string
 *                required: true
 *              username:
 *                type: string
 *                required: true
 *              name:
 *                type: string
 *              password:
 *                type: string
 *              avatar:
 *                type: string
 *    responses:
 *      '200':
 *         description: login or register user
 */
userRouter.post(
  "/login-or-register",
  verifySecret(),
  validate(loginOrRegisterValidation, {}, { abortEarly: false }),
  loginOrRegisterController
);

/**
 * @swagger
 * /v1/users:
 *  get:
 *    security:
 *      - ApiKeyAuth: []
 *    tags:
 *      - users
 *    summary: list of all users registered
 *    parameters:
 *    - name: q
 *      in : query
 *      description: query key
 *      required: false
 *      schema:
 *        type: string
 *    - name: _page
 *      in : query
 *      description: page
 *      required: false
 *      schema:
 *        type: string
 *    - name: _limit
 *      in : query
 *      description: limit data per page
 *      required: false
 *      schema:
 *        type: string
 *    responses:
 *      '200':
 *         description: all users
 */
userRouter.get("/", verifySecret(), listUserController);

module.exports = userRouter;
