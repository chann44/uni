import { IuNFTData, useAppContext } from "@/context/AppContextProvider";
import { processBuy, quoteBuy } from "@/controllers/useBuy";
import { getNftBasicInfo } from "@/controllers/useNFTDetails";
import { getData } from "@/controllers/useNFTHistory";
import { quoteSell } from "@/controllers/useSell";
import { getAmtFromEth, getSellAmtFromEth, HIstoryData } from "@/controllers/uttils";
import { Swap } from "@/pages";
import { HistogramData } from "lightweight-charts";
import { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { FaArrowDown, FaLink } from "react-icons/fa";
import { DetailsChart } from "./Detailchart";

interface Isales {
  id: number;
  num_sales_24h: number;
  num_sales_24h_variation: number;
  sales_24h_volume: number;
  sales_24h_volume_variation: number;
  sales_7d_avg_price: number;
  sales_7d_avg_price_variation: number;
  sales_7d_highest_price: number;
  sales_7d_highest_price_variation: number;
  sales_7d_lowest_price: number;
  sales_7d_lowest_price_variation: number;
}

var SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];

function abbreviateNumber(number: number) {
  // what tier? (determines SI symbol)
  var tier = (Math.log10(Math.abs(number)) / 3) | 0;

  // if zero, we don't need a suffix
  if (tier == 0) return number;

  // get suffix and determine scale
  var suffix = SI_SYMBOL[tier];
  var scale = Math.pow(10, tier * 3);

  // scale the number
  var scaled = number / scale;

  // format number and add suffix
  return scaled.toFixed(1) + suffix;
}

export const DetailsComponet = () => {
  const Days = [3, 7, 30, 90, 365];
  const [activeDay, setActiveDay] = useState(Days[2])
  const {
    currentIDDetails,
    currentNFTData,
    setCurrentNFTData,
    setCurrentIDDetails,
    unftData,
  } = useAppContext();
  const [sales, setSales] = useState<Isales>();
  const [currentSelectedTime, setCuretSelectedTime] = useState(Days[2]);
  const [chartData, setChartData] = useState<HIstoryData[]>([]);

  // data for charts
  const [historyData90, setHistoryData90] = useState<HIstoryData[]>([]);
  // avg prices
  const [sevenDayAvgVari, set7DaysAvgVari] = useState<number>();
  const [forteenDaysAvgVari, set14DaysAvgVari] = useState<number>();
  const [thirtyDaysAvgVari, set30DaysAvgVari] = useState<number>();

  useEffect(() => {
    if (currentNFTData?.history_data_table) {
      (async () => {
        const res = await getData(
          30,
          currentNFTData.history_data_table,
          currentNFTData.slug
        );
        const temp = res.NFTHistoryInfo;
        setHistoryData90(temp);
      })();
    }
  }, []);

  useEffect(() => {
    console.log(sales);
  }, [sales]);

  useEffect(() => {
    if (historyData90) {
      const tem = historyData90.map((data: HIstoryData) => {
        var date: any = new Date(Date.parse(data.time.replace(/[-]/g, "/")));
        // let date = Date.parse(kv["time"]);
        let unix_timestamp: any = Date.parse(new Date().toString()) - date;
        date = new Date(unix_timestamp);
        if (date.getDate() == 14) {
          let vari =
            ((currentNFTData.floor_price - data.floor_price) * 100) /
            data.floor_price; //今天-30天前 / 今天
          set14DaysAvgVari(vari);
        }
        if (date.getDate() == 7) {
          let vari =
            ((currentNFTData.floor_price - data.floor_price) * 100) /
            data.floor_price; //今天-30天前 / 今天
          set7DaysAvgVari(vari);
        }
        if (date.getDate() == 30) {
          let vari =
            ((currentNFTData.floor_price - data.floor_price) * 100) /
            data.floor_price; //今天-30天前 / 今天
          set30DaysAvgVari(vari);
        }
      });
    }
  }, [historyData90]);

  useEffect(() => {
    unftData &&
      unftData.map((nft: any) => {
        if (nft.id == currentIDDetails) {
          setCurrentNFTData(() => {
            return { ...nft };
          });
          return;
        }
      });
  }, [currentIDDetails, unftData]);

  const fetchData = async () => {
    const data = await getData(
      30,
      currentNFTData.history_data_table,
      currentNFTData.slug
    );
    if (data.sales_data !== undefined) {
      setSales(data.sales_data[0]);
    }
  };

  useEffect(() => {
    if (!currentNFTData) return;
    fetchData();
  }, [currentNFTData]);

  const { signer } = useAppContext();
  const [amt, setAmt] = useState<number>(1);
  const [actualAmt, setActualAmt] = useState<string>("");
  const [uactualAmt, setuActualAmt] = useState<string>("");
  const [ethVal, setEthVal] = useState<string>("");
  const [sell, setSell] = useState<boolean>(false);
  const { address, setPopup, popup } = useAppContext();

  return (
    <div className="space-y-20">
      {currentIDDetails && (
        <div className="flex flex-col items-center mb-20">
          <div className="flex flex-col items-center space-y-3 my-8">
            <p className="gradient-text   text-sm ">uniAsset.io</p>
          </div>
          <div className="w-full text-center px-5 sm:max-w-3xl space-y-6">
            <h1 className="text-3xl">{currentNFTData?.slug}</h1>
            <p className="text-xl">{currentNFTData?.description}</p>
          </div>
        </div>
      )}
      <div className="w-full space-y-5 sm:space-y-0  sm:flex  justify-around  max-w-lg sm:max-w-full  mx-auto">
        <div className=" relative w-full sm:w-[50%] ">
          <div className="relative w-full h-[260px] sm:h-[400px]">
            <img
              className="h-full w-full  object-cover rounded-xl "
              src={currentNFTData?.img}
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
                    <p className={"text-sm text-pink"}>
                      {currentNFTData?.variation_eth}%
                    </p>
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
                    {abbreviateNumber(currentNFTData?.total_supply)}
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
                    {currentNFTData?.floor_price.toFixed(3)}ETH
                  </h1>
                  <p className="text-sm">floor price</p>
                </div>
                <div className="flex flex-col items-center">
                  <h1 className="text-xl font-extrabold">
                    {abbreviateNumber(currentNFTData?.total_volume)}
                  </h1>
                  <p className="text-sm">Volumetraded</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-[40%] rounded-2xl  bg-secondary p-7 flex" >
          <div className="w-full grid grid-cols-7 my-auto  ">
            <div className=" col-start-1 col-span-2 lg:col-span-2  flex items-center  justify-center ">
              <p className="text-sm  text-center">{currentNFTData?.display_name}</p>
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
                {sell ? `u${currentNFTData.display_name}` : "ETH"}
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
                      currentNFTData?.id,
                      currentNFTData?.slug
                    );
                    setEthVal(data.total_price.toFixed(4));
                  } else {
                    setEthVal(e.target.value);
                    const data = await getAmtFromEth(
                      amt,
                     currentNFTData?.id,
                     currentNFTData?.slug,
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
                {sell ? "ETH" : " u" + currentNFTData?.display_name}
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
                      currentNFTData?.id,
                     currentNFTData?.slug,
                      Number(e.target.value)
                    );
                    setActualAmt(data.toString());
                    setuActualAmt(data.toFixed(5));
                  } else {
                    setuActualAmt(e.target.value);
                    const data = await quoteBuy(
                      Number(e.target.value),
                     currentNFTData?.id,
                     currentNFTData?.slug
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
                          asset_address: currentNFTData?.asset_address,
                          id: currentNFTData?.id,
                          img: currentNFTData?.img,
                          slug: currentNFTData?.slug,
                          displayName: currentNFTData?.display_name,
                          floorPrice: currentNFTData?.floor_price,
                          history_data_table: currentNFTData?.history_data_table,
                          name: currentNFTData.name,
                          variation: currentNFTData.variation_eth,
                        },
                        address,
                        signer
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
            <p className="text-lg font-extrabold">
              u{currentNFTData?.display_name}/NFT
            </p>
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
            <p className="text-2xl font-extrabold">
              {currentNFTData?.floor_price}ETH
            </p>
          </div>
          <div>
            <p className="text-lg font-extrabold">
              {currentNFTData?.display_name} Floor price
            </p>
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
            <p className="text-2xl font-extrabold">
              {currentNFTData?.floor_price}ETH
            </p>
          </div>
          <div className="flex space-x-4">
            {Days.map((day: number) => {
              return <p onClick={() => {
                  setActiveDay(day)
              }} className={activeDay == day ? "underline cursor-pointer": "" + " cursor-pointer"}>{day}D</p>;
            })}
          </div>
        </div>
        <div className="flex justify-between space-x-3 py-8">
          <div className="w-[80%] ">
            {chartData ? (
              <DetailsChart
                history_data_table={currentNFTData?.history_data_table}
                slug={currentNFTData?.slug}
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
                  <span className="text-xs">{currentNFTData?.in_hold}</span>
                  <span className="text-xs text-pink">
                    {currentNFTData?.total_supply}
                  </span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-extrabold">Listed Ratio</p>
                <div className="text-xs space-x-2">
                  <span className="text-xs">
                    {currentNFTData?.listed_ratio}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
