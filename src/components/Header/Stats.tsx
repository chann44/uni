import { LineChart } from "../lineChart";

interface INFTInfo {
  floorPrice: number;
  variation: number;
  displayName: string;
}

export const Stats = ({ floorPrice, variation, displayName }: INFTInfo) => {
  return (
    <>
      {/* chart and floor price stats */}
      <div className="col-start-1 col-span-2 ">
        <p className="text-text mb-3">{displayName} floor price</p>
        <p className="text-xs text-pink">{variation} %</p>
        <div className="flex space-y-1  ">
          <div className="w-5 mr-2">
            <img src="/eth.png" className="object-cover" alt="" />
          </div>
          <p className="text-sm">{floorPrice} ETH</p>
        </div>
      </div>
      {/* stats */}
      <div className="col-start-3 col-span-3">
        <LineChart />
      </div>
    </>
  );
};
