"use strict";

const { Types } = require("mongoose");
const { userModel } = require("../../../model");
const {
  validateMongooseId,
} = require("../../../utils/mongooseHelper/mongooseHelper");

module.exports = async (userId, workspaceId) => {
  await validateMongooseId(userId);

  const user = await userModel
    .aggregate([
      {
        $match: {
          $and: [{ _id: Types.ObjectId(userId) }],
        },
      },
      {
        $lookup: {
          from: "t_rooms",
          as: "rooms",
          pipeline: [
            {
              $match: {
                $and: [
                  { participants: { $in: [Types.ObjectId(userId)] } },
                  { active: true },
                ],
              },
            },
          ],
        },
      },
      {
        $project: {
          _id: 1,
          username: 1,
          name: 1,
          avatar: 1,
          rooms: { _id: 1, roomName: 1 },
        },
      },
    ])
    .exec();

  return user[0];
};
