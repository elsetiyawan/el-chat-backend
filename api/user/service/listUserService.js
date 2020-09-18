"use strict";

const { userModel } = require("../../../model");

module.exports = async (query) => {
  const q = query.q;
  const page = query._page ? query._page : 1;
  const limit = query._limit ? query._limit : 10;

  // create query
  let dbQuery = {};
  if (q) {
    dbQuery = {
      $or: [
        { code: { $regex: q, $options: "i" } },
        { name: { $regex: q, $options: "i" } },
      ],
    };
  }

  return await userModel.paginate(dbQuery, { page, limit });
};
