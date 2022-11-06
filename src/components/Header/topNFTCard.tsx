import { useAppContext } from "@/context/AppContextProvider";
import { useEffect } from "react";
import { LineChart } from "../lineChart";
import { Stats } from "./Stats";

interface INFTInfo {
  name: string;
  slug: string;
  img: string;
  floorPrice: number;
  variation: number;
  displayName: string;
}

export const TopNFTCard = () => {
  const { unftData } = useAppContext();


  useEffect(() => {
    console.log("hey wdup", unftData[0])
  }, [])
  return (
    <>
      <div className="grid grid-cols-6 col-span-6 col-start-1 bg-secondary sm:max-h-[270px] ">
        <div className="h-[270px] sm:col-start-1 sm:col-span-3 col-start-1 col-span-6 rounded-xl">
          <img
            className="h-[100%] w-[100%]  object-cover object-center rounded-xl"
            src={unftData[0]?.img}
            alt=" h-[100%] w-[100%]"
          />
        </div>
        <div className="col-start-1 sm:col-start-4 sm:col-span-4 col-span-6 grid grid-cols-5 items-center px-6  min-h-[250px]">
          <Stats
            displayName={unftData[0]?.display_name}
            variation={unftData && unftData[0].variation_eth}
            floorPrice={unftData && unftData[0].floor_price}
          />
          <Stats
            displayName={"u" + unftData[0].display_name}
            variation={unftData && unftData[0].variation_eth}
            floorPrice={unftData && unftData[0].floor_price}
          />
        </div>
      </div>
    </>
  );
};
