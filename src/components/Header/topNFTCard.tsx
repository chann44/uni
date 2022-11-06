import { useAppContext } from "@/context/AppContextProvider";
import { useEffect, useState } from "react";
import { LineChart } from "../lineChart";
import { Stats } from "./Stats";
import { getData } from "../../controllers/useNFTHistory"
import { HIstoryData } from "@/controllers/uttils";


export const TopNFTCard = () => {
  const { unftData } = useAppContext();

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
            slug={unftData[0].slug}
            history_data_table={unftData[0].history_data_table}
          />
          <Stats
            displayName={"u" + unftData[0].display_name}
            variation={unftData && unftData[0].variation_eth}
            floorPrice={unftData && unftData[0].floor_price}
            history_data_table={unftData[0].history_data_table}
            slug={unftData[0].slug}
          />
        </div>
      </div>
    </>
  );
};
