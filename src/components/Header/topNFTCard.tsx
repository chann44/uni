import { LineChart } from "../lineChart";
import { Stats } from "./Stats";

export const TopNFTCard = () => {
  return (
    <>
      <div className="grid grid-cols-6 col-span-6 col-start-1 bg-secondary sm:max-h-[270px] ">
        <div className="h-[270px] sm:col-start-1 sm:col-span-3 col-start-1 col-span-6 rounded-xl">
          <img
            className="h-[100%] w-[100%]  object-cover object-center rounded-xl"
            src="https://ipfs.io/ipfs/QmYDvPAXtiJg7s8JdRBSLWdgSphQdac8j1YuQNNxcGE1hg/916.png"
            alt=" h-[100%] w-[100%]"
          />
        </div>
        <div className="col-start-1 sm:col-start-4 sm:col-span-4 col-span-6 grid grid-cols-5 items-center px-6  min-h-[250px]">
          <Stats />
          <Stats />
        </div>
      </div>
    </>
  );
};
