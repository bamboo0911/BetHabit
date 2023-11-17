import UserSchema from "../models/user.js";
import HabitSchema from "../models/habit.js";
import BetSchema from "../models/bet.js";
import mongoose from "mongoose";

import { genericErrorHandler } from "../utils/errors.js";

// GET /habit/:userid
export const getHabit = async (req, res) => {
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
      "habitId betId dueDate status habitTitle createAt dateCheck"
    );

    res.status(200).json(userHabits);
  } catch (error) {
    genericErrorHandler(error, res);
  }
};

// POST /habit/:userId
export const postHabit = async (req, res) => {
  const { userid } = req.params;
  const { dueDate, habitTitle, stake, betPartner } = req.body;
  console.log(req.body);

  if (!userid) {
    return res.status(400).json({ error: "User ID is required" });
  }

  const user = await UserSchema.findOne({ userId: userid });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  try {
    // create a Bet
    const betId = new mongoose.Types.ObjectId();
    const newBet = new BetSchema({
      betId: betId,
      userId: userid,
      stake: stake,
      betPartner: betPartner,
    });
    await newBet.save();

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

    // create Habit with the bet above
    const newHabit = {
      habitId: new mongoose.Types.ObjectId(),
      userId: userid,
      betId: betId,
      createAt: new Date(),
      dueDate: dueDate,
      status: "uncheck",
      dateCheck: dateList,
      habitTitle: habitTitle,
    };
    await HabitSchema.create(newHabit);

    const { habitId, status } = newHabit;
    res
      .status(200)
      .json({ habitId, betId, dueDate, status, habitTitle, stake, betPartner });
  } catch (error) {
    genericErrorHandler(error, res);
  }
};

// PUT /habit/dailycheck/:habitid
export const putHabit = async (req, res) => {
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

// PUT /habit/getstatus/:habitid
export const getHabitStatus = async (req, res) => {
  const { habitid } = req.params;

  if (!habitid) {
    return res.status(400).json({ error: "Habit Id is required" });
  }

  try {
    const habit = await HabitSchema.findOne({ habitId: habitid });
    const user = await UserSchema.findOne({ userId: habit.userId });
    const theBet = await BetSchema.findOne({ betId: habit.betId });

    if (!habit) {
      return res.status(404).json({ error: "Habit not found" });
    }

    if (habit.status === "close") {
      // 判斷勝負
      let habitSuccess = "win";
      const checkedValues = habit.dateCheck.map((item) => item.checked);
      console.log(checkedValues);

      if (checkedValues.some((value) => value === false)) {
        habitSuccess = "lose";
      }

      habit.status = `${habitSuccess}`;
      await habit.save();

      if (user.saysayPoint) {
        // 計算贏多少錢
        const moneyChange =
          habitSuccess === "win" ? theBet.stake : theBet.stake * -1;

        user.saysayPoint = user.saysayPoint + moneyChange;

        user.save();
      }
    }

    const checkValues = habit.dateCheck.map((item) => item.checked);
    const totalDay = checkValues.length;
    const checkedValues = checkValues.filter((value) => value === true);
    const checkedDay = checkedValues.length;
    const finishedRate = Math.ceil((checkedDay / totalDay) * 100);

    const targetHabit = {
      habitTitle: habit.habitTitle,
      status: habit.status,
      createDate: habit.createAt,
      dueDate: habit.dueDate,
      finishedRate: finishedRate,
      userName: user.userName,
      betPartner: theBet.betPartner,
      stake: theBet.stake,
    };

    res.status(200).json(targetHabit);
  } catch (error) {
    genericErrorHandler(error, res);
  }
};
