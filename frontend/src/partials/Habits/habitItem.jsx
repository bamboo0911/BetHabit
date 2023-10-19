import { Button, Progress } from "@material-tailwind/react";
import useDailyCheck from "../../hooks/habit/useDailyCheck";
import useCloseHabit from "../../hooks/habit/useCloseHabit";

export default function habitItem({
  habitTitle,
  dueDate,
  habitId,
  status,
  createDate,
}) {
  const { trigger: dailyCheck } = useDailyCheck(habitId);
  const { trigger: closeHabit } = useCloseHabit(habitId);

  const handleCheck = async () => {
    await dailyCheck();
    window.location.reload();
  };

  const handleCalculate = async () => {
    await closeHabit();
    window.location.reload();
  };

  const caculateProgress = () => {
    const today = new Date();
    const createDateObj = new Date(createDate.slice(0, 10));
    const dueDateObj = new Date(dueDate.slice(0, 10));
    const totalTime = Math.abs(dueDateObj - createDateObj);
    const totalDays = Math.ceil(totalTime / (1000 * 60 * 60 * 24));
    const passedTimes = Math.abs(today - createDateObj);
    const passedDays = Math.ceil(passedTimes / (1000 * 60 * 60 * 24));
    const progress = Math.floor((passedDays / totalDays) * 100);
    const leftDays = totalDays - passedDays;
    return [progress, leftDays];
  };

  return (
    <>
      <div className="flex  flex-col col-span-full dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700">
        <div className="sm:flex sm:justify-between items-center p-4 sm:items-center">
          <div key={habitId}>
            <div>Habit Title: {habitTitle}</div>
            <div>Left Days: {caculateProgress()[1]}</div>
            <div>Due Date: {dueDate.slice(0, 10)}</div>
            <Progress color="blue" value={caculateProgress()[0]} />
          </div>
          <div>
            {status === "uncheck" && (
              <Button
                style={{ backgroundColor: "green" }}
                onClick={handleCheck}
              >
                Check
              </Button>
            )}
            {status === "checked" && (
              <Button style={{ backgroundColor: "gray" }} onClick={handleCheck}>
                Checked
              </Button>
            )}
            {status === "close" && (
              <Button
                style={{ backgroundColor: "red" }}
                onClick={handleCalculate}
              >
                Calculate
              </Button>
            )}
            {status === "win" && (
              <Button style={{ backgroundColor: "yellow" }}>Win</Button>
            )}
            {status === "lose" && (
              <Button style={{ backgroundColor: "black" }}>Win</Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
