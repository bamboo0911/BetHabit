import * as React from "react";
function WhoWonComponent({ userWon }) {
  return (
    <main className="bg-stone-200 flex flex-col px-5 rounded-3xl">
      <section className="self-center flex w-[618px] max-w-full flex-col ml-9 mt-20">
        <h1 className="text-black text-center text-5xl font-black leading-[62.4px] self-center ml-0 max-md:text-4xl">
          Who Won?
        </h1>
        <div className="self-stretch mt-16 max-md:max-w-full">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
            <div className="flex flex-col items-stretch w-[47%] max-md:w-full">
              <div className="flex flex-col my-auto max-md:mt-12">
                <img
                  loading="lazy"
                  src= "frontend/src/images/bao.jpeg" // 替换为 BamBoo 的图片 URL
                  className={`aspect-square object-cover object-center w-${userWon ? '[124px]' : 'full'} overflow-hidden shrink-0`}
                  alt="BamBoo"
                />
                <h2 className={`text-black text-4xl font-${userWon ? 'light' : 'bold'} mt-5`}>
                  BamBoo
                </h2>      
              </div>
            </div>
            <div className="flex flex-col items-stretch w-[53%] ml-5 max-md:w-full">
              <div className="flex grow flex-col max-md:mt-12">
                <img
                  loading="lazy"
                  srcSet= {"frontend/src/images/machima.png"} // 替换为 Sally 的图片 URL
                  className={`aspect-square object-cover object-center w-${userWon ? 'full' : '[124px]'} overflow-hidden self-stretch`}
                  alt="Sally"
                />
                <h2 className={`text-black text-center text-4xl font-${userWon ? 'bold' : 'light'} self-center w-[174px] -ml-2.5 mt-1.5`}>
                  Sally
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="self-center flex w-[939px] max-w-full flex-col mt-9 mb-16">
        <div className={`justify-center items-center shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] bg-pink-900 self-stretch flex flex-col px-5 py-7 rounded-3xl border-2 border-solid border-[rgba(0,0,0,0.06)] max-md:max-w-full ${userWon ? 'winner' : ''}`}>
          <div className={`justify-center text-white text-center text-2xl font-semibold leading-8 self-center max-w-[586px] -ml-1 max-md:max-w-full ${userWon ? 'winner' : ''}`}>
            {userWon ? '恭喜SALLY獲得來自BAMBOO的30枚說說幣！' : '恭喜BAMBOO獲得來自SALLY的30枚說說幣！'}
          </div>
        </div>
        <h2 className={`justify-center text-pink-900 text-center text-2xl font-black tracking-wider uppercase self-center max-w-[405px] mt-5 ${userWon ? 'winner' : ''}`}>
          {userWon ? '誰還敢說SALLY是說說怪?' : 'Sally肯定是説説怪 = ='}
        </h2>
      </section>
    </main>
  );
}

export default WhoWonComponent;


