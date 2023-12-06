import { Button, Progress } from "@material-tailwind/react";
import useDailyCheck from "../../hooks/habit/useDailyCheck";
import useCloseHabit from "../../hooks/habit/useCloseHabit";

export default function habitItem({
  habitId,
  habitTitle,
  status,
  dueDate,
  createDate,
  openResultShareModal,
  openHabitShareModal,
  setSharedHabitId,
}) {
  const { trigger: dailyCheck } = useDailyCheck(habitId);
  const { trigger: closeHabit } = useCloseHabit(habitId);

  const handleCheck = async () => {
    await dailyCheck();
    window.location.reload();
  };

  const handleClose = async () => {
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
    const leftDays = totalDays - passedDays;
    const progressRate = Math.ceil((passedDays / totalDays) * 100);
    return { passedDays, totalDays, leftDays, progressRate };
  };

  const handleHabitShare = () => {
    setSharedHabitId(habitId);
    openHabitShareModal(true);
  };

  const handleResultShare = () => {
    setSharedHabitId(habitId);
    openResultShareModal(true);
  };

  return (
    <>
      <div
        key={habitId}
        className="flex  flex-col col-span-full bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700 rounded-lg"
      >
        <div className="sm:flex sm:justify-between items-center p-4 sm:items-center">
          <div>
            <div className="text-1xl md:text-2xl mb-2">
              開始日：{createDate.slice(0, 10)}
            </div>
            <div className="text-2xl md:text-3xl mb-2">{habitTitle}</div>
            {status === "uncheck" || status === "checked" ? (
              <div className="mb-2">
                進度 {caculateProgress().passedDays} 天 /{" "}
                {caculateProgress().totalDays} 天 (剩餘{" "}
                {caculateProgress().leftDays} 天)
              </div>
            ) : (
              <div className="mb-2">已截止</div>
            )}
            <Progress
              color="orange"
              value={caculateProgress().progressRate}
              size="lg"
            />
          </div>
          <div>
            {status === "uncheck" && (
              <>
                <Button className="text-lg" color="green" onClick={handleCheck}>
                  簽到
                </Button>
                <Button
                  color="orange"
                  variant="text"
                  onClick={handleHabitShare}
                  className="text-lg ml-0 bd"
                >
                  查看賭注
                </Button>
              </>
            )}
            {status === "checked" && (
              <>
                <Button
                  className="text-lg"
                  color="green"
                  variant="outlined"
                  disabled="true"
                >
                  已簽到
                </Button>
                <Button
                  color="orange"
                  variant="text"
                  onClick={handleHabitShare}
                  className="text-lg ml-0 bd"
                >
                  查看賭注
                </Button>
              </>
            )}
            {status === "due" && (
              <>
                <Button
                  className="text-lg"
                  color="orange"
                  onClick={handleClose}
                >
                  結算
                </Button>
                <Button
                  color="orange"
                  variant="text"
                  onClick={handleHabitShare}
                  className="text-lg ml-0 bd"
                >
                  查看賭注
                </Button>
              </>
            )}
            {status === "win" && (
              <>
                <Button
                  color="black"
                  variant="text"
                  disabled="true"
                  size="lg"
                  className="text-lg"
                >
                  贏了!
                </Button>
                <Button
                  color="orange"
                  variant="text"
                  onClick={handleResultShare}
                  className="text-lg ml-0 bd"
                >
                  查看結果
                </Button>
              </>
            )}
            {status === "lose" && (
              <>
                <Button
                  color="black"
                  variant="text"
                  disabled="true"
                  size="lg"
                  className="text-lg"
                >
                  輸了!
                </Button>
                <Button
                  color="orange"
                  variant="text"
                  onClick={handleResultShare}
                  className="text-lg ml-0 bd"
                >
                  查看結果
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
