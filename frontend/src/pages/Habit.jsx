import { Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import useHabit from "../hooks/habit/useHabits";
import useGetUserPoint from "../hooks/habit/useGetUserPoint";
import useAddUser from "../hooks/habit/useAddUser";
import HabitItem from "../partials/Habits/habitItem";
import CreateHabitModal from "../components/createHabitModal";
import CloseHabitModal from "../components/closeHabitModal";
import ResultShareModal from "../components/resultShareModal";
import HabitShareModal from "../components/habitShareModal";

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
  const [openResultShareModal, setOpenResultShareModal] = useState(false);
  const [openHabitShareModal, setOpenHabitShareModal] = useState(false);

  const handleOpenCreateHabitModal = () =>
    setOpenCreateHabitModal(!openCreateHabitModal);

  const handleOpenCloseHabitModal = () =>
    setOpenCloseHabitModal(!openCloseHabitModal);

  const handleOpenResultShareModal = () =>
    setOpenResultShareModal(!openResultShareModal);

  const handleOpenHabitShareModal = () =>
    setOpenHabitShareModal(!openHabitShareModal);

  const data = useHabit();
  const userPoint = useGetUserPoint();
  useEffect(() => {}, [data]);
  useEffect(() => {}, [userPoint]);

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
      <div className="flex h-screen overflow-hidden bg-slate-100">
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
                    今天
                  </h1>
                  <p className="dark:text-indigo-200">
                    {date.toLocaleDateString()}
                  </p>
                </div>
                {/* Add button */}
                <div className="grid grid-flow-col sm:auto-cols-max sm:justify-end gap-4">
                  
                  {/* saysayPoint */}
                  {/* 
                  <div className="mx-auto flex max-w-xs flex-col gap-y-2">
                    <dd className="text-2xl font-semibold tracking-tight text-gray-900">
                      <p className="mr-1 text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">
                        說說幣
                      </p>
                    </dd>
                    <dt className="grid grid-flow-col items-center text-2xl leading-7 text-gray-600">
                      <span className="mr-3 text-2xl leading-7 text-gray-600 font-semibold">
                        {userPoint && userPoint.saysayPoint
                          ? userPoint.saysayPoint
                          : ""}
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="gold"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-8 h-8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </dt>
                  </div>
                  */}

                  {/* Add new habit button */}
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
                      record={item.dateCheck}
                      openCloseHabitModal={handleOpenCloseHabitModal}
                      openResultShareModal={handleOpenResultShareModal}
                      openHabitShareModal={handleOpenHabitShareModal}
                      getResult={getResult}
                      getIsMutating={getIsMutating}
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
                      record={item.dateCheck}
                      openCloseHabitModal={handleOpenCloseHabitModal}
                      openResultShareModal={handleOpenResultShareModal}
                      openHabitShareModal={handleOpenHabitShareModal}
                      getResult={getResult}
                      getIsMutating={getIsMutating}
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
                  ?.filter((item) => item.status === "close")
                  .map((item) => (
                    <HabitItem
                      habitId={item.habitId}
                      habitTitle={item.habitTitle}
                      dueDate={item.dueDate}
                      createDate={item.createAt}
                      status={item.status}
                      record={item.dateCheck}
                      openCloseHabitModal={handleOpenCloseHabitModal}
                      openResultShareModal={handleOpenResultShareModal}
                      openHabitShareModal={handleOpenHabitShareModal}
                      getResult={getResult}
                      getIsMutating={getIsMutating}
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
                      record={item.dateCheck}
                      openCloseHabitModal={handleOpenCloseHabitModal}
                      openResultShareModal={handleOpenResultShareModal}
                      openHabitShareModal={handleOpenHabitShareModal}
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
            <ResultShareModal
              open={openResultShareModal}
              handleOpen={handleOpenResultShareModal}
              sharedHabit={result}
              isMutating={isMutating}
            />
            <HabitShareModal
              open={openHabitShareModal}
              handleOpen={handleOpenHabitShareModal}
              sharedHabit={result}
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
