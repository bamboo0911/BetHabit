import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Setupbet() {

    const [stake, setStake] = useState(''); 
    const [betPartner, setBetPartner] = useState(''); 

    return (
      // <Layout>
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
              <Link to="/zoo/mui/modal">
                <div className="justify-center text-white text-center text-2xl font-semibold leading-8 self-center w-[248px] -mt-px">
                    Return
                </div>
              </Link>
              </div>
              <div className="justify-center items-center shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] bg-pink-900 self-stretch flex w-[350px] max-w-full flex-col grow shrink-0 basis-auto px-5 py-7 rounded-3xl border-2 border-solid border-[rgba(0,0,0,0.06)]">
              {/* Button: Let go and create habits! */}
              <Link to="/zoo/mui/modal">
                <div type="submit" className="justify-center text-white text-center text-2xl font-semibold leading-8 self-center mb-0">
                  Let go and create habits!
             
              </div>
              </Link>
              </div>
          </div>
          </div>
      </div>
      // </Layout>
    );
  }
  
