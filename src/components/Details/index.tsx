import { useAppContext } from "@/context/AppContextProvider";
import { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { FaArrowDown } from "react-icons/fa";

export const DetailsComponet = () => {
  const { currentIDDetails, setCurrentIDDetails, unftData } =
    useAppContext();
  const [currentNFTData, setCurrentNFTData] = useState<any>();

  useEffect(() => {
    unftData &&
      unftData.map((nft: any) => {
        if (nft.id == currentIDDetails) {
          setCurrentNFTData(() => {
            return { ...nft };
          });
          return;
        }
      });
  }, [currentIDDetails, unftData]);

  return (
    <div>
      {" "}
      {currentIDDetails && (
        <div className="flex flex-col items-center mb-20">
          <div className="flex flex-col items-center space-y-3 my-8">
            <p className="gradient-text   text-sm ">uniAsset.io</p>
          </div>
          <div className="w-full text-center px-5 sm:max-w-3xl space-y-6">
            <h1 className="text-3xl">{currentNFTData?.slug}</h1>
            <p className="text-xl">{currentNFTData?.description}</p>
          </div>
        </div>
      )}
      <div className="w-full space-y-5 sm:space-y-0  sm:flex  justify-around  max-w-lg sm:max-w-full  mx-auto">
        <div className=" relative w-full sm:w-[50%] ">
          <div className="relative w-full h-[260px] sm:h-[400px]">
            <img
              className="h-full w-full  object-cover rounded-xl "
              alt=""
            />
          </div>
          <div className=" w-full flex justify-between p-6 bg-secondary rounded-b-xl">
            <div className="mx-auto space-y-3 lg:flex justify-between w-full items-center  bg-secondary ">
              <div className="flex flex-col items-center   sm:order-4 ">
                <div className="flex w-full justify-around  ">
                  <h1 className="text-2xl font-extrabold">Price Floor</h1>
                  <div className="sm:hidden flex ">
                    <img src="/eth.png" className="w-4" />
                    <p className="text-xl">-0.42%</p>
                  </div>
                </div>
                <div className="flex justify-center  space-x-6">
                  <div className="flex flex-col items-center">
                    <h1 className="text-xl font-extrabold">24h</h1>
                    <p className="text-sm text-pink">3.5%</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <h1 className="text-xl font-extrabold">7d</h1>
                    <p className="text-sm text-green-500">3.5%</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <h1 className="text-xl font-extrabold">14d</h1>
                    <p className="text-sm text-green-500">3.5%</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <h1 className="text-xl font-extrabold">30d</h1>
                    <p className="text-sm text-pink">3.5%</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center space-x-6 sm:space-x-4 order-0">
                <div className="flex flex-col items-center">
                  <h1 className="text-xl font-extrabold">24k</h1>
                  <p className="text-sm">items</p>
                </div>
                <div className="flex flex-col items-center">
                  <h1 className="text-xl font-extrabold">200k</h1>
                  <p className="text-sm">Owners</p>
                </div>
                <div className="hidden lg:flex flex-col items-center">
                  <h1 className="text-xl font-extrabold"> 11.1 ETH</h1>
                  <p className="text-sm">floor price</p>
                </div>
                <div className="flex flex-col items-center">
                  <h1 className="text-xl font-extrabold">240k</h1>
                  <p className="text-sm">Volumetraded</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-[40%] rounded-2xl  bg-secondary">
          <div className="flex flex-col items-center  ">
            <h1 className="text-center  w-full py-5 lg:px-8 sm:py-12 text-lg sm:text-xl lg:text-2xl font-semibold">
              Trade
            </h1>
            <div className="flex flex-col items-center  w-full max-w-[240px] space-y-4">
              <div className="rounded-full  w-full text-center p-1  bg-transparent border">
                <select className="rounded-full w-[80%]   text-center  bg-transparent ">
                  <option className="w-full text-center " value="uAzuki">
                    uAzuki
                  </option>
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
                  <BsChevronDown
                    className="w-full  font-extrabold text-center"
                    size={25}
                  />
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
              <button className="text-lg py-6  sm:text-2xl text-blueText ">
                BUY
              </button>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};
