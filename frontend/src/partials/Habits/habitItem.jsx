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
    getStatus();
  }, []);

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
        <div className="w-full sm:flex justify-between items-center p-4">
          <div>
            <div className="w-full text-2xl md:text-3xl mb-2">{habitTitle}</div>
            {status === "uncheck" || status === "checked" ? (
              <div className="mb-2">
                進度 {caculateProgress().passedDays} 天 /{" "}
                {caculateProgress().totalDays} 天 (剩餘{" "}
                {caculateProgress().leftDays} 天)
              </div>
            ) : (
              <div className="mb-2">已截止</div>
            )}
            <p className="mb-2">簽到率 {finishedRate} %</p>
            <Progress color="orange" value={finishedRate} size="lg" />
          </div>
          <div className="w-full flex justify-end m-2">
            {status === "uncheck" && (
              <>
                <Button
                  color="orange"
                  variant="text"
                  onClick={handleShareHabit}
                  className="text-lg ml-2 bd"
                >
                  查看賭注
                </Button>
                <Button className="text-lg ml-2" color="green" onClick={handleCheck}>
                  簽到
                </Button>
              </>
            )}
            {status === "checked" && (
              <>
                <Button
                  color="orange"
                  variant="text"
                  onClick={handleShareHabit}
                  className="text-lg ml-2 bd"
                >
                  查看賭注
                </Button>
                <Button
                  className="text-lg ml-2"
                  color="green"
                  variant="outlined"
                  disabled="true"
                >
                  已簽到
                </Button>
              </>
            )}
            {status === "due" && (
              <>
                <Button
                  color="orange"
                  variant="text"
                  onClick={handleShareHabit}
                  className="text-lg ml-2 bd"
                >
                  查看賭注
                </Button>
                <Button
                  className="text-lg"
                  color="blue"
                  variant="text"
                  onClick={handleCalculate}
                >
                  結算
                </Button>
              </>
            )}
            {status === "win" && (
              <>
              <div className="w-full flex justify-start sm:justify-end">
                <Button
                  color="black"
                  variant="text"
                  disabled="true"
                  className="text-lg m-0"
                >
                  贏了{" "}
                  {returnResult &&
                    Object.keys(returnResult).length !== 0 &&
                    returnResult.stake}
                </Button>
                </div>
                <Button
                  color="orange"
                  variant="text"
                  onClick={handleShareResult}
                  className="text-lg bd whitespace-nowrap"
                >
                  查看賭注
                </Button>
              </>
            )}
            {status === "lose" && (
              <>
              <div className="w-full flex justify-start sm:justify-end">
                <Button
                  color="black"
                  variant="text"
                  disabled="true"
                  className="text-lg m-0"
                >
                  輸了{" "}
                  {returnResult &&
                    Object.keys(returnResult).length !== 0 &&
                    returnResult.stake}
                </Button>
                </div>
                <Button
                  color="orange"
                  variant="text"
                  onClick={handleShareResult}
                  className="text-lg bd whitespace-nowrap"
                >
                  查看賭注
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
