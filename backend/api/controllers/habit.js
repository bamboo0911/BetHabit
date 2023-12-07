import UserSchema from "../models/user.js";
import HabitSchema from "../models/habit.js";
import BetSchema from "../models/bet.js";
import mongoose from "mongoose";

import { genericErrorHandler } from "../utils/errors.js";

// GET /habit/:userid
export const getAllHabits = async (req, res) => {
  const { userid } = req.params;

  if (!userid) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const user = await UserSchema.findOne({ userId: userid });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const userHabits = await HabitSchema.find(
      { userId: userid },
      "habitId dueDate status habitTitle createAt"
    );

    res.status(200).json(userHabits);
  } catch (error) {
    genericErrorHandler(error, res);
  }
};

// POST /habit/:userId
export const createHabit = async (req, res) => {
  const { userid } = req.params;
  const { dueDate, habitTitle, bets } = req.body;
  console.log(req.body);

  if (!userid) {
    return res.status(400).json({ error: "User ID is required" });
  }

  const user = await UserSchema.findOne({ userId: userid });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  try {
    // 1. create a Habit
    // 日期處理 (create array for dateCheck)
    let beginDatetime = new Date();
    const endDate = new Date(`${dueDate}`);

    const dateList = [];
    while (beginDatetime <= endDate) {
      // key => date, value => false
      const dateKey = beginDatetime.toISOString().split("T")[0]; // 將日期轉換為 "YYYY-MM-DD" 格式
      dateList.push({ date: dateKey, checked: false });

      // 增加一天
      beginDatetime.setDate(beginDatetime.getDate() + 1);
    }

    const newHabit = {
      habitId: new mongoose.Types.ObjectId(),
      userId: userid,
      createAt: new Date(),
      dueDate: new Date(`${dueDate}`),
      status: "uncheck",
      dateCheck: dateList,
      habitTitle: habitTitle,
    };
    await HabitSchema.create(newHabit);

    // 2. create Bets
    bets.forEach(async (bet) => {
      const newBet = {
        betId: new mongoose.Types.ObjectId(),
        habitId: newHabit.habitId,
        betPartner: bet.betPartner,
        userStake: bet.userStake,
        partnerStake: bet.partnerStake,
      };

      await BetSchema.create(newBet);
    });

    res.status(200).json({ message: "Habit created" });
  } catch (error) {
    genericErrorHandler(error, res);
  }
};

// PUT /habit/dailycheck/:habitid
export const dailyCheckHabit = async (req, res) => {
  const { habitid } = req.params;

  if (!habitid) {
    return res.status(400).json({ error: "Habit Id is required" });
  }

  try {
    const habit = await HabitSchema.findOne({ habitId: habitid });

    if (!habit) {
      return res.status(404).json({ error: "Habit not found" });
    }

    if (habit.status != "uncheck") {
      return res.status(400).json({ error: 'Status is not "uncheck"' });
    }

    const currentDate = new Date().toISOString().split("T")[0];
    // 在 habit.dateCheck 中查詢今天
    const foundIndex = habit.dateCheck.findIndex(
      (entry) => entry.date === currentDate
    );

    if (foundIndex !== -1) {
      habit.dateCheck[foundIndex].checked = true;
    }
    habit.status = "checked";
    await habit.save();

    res.status(200).json({ message: `Checked ${currentDate}` });
  } catch (error) {
    genericErrorHandler(error, res);
  }
};

// PUT /habit/close/:habitid
export const closeHabit = async (req, res) => {
  const { habitid } = req.params;

  if (!habitid) {
    return res.status(400).json({ error: "Habit Id is required" });
  }

  try {
    const habit = await HabitSchema.findOne({ habitId: habitid });

    if (!habit) {
      return res.status(404).json({ error: "Habit not found" });
    }

    if (habit.status === "due") {
      // 判斷勝負
      let habitSuccess = "win";
      const checkedValues = habit.dateCheck.map((item) => item.checked);

      if (checkedValues.some((value) => value === false)) {
        habitSuccess = "lose";
      }

      habit.status = habitSuccess;
      await habit.save();
    } else {
      return res.status(400).json({ error: "Status is not 'due'" });
    }

    res.status(200).json(habit.status);
  } catch (error) {
    genericErrorHandler(error, res);
  }
};

// GET /habit/share/:habitid
export const shareHabit = async (req, res) => {
  const { habitid } = req.params;

  if (!habitid) {
    return res.status(400).json({ error: "Habit Id is required" });
  }

  try {
    const habit = await HabitSchema.findOne({ habitId: habitid });

    if (!habit) {
      return res.status(404).json({ error: "Habit not found" });
    }

    const user = await UserSchema.findOne({ userId: habit.userId });
    const bets = await BetSchema.find({ habitId: habitid });

    const shareInfo = {
      userName: user.userName,
      habitTitle: habit.habitTitle,
      status: habit.status,
      dueDate: habit.dueDate,
      bets: bets.map((bet) => ({
        betPartner: bet.betPartner,
        userStake: bet.userStake,
        partnerStake: bet.partnerStake,
      })),
    };

    res.status(200).json(shareInfo);
  } catch (error) {
    genericErrorHandler(error, res);
  }
};
