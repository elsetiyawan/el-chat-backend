"use strict";

const {
  loginUserController,
  createUserController,
} = require("../api/user/controller");

const authRouter = require("express").Router();

/**
 * @swagger
 * /v1/auth/login:
 *  post:
 *    tags:
 *      - auth
 *    summary: register users
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *                required: true
 *              password:
 *                type: string
 *                required: true
 *    responses:
 *      '200':
 *         description: all users
 */
authRouter.post("/login", loginUserController);

/**
 * @swagger
 * /v1/auth/register:
 *  post:
 *    tags:
 *      - auth
 *    summary: register users
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                required: true
 *              username:
 *                type: string
 *                required: true
 *              name:
 *                type: string
 *                required: true
 *              password:
 *                type: string
 *                required: true
 *    responses:
 *      '200':
 *         description: all users
 */
authRouter.post("/register", createUserController);
module.exports = authRouter;
