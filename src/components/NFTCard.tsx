// eslint-disable-next-line tailwindcss/no-custom-classname
import { BsChevronDown } from 'react-icons/bs';

import { LineChart } from './lineChart';

export const NFTCard = () => {
  return (
    <>
      {/* header card */}
      <div className="lg:flex space-y-10 lg:space-y-0 items-center  h-auto ">
        {/* header left card */}
        <div className="lg:w-[50%] space-y-5  lg:space-y-8 lg:pl-8">
          <div className="">
            <p className="gradient-text mx-auto lg:mx-0">uniAsset.io</p>
            <h1 className="fluid text-white text-center font-extrabold lg:text-left leading-relaxed  ">
              Trade BlueChip NFT
            </h1>
            <h1 className="fluid text-white text-center font-extrabold lg:text-left leading-relaxed  ">
              With $1 Dollar
            </h1>
            <p className="my-6 sm:text-2xl lg:text-4xl text-xl   text-center lg:text-left leading-loose">
              Safe, Fast, Simple
            </p>
          </div>
          <div className="flex space-x-6 justify-center lg:justify-start  ">
            <button className="btn-blue-shad bg-blueButton px-6 rounded-full sm:px-12 py-1">
              Explore
            </button>
            <button className="btn-yellow-shad bg-yellowButton px-6 rounded-full sm:px-16 py-1">
              Earn
            </button>
          </div>
        </div>
        {/* header right card */}
        <div className=" lg:w-[50%] grid grid-cols-6  rounded-2xl max-w-xs  sm:max-w-2xl mx-auto space-y-8">
          <div className="grid grid-cols-6 col-span-6 col-start-1 bg-secondary sm:max-h-[270px] ">
            <div className="h-[270px] sm:col-start-1 sm:col-span-3 col-start-1 col-span-6 rounded-xl">
              <img
                className="h-[100%] w-[100%]  object-cover object-center rounded-xl"
                src="https://ipfs.io/ipfs/QmYDvPAXtiJg7s8JdRBSLWdgSphQdac8j1YuQNNxcGE1hg/916.png"
                alt=" h-[100%] w-[100%]"
              />
            </div>
            <div className="col-start-1 sm:col-start-4 sm:col-span-4 col-span-6 grid grid-cols-5 items-center px-6  min-h-[250px]">
              <div className="col-start-1 col-span-2 ">
                <p className="text-text ">uAzuki</p>
                <p className="text-xs text-pink">11.8%</p>
                <div className="flex  ">
                  <div className="w-5">
                    <img src="/eth.png" className="object-cover" alt="" />
                  </div>
                  <p className="text-sm">11.8%</p>
                </div>
              </div>
              {/* stats */}
              <div className="col-start-3 col-span-3">
                <LineChart />
              </div>
              <div className="col-start-1 col-span-2 ">
                <p className="text-text ">uAzuki</p>
                <p className="text-xs text-pink">11.8%</p>
                <div className="flex  ">
                  <div className="w-5">
                    <img src="/eth.png" className="object-cover" alt="" />
                  </div>
                  <p className="text-sm">11.8%</p>
                </div>
              </div>

              {/* stats */}
              <div className="col-start-3 col-span-3">
                <LineChart />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="  mx-auto w-full max-w-xs rounded-2xl sm:max-w-full  flex lg:justify-end my-6 sm:my-8 lg:my-1  box-border ">
        <div className="py-6 sm:max-w-2xl bg-secondary lg:w-[50%] grid grid-cols-6 w-full rounded-xl mx-auto lg:mx-0">
          <div className="col-start-1 col-span-6 sm:col-start-1 sm:col-span-3 flex flex-col items-center space-y-4 ">
            <h1 className="text-center lg:text-left w-full py-2 lg:px-8 lg:py-3 text-lg sm:text-xl lg:text-2xl font-semibold">
              Trade
            </h1>
            <div className="flex flex-col items-center  w-full max-w-[240px] space-y-4">
              <select className="rounded-full  w-full text-center p-3 bg-transparent border">
                <option className="w-full text-center " value="uAzuki">
                  uAzuki
                </option>
              </select>
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
              <button className="col-start-1 col-end-7 text-lg  sm:text-2xl text-blueText ">
                BUY
              </button>
            </div>
          </div>
          <div className="col-start-1 col-span-6 flex flex-col items-center sm:col-start-4 sm:col-span-3 space-y-4">
            <h1 className="text-center lg:text-right w-full  py-2 font-extrabold lg:px-8 lg:py-3 text-lg sm:text-xl lg:text-2xl">
              Earn
            </h1>
            <div className="flex flex-col items-center  w-full  max-w-[240px] ">
              <div className="grid grid-cols-6 items-center w-full space-y-4">
                <div className="col-start-1 col-end-7 flex flex-col items-center">
                  <img src="/eu.png" className="w-16  " alt="" />
                  <p className="text-sm text-text">Earn With ETH</p>
                </div>
                <div className="col-start-1 col-span-6 grid grid-cols-6 items-center ">
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
                <div className="col-start-1 col-span-6">
                  <select className="rounded-full  w-full text-center p-3 bg-transparent border">
                    <option className="w-full text-center " value="uAzuki">
                      1 week
                    </option>
                  </select>
                </div>
                <div className="col-start-1  col-span-6">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
