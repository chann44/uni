export const Hero = () => {
  return (
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
  );
};
