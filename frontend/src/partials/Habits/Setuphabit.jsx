import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Setuphabit() {
    const [habitTitle, setHabitTitle] = useState('');
    const [dueDate, setDueDate] = useState('');

    // 處理表單提交
    const handleFormSubmit = (e) => {
        e.preventDefault(); // 防止表單提交
        // 在這裡處理表單數據
    };

    return (
      
      <form
      onSubmit={handleFormSubmit}
  >
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
<div className="w-96 h-11 left-[88px] top-[376px] absolute">
<div className="left-0 top-[2px] absolute text-black text-4xl font-bold font-['Roboto']">Due Date</div>
<div className="w-96 h-11 left-[202px] top-0 absolute">
  <div className="w-96 h-11 left-0 top-0 absolute bg-white rounded border border-gray-300">
    
    <input
        type="date"
        name="dueDate"
        className="w-full border rounded"
        placeholder="What’s the date?"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
  </div>
  <div className="left-[16px] top-[11px] absolute opacity-80 text-zinc-700 text-xl font-light font-['Public Sans']">
    
  </div>
</div>
</div>
<div className="w-64 h-20 right-[40px] top-[477px] absolute bg-pink-900 rounded-2xl shadow border-2 border-black border-opacity-5">
<Link to="/zoo/Setupbet">
  <button type="submit" className="w-56 h-16 left-[17px] top-[12px] absolute text-center text-white text-2xl font-semibold font-['Inter'] leading-loose">
    Next, place a bet
  </button>
</Link>
</div>
</form>

      
  );
}
