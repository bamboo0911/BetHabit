import { useEffect } from "react";
import { Button, Progress, progress } from "@material-tailwind/react";
import useDailyCheck from "../../hooks/habit/useDailyCheck";
import useGetStatus from "../../hooks/habit/useHabitStatus";

export default function habitItem({
  habitTitle,
  dueDate,
  habitId,
  status,
  createDate,
  openCloseHabitModal,
  openResultShareModal,
  openHabitShareModal,
  getResult,
  getIsMutating,
}) {
  const { trigger: dailyCheck } = useDailyCheck(habitId);
  const {
    result: returnResult,
    trigger: getStatus,
    isMutating,
  } = useGetStatus(habitId);

  const handleCheck = async () => {
    await dailyCheck();
    window.location.reload();
  };

  const handleCalculate = async () => {
    await getStatus();
    openCloseHabitModal();
  };

  const handleShareResult = async () => {
    await getStatus();
    openResultShareModal();
  };

  const handleShareHabit = async () => {
    await getStatus();
    openHabitShareModal();
  };

  useEffect(() => {
    getResult(returnResult);
  }, [returnResult]);

  useEffect(() => {
    getIsMutating(isMutating);
  }, [isMutating]);

  const caculateProgress = () => {
    const today = new Date();
    const createDateObj = new Date(createDate.slice(0, 10));
    const dueDateObj = new Date(dueDate.slice(0, 10));
    const totalTime = Math.abs(dueDateObj - createDateObj);
    const totalDays = Math.ceil(totalTime / (1000 * 60 * 60 * 24));
    const passedTimes = Math.abs(today - createDateObj);
    const passedDays = Math.ceil(passedTimes / (1000 * 60 * 60 * 24));
    const leftDays = totalDays - passedDays;

    return { passedDays, totalDays, leftDays };
  };

  return (
    <>
      <div
        key={habitId}
        className="flex  flex-col col-span-full bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700 rounded-lg"
      >
        <div className="sm:flex sm:justify-between items-center p-4 sm:items-center">
          <div>
            <div className="text-1xl md:text-2xl mb-1">{habitTitle}</div>
            <div className="mb-2">
              Progress: {caculateProgress().passedDays} days /{" "}
              {caculateProgress().totalDays} days ({caculateProgress().leftDays}{" "}
              days left)
            </div>
            <Progress color="blue" value={caculateProgress()[0]} />
          </div>
          <div>
            {status === "uncheck" && (
              <>
                <Button
                  style={{ backgroundColor: "pink" }}
                  onClick={handleShareHabit}
                >
                  Share Habit
                </Button>
                <Button
                  style={{ backgroundColor: "green" }}
                  onClick={handleCheck}
                >
                  Check
                </Button>
              </>
            )}
            {status === "checked" && (
              <>
                <Button
                  style={{ backgroundColor: "pink" }}
                  onClick={handleShareHabit}
                >
                  Share Habit
                </Button>
                <Button style={{ backgroundColor: "gray" }}>Checked</Button>
              </>
            )}
            {status === "close" && (
              <Button
                style={{ backgroundColor: "red" }}
                onClick={handleCalculate}
              >
                Close
              </Button>
            )}
            {status === "win" && (
              <>
                <Button
                  style={{ backgroundColor: "pink" }}
                  onClick={handleShareResult}
                >
                  Share Result
                </Button>
                <Button style={{ backgroundColor: "black" }}>Win</Button>
              </>
            )}
            {status === "lose" && (
              <>
                <Button
                  style={{ backgroundColor: "pink" }}
                  onClick={handleShareResult}
                >
                  Share Result
                </Button>
                <Button style={{ backgroundColor: "black" }}>Lose</Button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
