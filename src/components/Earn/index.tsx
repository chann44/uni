import { useState } from "react";

// earn with eth card
export const EarnCard = () => {
  const [value, setValue] = useState("");
  return (
    <div className="p-2 sm:p-6 lg:p-8 space-y-4 sm:space-y-5 lg:space-y-8 flex flex-col items-center ">
      <div className="grid grid-cols-6 items-center bg-secondary py-6 lg:py-12 w-full max-w-lg sm:max-w-2xl rounded-2xl space-y-4 sm:space-y-6">
        <div className="col-start-1 col-end-7 flex flex-col items-center space-y-2">
          <img src="/eu.png" className="w-24 sm:w-28 lg:w-32 " alt="" />
          <p className="sm:text-lg  lg:text-xl text-text">Earn With ETH</p>
        </div>
        <div className="col-start-1 sm:col-start-2 sm:col-span-3 col-span-6 grid grid-cols-6  sm:grid-cols-3 items-center">
          <div className="col-start-2 col-span-4 bg-white rounded-full flex items-center px-3 space-x-1 ">
            <div className="w-4 ">
              <img className="object-cover" src="/eth.png" alt="" />
            </div>
            <input
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              placeholder="0.0"
              type="text"
              className="w-full text-black py-1 border-none focus:outline-none focus:border-none rounded-full  placeholder:text-gray-800 "
            />
          </div>
        </div>
        <div className="col-start-2 col-span-4  sm:col-start-3 sm:col-span-2 ">
          <div className="border text-center rounded-full  py-1 ">
            <p>! week</p>
          </div>
        </div>
        <div className="col-start-2 space-y-3 col-span-4  sm:col-start-3 sm:col-span-2 ">
          <div className="flex justify-between">
            <p className="text-sm">Estimated APY:</p>
            <p className="text-sm">0.003%</p>
          </div>
          <div className="flex  justify-between">
            <p className="text-sm">Unlock Date: </p>
            <p className="text-sm">10/26/2022</p>
          </div>
        </div>
        <button className="col-start-1 col-end-7 text-lg  sm:text-2xl text-[#B78E3E] ">
          STAKE
        </button>

        <a
          href=""
          className="col-start-1 col-span-6  text-center text-lg sm:text-xl underline"
        >
          View my Stackings
        </a>
      </div>
    </div>
  );
};
