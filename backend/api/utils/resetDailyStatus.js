import HabitSchema from "../models/habit.js";


// 獲取今日日期
const today = new Date().toISOString().split('T')[0];

const getTodayStauts = async (habit) => {

  // 處理status不是win/lose的情況(也就是如果是到期日+1, uncheck, checked進入這個函式)
  async function processReset(aHabit) {
    // 日期處理
    let dueDate = new Date(aHabit.dueDate.toISOString().split('T')[0]);
    dueDate.setDate(dueDate.getDate() + 1);
    dueDate = dueDate.toISOString().split('T')[0];
    console.log(dueDate, today);

    // 如果今天是到期日的下一天
    if (today === dueDate) {
      aHabit.status = "due";
      await aHabit.save();
      return "due";
    } else {
      aHabit.status = "uncheck";
      await aHabit.save();
      return "uncheck";
    }
  };

  // 處理多種status
  const aHabit = await HabitSchema.findOne({ _id: habit._id });
  if (aHabit.status === "win" || aHabit.status === "lose") {
    return aHabit.status;
  } else if (aHabit.status === "due") {
    return "due";
  } else {
    processReset(aHabit);
    return;
  }
}

export const resetDailyStatus = async () => {

  const habitStatus = await HabitSchema.find(
    {}, "habitId dueDate status");

  habitStatus.forEach((habit) => {
    // 計算要是哪個status
    getTodayStauts(habit);
  });

};
