import { LineChart } from "../lineChart";

export const Stats = () => {
  return (
    <>
      {/* chart and floor price stats */}
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
    </>
  );
};
