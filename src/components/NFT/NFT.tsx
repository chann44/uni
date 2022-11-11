import { useAppContext } from "@/context/AppContextProvider";
import { Swap } from "@/pages";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaLink } from "react-icons/fa";
import { Stats } from "../Header/Stats";
import { processBuy, quoteBuy } from "../../controllers/useBuy"
import { getAmtFromEth, getSellAmtFromEth } from "@/controllers/uttils";
import { quoteSell } from "@/controllers/useSell";
import { Loading } from "../Loading";


export interface INFTInfo {
  id: number;
  name: string;
  slug: string;
  img: string;
  floorPrice: number;
  variation: number;
  displayName: string;
  history_data_table: string
  asset_address: string
}

export const NFT = ({
  id,
  name,
  slug,
  img,
  floorPrice,
  variation,
  displayName,
  history_data_table,
  asset_address
}: INFTInfo) => {
  const router = useRouter();
  const { currentIDDetails, setCurrentIDDetails, unftData, signer } = useAppContext();
  const [amt, setAmt] = useState<number>(1)
  const [actualAmt, setActualAmt] = useState<string>("")
  const [uactualAmt, setuActualAmt] = useState<string>("")
  const [ethVal, setEthVal] = useState<string>("")
  const [sell, setSell] = useState<boolean>(false)
  const { address, setPopup, popup } = useAppContext()

  return (
    <>
      <div className="grid-cols-9 lg:h-[310px] max-w-xs mx-auto sm:max-w-2xl lg:max-w-full rounded-xl h-auto  w-full  grid ">
        <div className="relative col-start-1  lg:col-span-3 col-span-11 h-[310px] rounded-xl bg-secondary">
          <img
            className="h-full w-full  object-cover rounded-xl "
            src={img}
            alt=""
          />
          {/* info on NFT image */}
          <div className="absolute p-5  top-0 w-full flex-col  flex justify-between h-full bg-gray-900 bg-opacity-40 ">
            <div className="flex justify-between items-center">
              <p>2022-10-22</p>
              <p>{slug}</p>
            </div>
            <div className="flex justify-between items-center ">
              <div>
                <button
                  onClick={() => {
                    setCurrentIDDetails(id);
                    router.push("/details");
                  }}
                  className="bg-[#6001D3] rounded-full  px-5 "
                >
                  more
                </button>
              </div>
              <div>
                <p>{displayName} floor price</p>
                <div className="flex">
                  <div className="flex space-x-2 items-center ">
                    <img src="/eth.png" className="w-4" />
                    <p className="text-sm">{floorPrice}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-secondary col-start-1 col-span-11 overflow-hidden lg:col-start-4 lg:col-span-3 p-8">
          {/*THis is Trade part on NFT Card  */}
          <div className="w-full grid grid-cols-7 my-auto  ">
            <div className=" col-start-1 col-span-2 lg:col-span-2  flex items-center  justify-center ">
              <p className="text-sm  text-center">{displayName}</p>
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
            <div className=" col-start-1 col-span-1 lg:col-span-2  flex  justify-center   ">
              <FaLink size={12} className="-rotate-45 text-center " />
            </div>
            <div className="col-start-2 col-span-3  "></div>
            <div className="col-span-5 col-start-2 my-2"></div>
            <div className=" col-start-1 col-span-2 lg:col-span-2 flex  items-center justify-center">
              <p className="text-sm  text-center" >{sell ? `u${displayName}` : "ETH"}</p>
            </div>
            <div className="lg:col-start-3 lg:col-span-4 col-start-3 col-span-5 flex justify-center">
              <input
                type="text"
                value={sell ? uactualAmt : ethVal}
                onChange={async (e) => {
                  if (sell) {
                    setuActualAmt(e.target.value)
                    const data = await quoteSell(Number(e.target.value), id, slug)
                    setEthVal(data.total_price.toFixed(4))
                  } else {
                    setEthVal(e.target.value)
                    const data = await getAmtFromEth(amt, id, slug, Number(e.target.value))
                    setActualAmt(data.toString())
                    setuActualAmt(data.toFixed(5))
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
              <p className="text-sm text-center">{sell ? "ETH" : " u" + displayName}</p>
            </div>
            <div className="lg:col-start-3 lg:col-span-4 col-start-3 col-span-5 flex justify-center">
              <input
                type="text"
                placeholder="0.0"
                className="text-center rounded-full w-full p-1 text-black"
                onChange={async (e) => {
                  if (sell) {
                    setEthVal(e.target.value)
                    const data = await getSellAmtFromEth(amt, id, slug, Number(e.target.value))
                    setActualAmt(data.toString())
                    setuActualAmt(data.toFixed(5))
                  } else {
                    setuActualAmt(e.target.value)
                    const data = await quoteBuy(Number(e.target.value), id, slug)
                    setEthVal(data.totalPrice.toFixed(4))
                  }
                }}
                value={sell ? ethVal : uactualAmt}
              />
            </div>
            <div className="col-span-5 col-start-2 my-2"></div>
            <div className="col-start-1 col-span-1 "></div>
            <div className="col-start-3 lg:col-start-2 col-span-6 ">
              <button className="w-full text-center text-xl lg:text-2xl text-blueText" onClick={() => {
                if (address) {
                  if (sell) {
                    console.log("we are gonna seel")
                  } else {
                    console.log("we are gonna buy you know that")
                    processBuy(ethVal, {
                      asset_address, id, img, slug, displayName, floorPrice, history_data_table, name, variation
                    }, address, signer)
                  }
                } else {
                  setPopup(true)
                }
              }}>
                {sell ? "SELL" : "BUY"}
              </button>
            </div>
          </div>
        </div>
        {/* Chart and stats */}

        <div className="col-start-1 col-span-11 lg:col-start-7 bg-black/20  lg:col-span-3 grid grid-cols-4 p-8 lg:px-12 ">

          {
            unftData && <>
              <Stats
                displayName={displayName}
                variation={variation}
                floorPrice={floorPrice}
                history_data_table={history_data_table}
                slug={slug}
              />
              <Stats
                displayName={"u" + displayName}
                variation={variation}
                floorPrice={floorPrice}
                history_data_table={history_data_table}
                slug={slug}
              />
            </>
          }

        </div>
      </div>
    </>
  );
};
