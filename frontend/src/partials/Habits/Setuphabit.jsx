import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useUser } from "@clerk/clerk-react";
import { Input, Button } from "@material-tailwind/react";
import Flatpickr from "react-flatpickr";
import useAddHabit from '../../hooks/habit/useAddHabit';
import useHabit from '../../hooks/habit/useHabits';
import useAddUser from '../../hooks/habit/useAddUser';
import habitItem from './habitItem';
import Home from '../../pages/Home';

export default function Setuphabit() {
  const [currentContent, setCurrentContent] = useState("habit");

  const handleAddUser = async () => {
    await addUser({ userName });
    setUserName("");
  };

  const [habitTitle, setHabitTitle] = useState("");
  const [dueDate, setDueDate] = useState({});
  const [stake, setStake] = useState(0);
  const [betPartner, setBetPartner] = useState("");

  const { trigger: addHabit } = useAddHabit();

  const handleAddHabit = async () => {
    const stakeInt = parseInt(stake, 10);
    await addHabit({
      dueDate: new Date(dueDate),
      habitTitle,
      stake: stakeInt,
      betPartner,
    });
    setHabitTitle("");
    setDueDate({});
    setStake("");
    setBetPartner("");
  };

  const switchToBet = () => {
    setCurrentContent("bet");
  };

  const handleAddHabitAndSwitchToBet = async () => {
    await handleAddHabit(); // 等待添加习惯操作完成
    switchToBet(); // 切换到 "bet" 内容
  };

  const data = useHabit();
  useEffect(() => {}, [data]);


  const returntohabit = () => {
    setCurrentContent("habit");
  };

  const returntoMain = () => {
    setCurrentContent("Main");
  };

  const handleAddHabitAndSwitchToMain = async () => {
    await handleAddHabit(); // 等待添加习惯操作完成
    returntohabit(); 
  };



    // 處理表單提交
    const handleFormSubmit = (e) => {
        e.preventDefault(); // 防止表單提交
        // 在這裡處理表單數據
    };

    return (
        <form onSubmit={handleFormSubmit}>
        <div>
        {currentContent === "habit" && (
        <div>
          <div>{/* 第一組 */}
          <div className="w-96 h-11 left-[88px] top-[228px] absolute">
            <div className="left-0 top-[2px] absolute text-black text-4xl font-bold font-['Roboto']">Habit</div>
            <div className="w-96 h-11 left-[202px] top-0 absolute">
              <div className="w-96 h-11 left-0 top-0 absolute bg-white rounded border border-gray-300">
                <input
                  type="text"
                  name="habitTitle"
                  className="w-full border rounded"
                  placeholder="What’s the habit?"
                  value={habitTitle}
                  onChange={(e) => setHabitTitle(e.target.value)}
                />
              </div>
              <div className="left-[16px] top-[11px] absolute opacity-80 text-zinc-700 text-xl font-light font-['Public Sans']">
              </div>
            </div>
          </div>
        </div>{/* 第一組結束 */}

        <div>{/* 第二組 */}
          <div className="w-96 h-11 left-[88px] top-[376px] absolute">
            <div className="left-0 top-[2px] absolute text-black text-4xl font-bold font-['Roboto']">Due Date</div>
            <div className="w-96 h-11 left-[202px] top-0 absolute">
              <div className="w-96 h-11 left-0 top-0 absolute bg-white rounded border border-gray-300">
              <Flatpickr
                value={dueDate}
                options={{
                  dateFormat: "Y-m-d",
                  minDate: new Date().fp_incr(1), // tomorrow
                }}
                onChange={(date) => {
                  setDueDate(date[0]);
                }}
              />
              </div>
              <div className="left-[16px] top-[11px] absolute opacity-80 text-zinc-700 text-xl font-light font-['Public Sans']">
              </div>
            </div>
          </div>
        </div> {/* 第二組結束 */}

        <div>{/* 第三組 */}
          <div className="w-64 h-20 right-[40px] top-[477px] absolute bg-pink-900 rounded-2xl shadow border-2 border-black border-opacity-5">
            <button type="submit" onClick={handleAddHabitAndSwitchToBet} className="w-56 h-16 left-[17px] top-[12px] absolute text-center text-white text-2xl font-semibold font-['Inter'] leading-loose">
              Next, place a bet
            </button>
          </div>
        </div>{/* 第三組結束 */}
        </div>
      )}






   {/* BET Page */}
      {currentContent === "bet" && (
        <div>
          <div className="bg-stone-200 flex flex-col px-5 rounded-3xl">
          <div className="self-center flex w-full max-w-[994px] flex-col mt-20 mb-14 max-md:max-w-full">
          <div className="flex w-[951px] max-w-full flex-col">
              {/* Title: How do you want to bet? */}
              <div className="text-black text-5xl font-semibold leading-[62.4px] max-md:max-w-full max-md:text-4xl">
                
                How do you want to bet?
            
              </div>
  
              <div className="flex w-full items-start justify-between gap-5 mt-28 max-md:max-w-full max-md:flex-wrap">
                  <div className="text-black text-4xl font-bold self-center my-auto">
                      Bets
                  </div>
  
                  <div className="self-stretch flex flex-col grow shrink-0 basis-auto max-md:max-w-full">
                      <div className="rounded border bg-white self-stretch flex grow flex-col pl-4 pr-5 py-3.5 border-solid border-gray-300 max-md:max-w-full">
                      {/* Question: How much do you want to bet? */}
                      <div className="text-zinc-700 text-xl font-light opacity-80 mt-0.5 -mb-0.5">
                      
                        <input
                    type="Number"
                    name="stake"
                    className="w-full border rounded"
                    placeholder="How much do you want to bet?"
                    value={stake}
                    onChange={(e) => setStake(e.target.value)}
                />
                      </div>
                      </div>
                  </div>
              </div>
              <div className="flex w-full items-start justify-between gap-5 mt-28 max-md:max-w-full max-md:flex-wrap">
              <div className="text-black text-4xl font-bold max-w-[260px] self-center grow shrink-0 basis-auto my-auto">
                  {/* Title: Betting partner */}
                  Betting Partner
              </div>
              <div className="self-stretch flex flex-col grow shrink-0 basis-auto max-md:max-w-full">
                  <div className="rounded border bg-white self-stretch flex grow flex-col pl-4 pr-5 py-3.5 border-solid border-gray-300 max-md:max-w-full">
                  {/* Question: Who do you want to bet with? */}
                  <div className="text-zinc-700 text-xl font-light opacity-80 mt-0.5 -mb-0.5">
                      
                      <input
                type="text"
                name="betPartner"
                className="w-full border rounded"
                placeholder="Who do you want to bet with?"
                value={betPartner}
                onChange={(e) => setBetPartner(e.target.value)}
            />
                  </div>
                  </div>
              </div>
              </div>
          </div>
          <div className="flex w-[537px] max-w-full items-start justify-between gap-5 mt-40 max-md:flex-wrap">
              <div className="justify-center items-center shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] bg-stone-400 self-stretch flex w-[159px] max-w-full flex-col px-5 py-8 rounded-3xl border-2 border-solid border-[rgba(0,0,0,0.06)]">
              {/* Button: Return */}
                <button onClick={handleAddHabitAndSwitchToMain} className="justify-center text-white text-center text-2xl font-semibold leading-8 self-center w-[248px] -mt-px">
                    Return
                </button>

              </div>
              <div className="justify-center items-center shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] bg-pink-900 self-stretch flex w-[350px] max-w-full flex-col grow shrink-0 basis-auto px-5 py-7 rounded-3xl border-2 border-solid border-[rgba(0,0,0,0.06)]">
              {/* Button: Let go and create habits! */}
        
                <button type="submit" className="justify-center text-white text-center text-2xl font-semibold leading-8 self-center mb-0" >
                  Let go and create habits!
             
              </button>

              </div>
          </div>
          </div>
      </div>
        </div>
)}

        



       
      </div>
      </form>
      
      );
      
}
