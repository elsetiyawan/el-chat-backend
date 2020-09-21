"use strict";

const jwt = require("jsonwebtoken");

const { jwtSecret } = require("../config/env");

module.exports = (permissionRequired) => (req, res, next) => {
  let token = req.header("Authorization");
  // console.log(token);
  if (token && token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);

    jwt.verify(token, jwtSecret, (err, claims) => {
      if (err) {
        return res.status(401).send("Authorization token not valid");
      } else {
        req.claims = claims;
        next();
      }
    });
  } else {
    res.status(401).send("Authorization token is not supplied");
  }
};
