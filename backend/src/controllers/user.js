import UserSchema from "../models/user.js";
import mongoose from "mongoose";

import { genericErrorHandler } from "../utils/errors.js";

// POST /user/:userid
export const postUser = async (req, res) => {
  const { userid } = req.params;
  const { userName } = req.body;

  if (!userid) {
    return res.status(400).json({ error: "User ID is required" });
  }

  if (!userName) {
    return res.status(400).json({ error: 'Username is required' });
  }

  try {
    const newUser = {
      userId: userid,
      userName: userName,
      lastLoginTime: new Date(),
    }

    await UserSchema.create(newUser);

    res.status(200).json(newUser);
  } catch (error) {
    genericErrorHandler(error, res);
  }
};
