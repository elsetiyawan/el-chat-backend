"use strict";

const { listUserController } = require("../api/user/controller");
const verifyToken = require("../middleware/verifyToken");

const userRouter = require("express").Router();

/**
 * @swagger
 * /v1/users:
 *  get:
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
 *    - name: _order
 *      in : query
 *      description: field to order
 *      required: false
 *      schema:
 *        type: string
 *    - name: _sort
 *      in : query
 *      description: sorting
 *      required: false
 *      schema:
 *        type: string
 *        enum:
 *        - asc
 *        - desc
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
userRouter.get("/", verifyToken(), listUserController);

module.exports = userRouter;
