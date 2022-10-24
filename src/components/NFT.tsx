import { BsChevronDown } from 'react-icons/bs';
import { FaArrowDown, FaLink } from 'react-icons/fa';

import { LineChart } from './lineChart';

export const NFT = () => {
  return (
    <>
      <div className="grid-cols-9 lg:h-[310px] max-w-xs mx-auto sm:max-w-2xl lg:max-w-full rounded-xl h-auto  w-full  grid ">
        <div className="relative col-start-1  lg:col-span-3 col-span-11 h-[310px] rounded-xl bg-secondary">
          <img
            className="h-full w-full  object-cover rounded-xl "
            src="https://ipfs.io/ipfs/QmYDvPAXtiJg7s8JdRBSLWdgSphQdac8j1YuQNNxcGE1hg/916.png"
            alt=""
          />
          <div className="absolute p-5  top-0 w-full flex-col  flex justify-between h-full bg-gray-900 bg-opacity-60 ">
            <div className="flex justify-between items-center">
              <p>2022-10-22</p>
              <p>Azuki</p>
            </div>
            <div className="flex justify-between items-center ">
              <div>
                <button className="bg-[#6001D3] rounded-full  px-5 ">
                  more
                </button>
              </div>
              <div>
                <p>Azuki floor price</p>
                <div className="flex">
                  <div className="flex space-x-2 items-center text-[#FD346E]">
                    <img src="/eth.png" className="w-4" />
                    <FaArrowDown className="-rotate-45 text-sm" />
                    <p className="text-sm">-0.42%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-secondary col-start-1 col-span-11 overflow-hidden lg:col-start-4 lg:col-span-3 p-8">
          <div className="w-full grid grid-cols-7 my-auto  ">
            {/* 1 */}
            <div className=" col-start-1 col-span-2 lg:col-span-2  flex items-center">
              <p className="text-sm lg:text-lg text-center">Azuki</p>
            </div>
            <div className="lg:col-start-3 lg:col-span-4 col-start-3 col-span-5 flex justify-center">
              <input
                type="text"
                placeholder="0.0"
                className="rounded-full w-full bg-transparent border text-center p-1"
              />
            </div>
            <div className="col-span-5 col-start-2 my-1"></div>
            <div className=" col-start-1 col-span-2 lg:col-span-2  flex pl-4   ">
              <FaLink size={12} className="-rotate-45" />
            </div>
            <div className="col-start-2 col-span-3  "></div>
            <div className="col-span-5 col-start-2 my-2"></div>
            {/* 2 */}
            <div className=" col-start-1 col-span-2 lg:col-span-2 flex  items-center">
              <p className="text-sm lg:text-lg text-center">ETH</p>
            </div>
            <div className="lg:col-start-3 lg:col-span-4 col-start-3 col-span-5 flex justify-center">
              <input
                type="text"
                placeholder="0.0"
                className=" text-center rounded-full w-full p-1 "
              />
            </div>
            {/* 2 */}
            <div className="col-span-5 col-start-2 my-1"></div>
            <div className="col-start-1 col-span-1"></div>
            <div className="lg:col-start-2 col-start-3 flex justify-center col-span-6 ">
              <BsChevronDown size={26} />
            </div>
            {/* 2 */}
            <div className="col-span-5 col-start-2 my-2"></div>
            <div className=" col-start-1 col-span-2 lg:col-span-2 flex items-center">
              <p className="text-sm lg:text-lg text-center">uAzuki</p>
            </div>
            <div className="lg:col-start-3 lg:col-span-4 col-start-3 col-span-5 flex justify-center">
              <input
                type="text"
                placeholder="0.0"
                className="text-center rounded-full w-full p-1"
              />
            </div>
            {/* 2 */}
            <div className="col-span-5 col-start-2 my-2"></div>
            <div className="col-start-1 col-span-1 "></div>
            <div className="col-start-3 lg:col-start-2 col-span-6 ">
              <button className="w-full text-center text-xl lg:text-2xl text-blueText">
                BUY
              </button>
            </div>
          </div>
        </div>
        <div className="col-start-1 col-span-11 lg:col-start-7 bg-black/20  lg:col-span-3 grid grid-cols-4 p-8 lg:px-12 ">
          <div className="col-start-1 col-span-2  ">
            <p className="text-text ">uAzuki</p>
            <p className="text-xs text-pink">11.8%</p>
            <div className="flex  ">
              <div className="w-4">
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
    </>
  );
};
