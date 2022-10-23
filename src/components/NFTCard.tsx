// eslint-disable-next-line tailwindcss/no-custom-classname
import { LineChart } from './lineChart';

export const NFTCard = () => {
  return (
    <>
      {/* header card */}
      <div className="lg:flex space-y-10 lg:space-y-0 items-center ">
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
        <div className=" lg:w-[50%] grid grid-cols-6 bg-secondary rounded-xl max-w-xs sm:max-h-[270px] sm:max-w-2xl mx-auto">
          <div className="h-[270px] sm:col-start-1 sm:col-span-3 col-start-1 col-span-6 rounded-xl">
            <img
              className="h-[100%] w-[100%]  object-cover object-center rounded-xl"
              src="https://ipfs.io/ipfs/QmYDvPAXtiJg7s8JdRBSLWdgSphQdac8j1YuQNNxcGE1hg/916.png"
              alt=" h-[100%] w-[100%]"
            />
          </div>
          <div className="col-start-1 sm:col-start-4 sm:col-span-4 col-span-6 grid grid-cols-5 items-center px-6  min-h-[250px]">
            <div className="col-start-1 col-span-2 ">
              <p className="text-text">uAzuki</p>
              <div className="flex text-pink ">
                <div className="w-5">
                  <img src="/eth.png" className="object-cover" alt="" />
                </div>
                <p>11.8%</p>
              </div>
            </div>
            {/* stats */}
            <div className="col-start-3 col-span-3">
              <LineChart />
            </div>
            <div className="col-start-1 col-span-2 ">
              <p className="text-text">uAzuki</p>
              <div className="flex text-pink ">
                <div className="w-5">
                  <img src="/eth.png" className="object-cover" alt="" />
                </div>
                <p>11.8%</p>
              </div>
            </div>
            {/* stats */}
            <div className="col-start-3 col-span-3">
              <LineChart />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
