import { useAppContext } from "@/context/AppContextProvider";
import { Swap } from "@/pages";
import { useState } from "react";
import { BsChevronDown } from "react-icons/bs";

export const TradeCard = () => {
  const [nftDataToby, setNFTdataToBy] = useState();
  const [ethValue, setEthvalue] = useState();
  const [unftDataToby, setuNFTdataToBy] = useState();
  const { NFTDATA } = useAppContext();
  return (
    <div className="col-start-1 col-span-6 sm:col-start-1 sm:col-span-3 flex flex-col items-center space-y-4 ">
      <h1 className="text-center lg:text-left w-full py-2 lg:px-8 lg:py-3 text-lg sm:text-xl lg:text-2xl font-semibold">
        Trade
      </h1>
      <div className="flex flex-col items-center  w-full max-w-[240px] space-y-4">
        <div className="rounded-full  w-full text-center p-1  bg-transparent border">
          <select
            onChange={(e: any) => {
              setuNFTdataToBy(e.target.value);
            }}
            className="rounded-full w-[80%]   text-center  bg-transparent "
          >
            {NFTDATA &&
              NFTDATA?.map((nft: any, index: number) => {
                return (
                  <option
                    selected={index == 0 && true}
                    className="w-full text-center "
                    value={nft.id}
                  >
                    {"u" + nft.name}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="col-start-1 col-span-6 grid grid-cols-6 items-center space-y-4">
          <div className="col-start-1 col-span-6 bg-white rounded-full flex items-center px-3 space-x-1 ">
            <div className="w-4 ">
              <img className="object-cover" src="/eth.png" alt="" />
            </div>
            <input
              placeholder="0.0"
              type="text"
              className="w-full text-black py-1 border-none focus:outline-none focus:border-none rounded-full  placeholder:text-gray-800 "
            />
          </div>
          <div className="col-start-1 col-span-6 flex justify-center">
            <Swap />
          </div>
          <div className="col-start-1 col-span-6 bg-white rounded-full flex items-center px-3 space-x-1 ">
            <div className="w-4 ">
              <img className="object-cover" src="/eth.png" alt="" />
            </div>
            <input
              placeholder="0.0"
              type="text"
              className="w-full text-black py-1 border-none focus:outline-none focus:border-none rounded-full  placeholder:text-gray-800 "
            />
          </div>
        </div>
        <div className="w-full">
          <div className="flex justify-between">
            <p className="text-sm">Estimated APY:</p>
            <p className="text-sm">0.003%</p>
          </div>
          <div className="flex  justify-between">
            <p className="text-sm">Unlock Date: </p>
            <p className="text-sm">10/26/2022</p>
          </div>
        </div>
        <button className="col-start-1 col-end-7 text-lg  sm:text-2xl text-blueText ">
          BUY
        </button>
      </div>
    </div>
  );
};
