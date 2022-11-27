import { useAppContext } from "@/context/AppContextProvider";
import { processBuy, quoteBuy } from "@/controllers/useBuy";
import { getData } from "@/controllers/useNFTHistory";
import { quoteSell } from "@/controllers/useSell";
import {
  getAmtFromEth,
  getSellAmtFromEth,
  HIstoryData,
} from "@/controllers/uttils";
import { Swap } from "@/pages";
import { INFTDetail, Isales } from "@/types";
import { useEffect, useState } from "react";
import { FaLink } from "react-icons/fa";
import { DetailsChart } from "./Detailchart";

var SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];

function abbreviateNumber(number: number) {
  var tier = (Math.log10(Math.abs(number)) / 3) | 0;
  if (tier == 0) return number;
  var suffix = SI_SYMBOL[tier];
  var scale = Math.pow(10, tier * 3);
  var scaled = number / scale;
  return scaled.toFixed(1) + suffix;
}

export const DetailsComponet = ({
  in_hold,
  history_data_table,
  slug,
  floor_price,
  "24h_volume": volume,
  display_name,
  id,
  img,
  listed_ratio,
  total_supply,
  total_volume,
  variation_eth,
  description,
  uasset_contract_address,
  name,
}: INFTDetail) => {
  const Days = [3, 7, 30, 90, 365];
  const [activeDay, setActiveDay] = useState(Days[2]);
  const [sales, setSales] = useState<Isales>();
  const [chartData, setChartData] = useState<HIstoryData[]>([]);
  const [historyData90, setHistoryData90] = useState<HIstoryData[]>([]);
  const [sevenDayAvgVari, set7DaysAvgVari] = useState<number>();
  const [forteenDaysAvgVari, set14DaysAvgVari] = useState<number>();
  const [thirtyDaysAvgVari, set30DaysAvgVari] = useState<number>();

  useEffect(() => {
    (async () => {
      const res = await getData(30, history_data_table, slug);
      const temp = res.NFTHistoryInfo;
      setHistoryData90(temp);
    })();
  }, []);

  useEffect(() => {
    if (historyData90) {
      const tem = historyData90.map((data: HIstoryData) => {
        var date: any = new Date(Date.parse(data.time.replace(/[-]/g, "/")));
        // let date = Date.parse(kv["time"]);
        let unix_timestamp: any = Date.parse(new Date().toString()) - date;
        date = new Date(unix_timestamp);
        if (date.getDate() == 14) {
          let vari =
            ((floor_price - data.floor_price) * 100) / data.floor_price; //今天-30天前 / 今天
          set14DaysAvgVari(vari);
        }
        if (date.getDate() == 7) {
          let vari =
            ((floor_price - data.floor_price) * 100) / data.floor_price; //今天-30天前 / 今天
          set7DaysAvgVari(vari);
        }
        if (date.getDate() == 30) {
          let vari =
            ((floor_price - data.floor_price) * 100) / data.floor_price; //今天-30天前 / 今天
          set30DaysAvgVari(vari);
        }
      });
    }
  }, [historyData90]);

  const fetchData = async () => {
    const data = await getData(30, history_data_table, slug);
    if (data.sales_data !== undefined) {
      setSales(data.sales_data[0]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const { signer } = useAppContext();
  const [amt, setAmt] = useState<number>(1);
  const [actualAmt, setActualAmt] = useState<string>("");
  const [uactualAmt, setuActualAmt] = useState<string>("");
  const [ethVal, setEthVal] = useState<string>("");
  const [sell, setSell] = useState<boolean>(false);
  const { address, setPopup, popup } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [orderProcess, setOrderProcess] = useState(false);
  const [orderDone, setOrderDone] = useState(false);

  return (
    <div className="space-y-20">
      {
        <div className="flex flex-col items-center mb-20">
          <div className="flex flex-col items-center space-y-3 my-8">
            <p className="gradient-text   text-sm ">uniAsset.io</p>
          </div>
          <div className="w-full text-center px-5 sm:max-w-3xl space-y-6">
            <h1 className="text-3xl">{slug}</h1>
            <p className="text-xl">{description}</p>
          </div>
        </div>
      }
      <div className="w-full space-y-5 sm:space-y-0  sm:flex  justify-around  max-w-lg sm:max-w-full  mx-auto">
        <div className=" relative w-full sm:w-[55%] ">
          <div className="relative w-full h-[260px] sm:h-[400px]">
            <img
              className="h-full w-full  object-cover rounded-xl "
              src={img}
              alt="nft img"
            />
          </div>
          <div className=" w-full flex justify-between p-6 bg-secondary rounded-b-xl">
            <div className="mx-auto space-y-3 lg:flex justify-between w-full items-center  bg-secondary ">
              <div className="flex flex-col items-center   sm:order-4 ">
                <div className="flex w-full justify-around  ">
                  <h1 className="text-2xl font-extrabold">Price Floor</h1>
                  <div className="sm:hidden flex ">
                    <img src="/eth.png" className="w-4" />
                    <p className="text-xl">-0.42%</p>
                  </div>
                </div>
                <div className="flex justify-center  space-x-4">
                  <div className="flex flex-col items-center">
                    <h1 className="text-lg font-extrabold">24h</h1>
                    <p className={"text-sm text-pink"}>{variation_eth}%</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <h1 className="text-lg font-extrabold">7d</h1>
                    <p className={"text-sm text-green-500"}>
                      {sevenDayAvgVari?.toFixed(2)}%
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <h1 className="text-lg font-extrabold">14d</h1>
                    <p className={"text-sm text-green-500"}>
                      {forteenDaysAvgVari?.toFixed(2)}%
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <h1 className="text-lg font-extrabold">30d</h1>
                    <p className={"text-sm text-pink"}>
                      {thirtyDaysAvgVari?.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center space-x-6 sm:space-x-4 order-0">
                <div className="flex flex-col items-center">
                  <h1 className="text-lg font-extrabold">
                    {abbreviateNumber(total_supply)}
                  </h1>
                  <p className="text-sm">items</p>
                </div>
                <div className="flex flex-col items-center">
                  <h1 className="text-xl font-extrabold">
                    {abbreviateNumber(5200)}
                  </h1>
                  <p className="text-sm">Owners</p>
                </div>
                <div className="hidden lg:flex flex-col items-center">
                  <h1 className="text-lg font-extrabold">
                    {" "}
                    {floor_price.toFixed(3)}ETH
                  </h1>
                  <p className="text-sm">floor price</p>
                </div>
                <div className="flex flex-col items-center">
                  <h1 className="text-xl font-extrabold">
                    {abbreviateNumber(total_volume)}
                  </h1>
                  <p className="text-sm">Volumetraded</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-[35%] rounded-2xl  bg-secondary p-7 flex">
          <div className="w-full grid grid-cols-7 my-auto  ">
            <div className=" col-start-1 col-span-2 lg:col-span-2  flex items-center  justify-center ">
              <p className="text-sm  text-center">{display_name}</p>
            </div>
            <div className="lg:col-start-3 lg:col-span-4 col-start-3 col-span-5 flex justify-center">
              <input
                type="text"
                value={uactualAmt}
                placeholder="0.0"
                className="rounded-full w-full bg-transparent border text-center p-1 "
              />
            </div>
            <div className="col-span-5 col-start-2 my-1"></div>
            <div className=" col-start-1 col-span-2 lg:col-span-2  flex  justify-center   ">
              <FaLink size={12} className="-rotate-45 text-center " />
            </div>
            <div className="col-start-2 col-span-3  "></div>
            <div className="col-span-5 col-start-2 my-2"></div>
            <div className=" col-start-1 col-span-2 lg:col-span-2 flex  items-center justify-center">
              <p className="text-sm  text-center">
                {sell ? `u${display_name}` : "ETH"}
              </p>
            </div>
            <div className="lg:col-start-3 lg:col-span-4 col-start-3 col-span-5 flex justify-center">
              <input
                type="text"
                value={sell ? uactualAmt : ethVal}
                onChange={async (e) => {
                  if (sell) {
                    setuActualAmt(e.target.value);
                    const data = await quoteSell(
                      Number(e.target.value),
                      id,
                      slug
                    );
                    setEthVal(data.total_price.toFixed(4));
                  } else {
                    setEthVal(e.target.value);
                    const data = await getAmtFromEth(
                      amt,
                      id,
                      slug,
                      Number(e.target.value)
                    );
                    setActualAmt(data.toString());
                    setuActualAmt(data.toFixed(5));
                  }
                }}
                placeholder="0.0"
                className=" text-center rounded-full w-full p-1 text-black"
              />
            </div>
            <div className="col-span-5 col-start-2 my-1"></div>
            <div className="col-start-1 col-span-1"></div>
            <div className="lg:col-start-2 col-start-3 flex justify-center col-span-6 ">
              <Swap swap={sell} setSwap={setSell} />
            </div>
            <div className="col-span-5 col-start-2 my-2"></div>
            <div className=" col-start-1 col-span-2 lg:col-span-2 flex items-center justify-center">
              <p className="text-sm text-center">
                {sell ? "ETH" : " u" + display_name}
              </p>
            </div>
            <div className="lg:col-start-3 lg:col-span-4 col-start-3 col-span-5 flex justify-center">
              <input
                type="text"
                placeholder="0.0"
                className="text-center rounded-full w-full p-1 text-black"
                onChange={async (e) => {
                  if (sell) {
                    setEthVal(e.target.value);
                    const data = await getSellAmtFromEth(
                      amt,
                      id,
                      slug,
                      Number(e.target.value)
                    );
                    setActualAmt(data.toString());
                    setuActualAmt(data.toFixed(5));
                  } else {
                    setuActualAmt(e.target.value);
                    const data = await quoteBuy(
                      Number(e.target.value),
                      id,
                      slug
                    );
                    setEthVal(data.totalPrice.toFixed(4));
                  }
                }}
                value={sell ? ethVal : uactualAmt}
              />
            </div>
            <div className="col-span-5 col-start-2 my-2"></div>
            <div className="col-start-1 col-span-1 "></div>
            <div className="col-start-3 lg:col-start-2 col-span-6 ">
              <button
                className="w-full text-center text-xl lg:text-2xl text-blueText"
                onClick={() => {
                  if (address) {
                    if (sell) {
                      console.log("we are gonna seel");
                    } else {
                      console.log("we are gonna buy you know that");
                      processBuy(
                        ethVal,
                        {
                          asset_address: uasset_contract_address,
                          id: id,
                          img: img,
                          slug: slug,
                          displayName: display_name,
                          floorPrice: floor_price,
                          history_data_table: history_data_table,
                          name: name,
                          variation: variation_eth,
                        },
                        address,
                        signer,
                        loading,
                        setLoading,
                        setOrderDone
                      );
                    }
                  } else {
                    setPopup(true);
                  }
                }}
              >
                {sell ? "SELL" : "BUY"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className=" mx-6 rounded-xl bg-secondary min-h-[200px] ">
        <div className="flex justify-between items-center p-5">
          <div className="flex flex-col space-y-0">
            <p className="text-lg font-extrabold">u{display_name}/NFT</p>
            <p className="text-xs ">2022-11-07</p>
          </div>
          <div className="flex items-center">
            <div className="w-10 h-10 ">
              <img
                className="object-fill w-full h-full"
                src="/eth.png"
                alt=""
              />
            </div>
            <p className="text-2xl font-extrabold">{floor_price}ETH</p>
          </div>
          <div>
            <p className="text-lg font-extrabold">{display_name} Floor price</p>
            <p className="text-xs ">2022-11-07</p>
          </div>
          <div className="flex items-center">
            <div className="w-10 h-10 ">
              <img
                className="object-fill w-full h-full"
                src="/eth.png"
                alt=""
              />
            </div>
            <p className="text-2xl font-extrabold">{floor_price}ETH</p>
          </div>
          <div className="flex space-x-4">
            {Days.map((day: number) => {
              return (
                <p
                  onClick={() => {
                    setActiveDay(day);
                  }}
                  className={
                    activeDay == day
                      ? "underline cursor-pointer"
                      : "" + " cursor-pointer"
                  }
                >
                  {day}D
                </p>
              );
            })}
          </div>
        </div>
        <div className="flex justify-between space-x-3 py-8">
          <div className="w-[80%] ">
            {chartData ? (
              <DetailsChart
                history_data_table={history_data_table}
                slug={slug}
                time={activeDay}
              />
            ) : (
              <p>loading</p>
            )}
          </div>
          {sales && (
            <div className="w-[20%] max-w-sm min-h-[400px] space-y-6 flex flex-col  ">
              <div className="space-y-1">
                <p className="text-sm font-extrabold">Volume(24h)</p>
                <div className="text-xs space-x-2">
                  <span className="text-xs">
                    {sales?.sales_24h_volume?.toFixed(2)}
                  </span>
                  <span className="text-xs text-pink">
                    {sales?.sales_24h_volume_variation?.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-extrabold">Sales(24h)</p>
                <div className="text-xs space-x-2">
                  <span className="text-xs">{sales?.num_sales_24h}</span>
                  <span className="text-xs text-pink">
                    {sales?.num_sales_24h_variation}
                  </span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-extrabold">Avarage Sales(7D)</p>
                <div className="text-xs space-x-2">
                  <span className="text-xs">{sales?.sales_7d_avg_price}</span>
                  <span className="text-xs text-pink">-8.24%</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-extrabold">Lowest Sales(7D)</p>
                <div className="text-xs space-x-2">
                  <span className="text-xs">
                    {sales?.sales_7d_lowest_price}
                  </span>
                  <span className="text-xs text-pink">
                    {sales?.sales_7d_lowest_price}
                  </span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-extrabold">Higehst Sales(7D)</p>
                <div className="text-xs space-x-2">
                  <span className="text-xs">
                    {sales?.sales_7d_highest_price}
                  </span>
                  <span className="text-xs text-pink">
                    {sales?.sales_7d_lowest_price_variation}
                  </span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-extrabold">Listed/Supply</p>
                <div className="text-xs space-x-2">
                  <span className="text-xs">{in_hold}</span>
                  <span className="text-xs text-pink">{total_supply}</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-extrabold">Listed Ratio</p>
                <div className="text-xs space-x-2">
                  <span className="text-xs">{listed_ratio}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
