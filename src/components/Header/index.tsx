// eslint-disable-next-line tailwindcss/no-custom-classname

import { EarnTopCard } from "./earnTopCard";
import { Hero } from "./hero";
import { TopNFTCard } from "./topNFTCard";
import { TradeCard } from "./TradeCard";

export const NFTCard = () => {
  return (
    <>
      {/* header card */}
      <div className="lg:flex space-y-10 lg:space-y-0 items-center  h-auto ">
        {/* header left card */}
        <Hero />
        {/* header right card */}
        <div className=" lg:w-[50%] grid grid-cols-6  rounded-2xl max-w-xs  sm:max-w-2xl mx-auto space-y-8">
          <TopNFTCard />
        </div>
      </div>
      {/* botoom card for Trade and Earn */}
      <div className="  mx-auto w-full max-w-xs rounded-2xl sm:max-w-full  flex lg:justify-end my-6 sm:my-8 lg:my-1  box-border ">
        <div className="py-6 sm:max-w-2xl bg-secondary lg:w-[50%] grid grid-cols-6 w-full rounded-xl mx-auto lg:mx-0">
          <TradeCard />
          <EarnTopCard />
        </div>
      </div>
    </>
  );
};
