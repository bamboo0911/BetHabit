import { Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import useHabit from "../hooks/habit/useHabits";
import useAddUser from "../hooks/habit/useAddUser";
import HabitItem from "../partials/Habits/habitItem";
import CreateHabitModal from "../components/createHabitModal";
import CloseHabitModal from "../components/closeHabitModal";

export default function Habit() {
  // 新增user
  // const [userName, setUserName] = useState("");
  // const { trigger: addUser } = useAddUser();
  // const handleAddUser = async () => {
  //   await addUser({ userName });
  //   setUserName("");
  // };

  const [date, setDate] = useState(new Date());
  const [openCreateHabitModal, setOpenCreateHabitModal] = useState(false);
  const [openCloseHabitModal, setOpenCloseHabitModal] = useState(false);
  const handleOpenCreateHabitModal = () =>
    setOpenCreateHabitModal(!openCreateHabitModal);
  const handleOpenCloseHabitModal = () =>
    setOpenCloseHabitModal(!openCloseHabitModal);

  const data = useHabit();
  useEffect(() => {}, [data]);

  const [result, setResult] = useState({});
  const getResult = (returnResult) => {
    setResult(returnResult);
  };
  const [isMutating, setIsMutating] = useState(false);
  const getIsMutating = (returnIsMutating) => {
    setIsMutating(returnIsMutating);
  };

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <header className="absolute inset-x-0 top-0 z-50">
            <nav
              className="flex items-center justify-end p-6 lg:px-8"
              aria-label="Global"
            >
              {/* <Button
                style={{ backgroundColor: "white" }}
                onClick={handleAddUser}
              >
                Create User
              </Button> */}
            </nav>
          </header>
          <main>
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              {/* Title */}
              <div className="flex p-4 sm:p-6 rounded-sm overflow-hidden mb-8 justify-between">
                {/* Date */}
                <div className="relative">
                  <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold mb-1">
                    Today
                  </h1>
                  <p className="dark:text-indigo-200">
                    {date.toLocaleDateString()}
                  </p>
                </div>
                {/* Add button */}
                <div className="grid grid-flow-col sm:auto-cols-max sm:justify-end gap-2">
                  <button
                    className="btn bg-school hover:bg-orange-500 text-white duration-300"
                    onClick={handleOpenCreateHabitModal}
                  >
                    <svg
                      className="w-4 h-4 fill-current opacity-50 shrink-0"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                    </svg>
                    <span className="hidden xs:block ml-2">Add new habit</span>
                  </button>
                </div>
              </div>
              {/* Unchecked Habit */}
              <div className="sm:flex sm:justify-start sm:items-center mb-4">
                <p className="text-1xl md:text-2xl dark:text-indigo-200">
                  Unchecked
                </p>
              </div>
              <div className="grid grid-cols-12 gap-6 py-4 border-t border-gray-900/10 mb-5">
                {data
                  ?.filter((item) => item.status === "uncheck")
                  .map((item) => (
                    <HabitItem
                      habitId={item.habitId}
                      habitTitle={item.habitTitle}
                      dueDate={item.dueDate}
                      createDate={item.createAt}
                      status={item.status}
                      openCloseHabitModal={handleOpenCloseHabitModal}
                      getResult={getResult}
                      getIsMutating={getIsMutating}
                      key={item.habitId}
                    />
                  ))}
              </div>
              {/* Checked Habit */}
              <div className="sm:flex sm:justify-start sm:items-center mb-4">
                <p className="text-1xl md:text-2xl dark:text-indigo-200">
                  Checked
                </p>
              </div>
              <div className="grid grid-cols-12 gap-6 py-4 border-t border-gray-900/10 mb-5">
                {data
                  ?.filter((item) => item.status === "checked")
                  .map((item) => (
                    <HabitItem
                      habitId={item.habitId}
                      habitTitle={item.habitTitle}
                      dueDate={item.dueDate}
                      createDate={item.createAt}
                      status={item.status}
                      openCloseHabitModal={handleOpenCloseHabitModal}
                      getResult={getResult}
                      getIsMutating={getIsMutating}
                      key={item.habitId}
                    />
                  ))}
              </div>
              {/* To Close */}
              <div className="sm:flex sm:justify-start sm:items-center mb-4">
                <p className="text-1xl md:text-2xl dark:text-indigo-200">
                  To Close
                </p>
              </div>
              <div className="grid grid-cols-12 gap-6 py-4 border-t border-gray-900/10 mb-5">
                {data
                  ?.filter((item) => item.status === "close")
                  .map((item) => (
                    <HabitItem
                      habitId={item.habitId}
                      habitTitle={item.habitTitle}
                      dueDate={item.dueDate}
                      createDate={item.createAt}
                      status={item.status}
                      openCloseHabitModal={handleOpenCloseHabitModal}
                      getResult={getResult}
                      getIsMutating={getIsMutating}
                      key={item.habitId}
                    />
                  ))}
              </div>
              {/* Closed Habit */}
              <div className="sm:flex sm:justify-start sm:items-center mb-4">
                <p className="text-1xl md:text-2xl dark:text-indigo-200">
                  Closed
                </p>
              </div>
              <div className="grid grid-cols-12 gap-6 py-4 border-t border-gray-900/10 mb-5">
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
                      openCloseHabitModal={handleOpenCloseHabitModal}
                      getResult={getResult}
                      getIsMutating={getIsMutating}
                      key={item.habitId}
                    />
                  ))}
              </div>
            </div>
            <CreateHabitModal
              open={openCreateHabitModal}
              handleOpen={handleOpenCreateHabitModal}
            />
            <CloseHabitModal
              open={openCloseHabitModal}
              handleOpen={handleOpenCloseHabitModal}
              closedHabit={result}
              isMutating={isMutating}
            />
          </main>
        </div>
      </div>
      {/* <div className="flex h-screen overflow-hidden">
        <div className="my-3">
          <div className="my-3">User Name</div>
          <Input
            type="text"
            placeholder="User Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <Button className="my-3" onClick={handleAddUser}>
            Add user
          </Button>
        </div>
      </div> */}
    </>
  );
}
