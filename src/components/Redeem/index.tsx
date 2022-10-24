import { FaArrowDown } from "react-icons/fa";
import { BsChevronDown } from "react-icons/bs";

export const ReddemComponet = () => {
  return (
    <div className="p-2 sm:p-6 lg:p-8 space-y-4 sm:space-y-5 lg:space-y-8 flex flex-col items-center ">
      <div className="flex flex-col items-center space-y-4">
        <p className="text-sm   gradient-text ">uniAsset.io</p>
        <h1 className="text-lg font-bold sm:text-xl lg:text-4xl">
          Redeem by uNFT
        </h1>
      </div>
      <div className="grid grid-cols-6 items-center bg-[#192431] py-6 lg:py-12 w-full max-w-xl rounded-2xl space-y-4 sm:space-y-6">
        <div className="col-start-1 col-end-7 flex flex-col items-center">
          <img src="/red.png" className="w-24 sm:w-28 lg:w-32 " alt="" />
          <p className="sm:text-lg  lg:text-xl">Get Real NFT by uNFT</p>
        </div>
        <div className="col-start-2 col-span-4  sm:col-start-3 sm:col-span-2 ">
          <div className="border text-center rounded-full  py-1 ">
            <p>Azuki</p>
          </div>
        </div>
        <div className="col-start-1 sm:col-start-2 sm:col-span-3 col-span-6 grid grid-cols-6  sm:grid-cols-3 items-center">
          <p className="col-start-1 col-span-1  text-right pr-6 text-xs sm:text-sm lg:text-lg p-2">
            uAzuki
          </p>
          <div className="col-start-2 col-span-4 ">
            <input
              placeholder="0.0"
              type="text"
              className="w-full py-1 rounded-full text-black placeholder:text-gray-800 text-center "
            />
          </div>
        </div>
        <div className="col-start-3 justify-center col-span-2">
          <BsChevronDown className="m-auto text-2xl" />
        </div>
        <div className="col-start-1 sm:col-start-2 sm:col-span-3 col-span-6 grid grid-cols-6 sm:grid-cols-3 items-center">
          <p className=" p-2 col-start-1 col-span-1  text-right pr-6 text-xs sm:text-sm lg:text-lg">
            Azuki
          </p>
          <div className="col-start-2 col-span-4 ">
            <input
              placeholder="0.0"
              type="text"
              className="w-full py-1 rounded-full text-black placeholder:text-gray-800 text-center "
            />
          </div>
        </div>

        <button className="col-start-1 col-end-7 text-lg  sm:text-2xl text-[#B78E3E] ">
          Redeem
        </button>
      </div>
    </div>
  );
};
