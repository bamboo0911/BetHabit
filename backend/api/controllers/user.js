import UserSchema from "../models/user.js";
import mongoose from "mongoose";

import { genericErrorHandler } from "../utils/errors.js";

// POST /user/clerkCreate
export const clerkCreate = async(req, res) => {
  const data = req.body.data;
  const userId = data.id
  const userName = data.username
  const lastLoginTime = data.last_sign_in_at

  try {
    // Check if user already exists
    const existingUser = await UserSchema.findOne({ userId: userId });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const newUser = {
      userId: userId,
      userName: userName,
      lastLoginTime: lastLoginTime,
      saysayPoint: 200,
    };

    await UserSchema.create(newUser);

    res.status(200).json(newUser);
  } catch (error) {
    genericErrorHandler(error, res);
  }
}

// POST /user/:userid
export const postUser = async (req, res) => {
  const { userid } = req.params;
  const { userName } = req.body;

  if (!userid) {
    return res.status(400).json({ error: "User ID is required" });
  }

  if (!userName) {
    return res.status(400).json({ error: "Username is required" });
  }

  try {
    // Check if user already exists
    const existingUser = await UserSchema.findOne({ userId: userid });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const newUser = {
      userId: userid,
      userName: userName,
      lastLoginTime: new Date(),
      saysayPoint: 200,
    };

    await UserSchema.create(newUser);

    res.status(200).json(newUser);
  } catch (error) {
    genericErrorHandler(error, res);
  }
};

// GET /user/:userid
export const getUser = async (req, res) => {
  const { userid } = req.params;

  if (!userid) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const user = await UserSchema.findOne({ userId: userid });

    if (!user) {
      return res.status(404).json({ error: "User not found"});
    }

    const userData = {userName: user.userName, saysayPoint: user.saysayPoint};

    res.status(200).json(userData);
  } catch (error) {
    genericErrorHandler(error, res);
  }
};
