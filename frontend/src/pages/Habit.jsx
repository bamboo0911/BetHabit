import { useEffect, useState } from "react";
import useHabit from "../hooks/habit/useHabits";
import HabitItem from "../partials/Habits/habitItem";
import CreateHabitModal from "../components/createHabitModal";
import ResultShareModal from "../components/resultShareModal";
import HabitShareModal from "../components/habitShareModal";
import useGetSharedHabit from "../hooks/habit/useGetSharedHabit";

export default function Habit() {
  const today = new Date();

  const data = useHabit();
  useEffect(() => {}, [data]);

  const [openCreateHabitModal, setOpenCreateHabitModal] = useState(false);
  const [openResultShareModal, setOpenResultShareModal] = useState(false);
  const [openHabitShareModal, setOpenHabitShareModal] = useState(false);

  const [sharedHabitId, setSharedHabitId] = useState("");
  const { sharedHabit, isLoading } = useGetSharedHabit(sharedHabitId);

  return (
    <>
      <div className="flex h-screen overflow-hidden bg-slate-100">
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <main>
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              {/* Title */}
              <div className="flex p-4 sm:p-6 rounded-sm overflow-hidden mb-8 justify-between">
                {/* Date */}
                <div className="relative">
                  <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold mb-1">
                    今天
                  </h1>
                  <p className="dark:text-indigo-200">
                    {today.toLocaleDateString()}
                  </p>
                </div>
                {/* Add button */}
                <div className="grid grid-flow-col sm:auto-cols-max sm:justify-end gap-4">
                  {/* Add new habit button */}
                  <button
                    className="btn bg-school hover:bg-orange-500 text-white duration-300"
                    onClick={() => setOpenCreateHabitModal(true)}
                  >
                    <svg
                      className="w-4 h-4 fill-current opacity-50 shrink-0"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                    </svg>
                    <span className="hidden text-lg xs:block ml-2">
                      建立新習慣
                    </span>
                  </button>
                </div>
              </div>
              {/* Unchecked Habit */}
              <div className="sm:flex sm:justify-start sm:items-center mb-4">
                <p className="text-1xl md:text-3xl dark:text-indigo-200">
                  尚未簽到
                </p>
              </div>
              <div className="grid grid-cols-12 gap-6 py-4 border-t border-gray-900/20 mb-5">
                {data
                  ?.filter((item) => item.status === "uncheck")
                  .map((item) => (
                    <HabitItem
                      habitId={item.habitId}
                      habitTitle={item.habitTitle}
                      dueDate={item.dueDate}
                      createDate={item.createAt}
                      status={item.status}
                      openResultShareModal={setOpenResultShareModal}
                      openHabitShareModal={setOpenHabitShareModal}
                      setSharedHabitId={setSharedHabitId}
                      key={item.habitId}
                    />
                  ))}
              </div>
              {/* Checked Habit */}
              <div className="sm:flex sm:justify-start sm:items-center mb-4">
                <p className="text-1xl md:text-3xl dark:text-indigo-200">
                  今日已簽到
                </p>
              </div>
              <div className="grid grid-cols-12 gap-6 py-4 border-t border-gray-900/20 mb-5">
                {data
                  ?.filter((item) => item.status === "checked")
                  .map((item) => (
                    <HabitItem
                      habitId={item.habitId}
                      habitTitle={item.habitTitle}
                      dueDate={item.dueDate}
                      createDate={item.createAt}
                      status={item.status}
                      openResultShareModal={setOpenResultShareModal}
                      openHabitShareModal={setOpenHabitShareModal}
                      setSharedHabitId={setSharedHabitId}
                      key={item.habitId}
                    />
                  ))}
              </div>
              {/* To Close */}
              <div className="sm:flex sm:justify-start sm:items-center mb-4">
                <p className="text-1xl md:text-3xl dark:text-indigo-200">
                  待結算
                </p>
              </div>
              <div className="grid grid-cols-12 gap-6 py-4 border-t border-gray-900/20 mb-5">
                {data
                  ?.filter((item) => item.status === "due")
                  .map((item) => (
                    <HabitItem
                      habitId={item.habitId}
                      habitTitle={item.habitTitle}
                      dueDate={item.dueDate}
                      createDate={item.createAt}
                      status={item.status}
                      openResultShareModal={setOpenResultShareModal}
                      openHabitShareModal={setOpenHabitShareModal}
                      setSharedHabitId={setSharedHabitId}
                      key={item.habitId}
                    />
                  ))}
              </div>
              {/* Closed Habit */}
              <div className="sm:flex sm:justify-start sm:items-center mb-4">
                <p className="text-1xl md:text-3xl dark:text-indigo-200">
                  已完成
                </p>
              </div>
              <div className="grid grid-cols-12 gap-6 py-4 border-t border-gray-900/20 mb-5">
                {data
                  ?.filter(
                    (item) => item.status === "win" || item.status === "lose"
                  )
                  .map((item) => (
                    <HabitItem
                      habitId={item.habitId}
                      habitTitle={item.habitTitle}
                      dueDate={item.dueDate}
                      createDate={item.createAt}
                      status={item.status}
                      openResultShareModal={setOpenResultShareModal}
                      openHabitShareModal={setOpenHabitShareModal}
                      setSharedHabitId={setSharedHabitId}
                      key={item.habitId}
                    />
                  ))}
              </div>
            </div>
            <CreateHabitModal
              open={openCreateHabitModal}
              handleOpen={setOpenCreateHabitModal}
            />
            <ResultShareModal
              open={openResultShareModal}
              handleOpen={setOpenResultShareModal}
              sharedHabit={sharedHabit}
              isLoading={isLoading}
            />
            <HabitShareModal
              open={openHabitShareModal}
              handleOpen={setOpenHabitShareModal}
              sharedHabit={sharedHabit}
              isLoading={isLoading}
            />
          </main>
        </div>
      </div>
    </>
  );
}
