import React, { useState } from 'react';

const HabitComponent = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleCheck = () => {
    if (!isChecked) {
      setIsChecked(true);
      setIsHovered(false);
    }
  };

  return (
    <div className="justify-center bg-stone-200 self-center w-full max-w-[1178px] mt-px p-5 rounded-3xl max-md:max-w-full">
      <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
        <div className="flex flex-col items-stretch w-[11%] max-md:w-full">
          <p>有圖片</p>
        </div>
        <div className="flex flex-col items-stretch w-[63%] ml-5 max-md:w-full">
          <div className="flex flex-col my-auto max-md:max-w-full max-md:mt-12">
            <div className="text-black text-2xl font-semibold leading-8 w-[652px] max-w-full">
              瘦身
            </div>
            <div className="text-black text-base w-[636px] max-w-full mt-2.5">
              剩餘天數
            </div>
            <div className="bg-zinc-700 flex w-[636px] max-w-full grow flex-col mt-1.5 pr-5 rounded-xl">
              <div className="bg-stone-400 flex w-[540px] h-3 flex-col rounded-xl max-md:max-w-full" />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-stretch w-[26%] ml-5 max-md:w-full">
          <div
            className={`justify-center items-center shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] flex w-[267px] max-w-full flex-col m-auto px-5 py-7 rounded-3xl border-2 border-solid ${
              isChecked ? 'bg-stone-300 border-stone-300 cursor-not-allowed' : isHovered ? 'bg-stone-300 border-stone-300' : 'bg-white border-[rgba(0,0,0,0.06)]'
            } max-md:mt-11`}
            onClick={handleCheck}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ cursor: 'pointer' }} // 添加 cursor 樣式
          >
            <div className={`justify-center text-center text-2xl font-semibold leading-8 self-center w-[248px] -mb-0.5 ${isChecked ? 'text-white' : 'text-black'}`}>
              {isChecked ? 'Checked' : 'Daily Check'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitComponent;
