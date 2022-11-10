import { getData } from "@/controllers/useNFTHistory";
import { HIstoryData } from "@/controllers/uttils";
import { useEffect, useState } from "react";
import { LineChart } from "../lineChart";
import { Loading } from "../Loading";

interface INFTInfo {
  floorPrice: number;
  variation: number;
  displayName: string;
  slug: string
  history_data_table: string
}

export const Stats = ({ floorPrice, variation, displayName, slug, history_data_table }: INFTInfo) => {
  const [historydata, setHistoryData] = useState<HIstoryData[]>()
  useEffect(() => {
    (
      async () => {

        const res = await getData(7, history_data_table, slug)

        setHistoryData((prev: any) => {
          return res.NFTHistoryInfo
        }
        )
      }
    )()
  }, [history_data_table])


  useEffect(() => {

  }, [historydata])


  return (
    <>
      {/* chart and floor price stats */}
      {
        historydata && <>
          <div className="col-start-1 col-span-2 ">
            <p className="text-text text-xs mb-3">{displayName} floor price</p>
            <p className="text-xs text-pink ">{variation} %</p>
            <div className="flex space-y-2  ">
              <div className="w-5 mr-2">
                <img src="/eth.png" className="object-cover" alt="" />
              </div>
              <p className="text-xs">{floorPrice} ETH</p>
            </div>
          </div>
          {/* stats */}
          <div className="col-start-3 col-span-3">
            <LineChart Data={historydata} />
          </div>
        </>
      }
    </>
  );
};
