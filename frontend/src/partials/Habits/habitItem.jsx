import { useEffect } from "react";
import { Button, Progress } from "@material-tailwind/react";
import useDailyCheck from "../../hooks/habit/useDailyCheck";
import useGetStatus from "../../hooks/habit/useHabitStatus";

export default function habitItem({
  habitTitle,
  dueDate,
  habitId,
  status,
  createDate,
  record,
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

  // console.log("record", record);
  const checkValues = record.map((item) => item.checked);
  const totalDay = checkValues.length;
  const checkedValues = checkValues.filter((value) => value === true);
  const checkedDay = checkedValues.length;
  const finishedRate = Math.ceil((checkedDay / totalDay) * 100);

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
              進度 {caculateProgress().passedDays} 天 /{" "}
              {caculateProgress().totalDays} 天 (剩餘 {caculateProgress().leftDays}{" "}
              天)
            </div>
            <p>已完成 {finishedRate}%</p>
            <Progress color="orange" value={finishedRate} size="lg" />
          </div>
          <div>
            {status === "uncheck" && (
              <>
                <Button color="green" onClick={handleCheck}>
                  簽到
                </Button>
                <Button
                  color="orange"
                  variant="text"
                  onClick={handleShareHabit}
                  className="ml-2"
                >
                  分享習慣
                </Button>
              </>
            )}
            {status === "checked" && (
              <>
                <Button color="green" variant="outlined" disabled="true">
                  已簽到
                </Button>
                <Button
                  color="orange"
                  variant="text"
                  onClick={handleShareHabit}
                  className="ml-2"
                >
                  分享習慣
                </Button>
              </>
            )}
            {status === "close" && (
              <>
                <Button color="orange" variant="text" onClick={handleCalculate}>
                  結算
                </Button>
                <Button
                  color="orange"
                  variant="text"
                  onClick={handleShareHabit}
                  className="ml-2"
                >
                  分享習慣
                </Button>
              </>
            )}
            {status === "win" && (
              <>
                <Button color="black" variant="text" disabled="true" size="lg">
                  勝利
                </Button>
                <Button
                  color="orange"
                  variant="text"
                  onClick={handleShareResult}
                  className="ml-2"
                >
                  分享結果
                </Button>
              </>
            )}
            {status === "lose" && (
              <>
                <Button color="black" variant="text" disabled="true" size="lg">
                  輸了
                </Button>
                <Button
                  color="orange"
                  variant="text"
                  onClick={handleShareResult}
                  className="ml-2"
                >
                  分享結果
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
