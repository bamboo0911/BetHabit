import { Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import useHabit from "../hooks/habit/useHabits";
import useAddUser from "../hooks/habit/useAddUser";
import HabitItem from "../partials/Habits/habitItem";
import CreateHabitModal from "../components/createHabitModal";

export default function Habit() {
  // 新增user
  // const [userName, setUserName] = useState("");
  // const { trigger: addUser } = useAddUser();
  // const handleAddUser = async () => {
  //   await addUser({ userName });
  //   setUserName("");
  // };

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const data = useHabit();
  useEffect(() => {}, [data]);

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
              {/* Title: Date */}
              <div className="relative p-4 sm:p-6 rounded-sm overflow-hidden mb-8">
                <div className="relative">
                  <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold mb-1">
                    Today
                  </h1>
                  <p className="dark:text-indigo-200">
                    {date.toLocaleDateString()}
                  </p>
                </div>
              </div>
              {/* Subtitle */}
              <div className="sm:flex sm:justify-between sm:items-center mb-8">
                {/* Left: Habit Status */}
                <p className="dark:text-indigo-200">Unchecked Habits</p>
                {/* Right: Add button */}
                <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                  <button
                    className="btn bg-school hover:bg-orange-500 text-white duration-300"
                    onClick={handleOpen}
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
              {/* Habits */}
              <div className="grid grid-cols-12 gap-6">
                {data?.map((item) => (
                  <HabitItem
                    habitId={item.habitId}
                    habitTitle={item.habitTitle}
                    dueDate={item.dueDate}
                    createDate={item.createAt}
                    status={item.status}
                    key={item.habitId}
                  />
                ))}
              </div>
            </div>
            <CreateHabitModal open={open} handleOpen={handleOpen} />
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
