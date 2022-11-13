import { IuNFTData, useAppContext } from "@/context/AppContextProvider";
import { quoteBuy } from "@/controllers/useBuy";
import { quoteSell } from "@/controllers/useSell";
import { getAmtFromEth, getSellAmtFromEth } from "@/controllers/uttils";
import { Swap } from "@/pages";
import { useEffect, useState } from "react";
import { AiOutlineInfo } from "react-icons/ai";

interface feesData {
  totalPrice: number,
  transferFess: number,
  poundage: number,
  premium: number
}

export const TradeCard = () => {
  const [nftId, setnftID] = useState(1);
  const [unftDataToby, setuNFTdataToBy] = useState<IuNFTData>();
  const [uactualAmt, setuActualAmt] = useState<string>("")
  const [ethVal, setEthVal] = useState<string>("")
  const [data, setData] = useState<feesData>()
  const [sell, setSell] = useState<boolean>(false)
  const { address, setPopup, popup, unftData } = useAppContext()

  useEffect(() => {
    unftData.map((nft) => {
      if (nft.id == nftId) {
        setuNFTdataToBy((prev: any) => {
          return { ...prev, ...nft }
        })
        return
      }
    })
  }, [nftId, unftData])

  useEffect(() => {
    (async () => {
      if (unftDataToby) {
        const data = await quoteBuy(1, unftDataToby.id, unftDataToby.slug)
        setData((prev: any) => {
          return { ...data }
        })
      }
    })()
  }, [unftDataToby, nftId, unftData])

  return (
    <div className="col-start-1 col-span-6 sm:col-start-1 sm:col-span-3 flex flex-col items-center space-y-4 ">
      <h1 className="text-center lg:text-left w-full py-2 lg:px-8 lg:py-3 text-lg sm:text-xl lg:text-2xl font-semibold">
        Trade
      </h1>
      <div className="flex flex-col items-center  w-full max-w-[240px] space-y-4">
        <div className="rounded-full  w-full text-center p-1  bg-transparent border">
          <select
            onChange={(e: any) => {

              setnftID(e.target.value);
              setEthVal("")
              setuActualAmt("")
            }}
            className="rounded-full w-[80%]   text-center  bg-transparent "
          >
            {unftData &&
              unftData?.map((nft: IuNFTData, index: number) => {
                return (
                  <option
                    selected={index == 0 && true}
                    className="w-full text-center "
                    value={nft.id}
                  >
                    {"u" + nft.display_name}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="col-start-1 col-span-6 grid grid-cols-6 items-center space-y-4">
          <div className="col-start-1 col-span-6 bg-white rounded-full flex items-center px-3 space-x-1 ">
            <div className="w-4 ">
              <img className="object-cover" src={sell ? unftDataToby.img : "/eth.png"} alt="" />
            </div>
            <input
              placeholder={sell ? "you recive" : "you send"}
              type="text"
              className="w-full text-black py-1 border-none focus:outline-none focus:border-none rounded-full  placeholder:text-gray-800 "
              value={sell ? uactualAmt : ethVal}
              onChange={async (e) => {
                if (sell) {
                  setuActualAmt(e.target.value)
                  const data = await quoteSell(Number(e.target.value), unftDataToby.id, unftDataToby.slug)
                  setEthVal(data.total_price.toFixed(4))
                } else {
                  setEthVal(e.target.value)
                  const data = await getAmtFromEth(1, unftDataToby.id, unftDataToby.slug, Number(e.target.value))
                  setuActualAmt(data.toFixed(5))
                }
              }}
            />
          </div>
          <div className="col-start-1 col-span-6 flex justify-center" onClick={() => {
            setEthVal("")
            setuActualAmt("")
          }}>
            <Swap swap={sell} setSwap={setSell} />
          </div>
          <div className="col-start-1 col-span-6 bg-white rounded-full flex items-center px-3 space-x-1 ">
            <div className="w-4 h-4 rounded-full
              ">
              <img className="object-cover rounded-full" src={sell ? "/eth.png" : unftDataToby?.img} alt="" />
            </div>
            <input
              placeholder={sell ? "you send" : "you recive"}
              type="text"
              className="w-full text-black py-1 border-none focus:outline-none focus:border-none rounded-full  placeholder:text-gray-800 "
              onChange={async (e) => {
                if (sell) {
                  setEthVal(e.target.value)
                  const data = await getSellAmtFromEth(1, unftDataToby.id, unftDataToby.slug, Number(e.target.value))
                  setuActualAmt(data.toFixed(5))
                } else {
                  setuActualAmt(e.target.value)
                  const data = await quoteBuy(Number(e.target.value), unftDataToby.id, unftDataToby.slug)
                  setEthVal(data.totalPrice.toFixed(4))
                }
              }}
              value={sell ? ethVal : uactualAmt}
            />
          </div>
        </div>
        <div className="w-full">
          <div className="flex justify-between">
            <p className="text-xs">1 {unftDataToby?.display_name}  :</p>
            <p className="text-sm">{data?.totalPrice}</p>
          </div>
          <div className="flex  justify-between">
            <p className="text-sm">fees included: </p>
            <p className="text-sm"><AiOutlineInfo className="font-extrabold text-blueText text-xl" /></p>
          </div>
        </div>
        <button className="col-start-1 col-end-7 text-lg  sm:text-2xl text-blueText " onClick={() => {
          if (address === "") {

          }
        }}>
          {sell ? "TRADE" : "BUY"}
        </button>
      </div>
    </div >
  );
};