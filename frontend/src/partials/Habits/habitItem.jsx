import { Button } from "@material-tailwind/react";
import useDailyCheck from "../../hooks/habit/useDailyCheck";
import useCloseHabit from "../../hooks/habit/useCloseHabit";

export default function habitItem({ habitTitle, dueDate, habitId, status }) {
  const { trigger: dailyCheck } = useDailyCheck(habitId);
  const { trigger: closeHabit } = useCloseHabit(habitId);

  
  const handleCheck = async () => {
    await dailyCheck();
    window.location.reload();
  };

  const handleCalculate = async () => {
    const win_lose = await closeHabit();
    console.log(win_lose);
    //window.location.reload();
  };

  return (
    <>
      <div key={habitId}>
        <div>Habit Title: {habitTitle}</div>
        <div>Due Date: {dueDate}</div>
        {status === "uncheck" && (
          <Button style={{ backgroundColor: "green" }} onClick={handleCheck}>
            Check
          </Button>
        )}
        {status === "checked" && (
          <Button style={{ backgroundColor: "gray" }} onClick={handleCheck}>
            Checked
          </Button>
        )}
        {status === "due" && (
          <Button style={{ backgroundColor: "red" }} onClick={handleCalculate}>
            Calculate
          </Button>
        )}
        {status === "win" && (
          <Button style={{ backgroundColor: "yellow" }}>Win</Button>
        )}
        {status === "lose" && (
          <Button style={{ backgroundColor: "black" }}>Lose</Button>
        )}
      </div>
    </>
  );
}
