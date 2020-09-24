"use strict";

const router = require("express").Router();

router.use("/users", require("./userRouter"));
router.use("/rooms", require("./roomRouter"));

module.exports = router;
