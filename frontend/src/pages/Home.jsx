import { useState } from "react";
import HabitComponent from './HabitComponent';
import Layout from "../partials/Layout";
import Modal from "../../components/Modal";
import Card from "../../components/Card";

export default function Home() {
  const [habits, setHabits] = useState([]);

  // const addNewHabit = () => {
  //   const newHabitComponent = <HabitComponent />;
  //   setHabits([...habits, newHabitComponent]);
  // };



  return (
    <Layout>
      <div className="bg-white flex flex-col p-10 min-h-screen">
        <div className="justify-center items-start content-start flex-wrap bg-white self-stretch flex w-full flex-col mt-5 pt-2.5 pb-7 px-5 max-md:max-w-full">
          <div className="text-black text-center text-4xl font-semibold leading-10 tracking-tighter self-center w-[511px] max-w-full">
            Developing Habits
          </div>
        </div>

        {/* 顯示已有的習慣 */}
        <div className="flex flex-col flex-grow">
          {habits.map((habit, index) => (
            <div key={index}>{habit}</div>
          ))}
        </div>
        {/*點擊新增habit頁面*/}
        <div className="flex flex-col items-center">
          <div className="border-gray-700 border-20 justify-center items-center shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] bg-pink-900 flex w-[266px] max-w-full flex-col mb-12 px-5 py-8 rounded-3xl border-2 border-solid border-[rgba(0,0,0,0.06)] max-md:mr-2.5">
            <button onClick={addNewHabit} className="justify-center text-white text-center text-2xl font-semibold leading-8 self-center w-[248px] -mt-px mb-px flex">
              + Add Habit
            </button>
            
          </div>
        </div>
      </div>
    </Layout>
  );
}

{/* <div className="flex p-10">
<Card className="flex-[1]" title="Full Screen Modal">
  <Modal size="xxl" title="" text="" buttonText="settle accounts">
    <Setuphabit/>
  </Modal>
</Card>
</div> */}