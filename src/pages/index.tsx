import { useRouter } from "next/router";
import { EarnCard } from "@/components/Earn";
import { Layout } from "@/components/Layout";
import { NFTCard } from "@/components/Header";
import { NFT } from "@/components/NFT/NFT";
import { useAppContext } from "@/context/AppContextProvider";
import { Dispatch, SetStateAction, useEffect } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { MetaMaskPopup } from "@/components/MetamaskPopup";
import { StackingInfo } from "@/components/Earn/Stackinginfo";
import { trpc } from "@/utils/trpc";

// title for earn card on the homepage
const EarnCardTitle = () => {
  return (
    <div className="flex flex-col items-center space-y-3 my-16">
      <p className="gradient-text   text-sm ">uniAsset.io</p>
      <h1 className="text-lg font-bold sm:text-xl lg:text-4xl">Earn </h1>
    </div>
  );
};

// load more nfts button
const LoadMore = () => {
  const router = useRouter();
  return (
    <>
      <div className="w-full flex justify-center ">
        <button
          onClick={() => {
            router.push("/market");
          }}
          className="btn-blue-shad bg-[#6001D3] text-xl px-8 py-1 rounded-full "
        >
          load More
        </button>
      </div>
    </>
  );
};

interface RenderNum {
  num: number;
}

export const Swap = ({ setSwap, swap }: { swap: boolean, setSwap: Dispatch<SetStateAction<boolean>> }) => {
  return (
    <>
      {
        swap ? <div onClick={() => {
          setSwap(!swap)
        }} className="bg-black/30 flex items-center justify-center w-8 h-8 rounded-full">
          <FaArrowDown size={10} />
          <FaArrowUp size={10} />
        </div> :
          <div onClick={() => {
            setSwap(!swap)
          }} className="bg-black/30 flex items-center justify-center w-8 h-8 rounded-full">
            <FaArrowUp size={10} />
            <FaArrowDown size={10} />
          </div>

      }
    </>
  );
};

export const RenderNFT = ({ num }: RenderNum) => {
  const {data, isLoading, isError}  = trpc.nftList.useQuery()
  if(isLoading) return <div>loaiding ...</div>

  return (
    <>
      {data.data? 
        data.data?.slice(0, num).map((nft, index: number) => {
          return (
            <NFT
              asset_address={nft.uasset_contract_address}
              id={nft.id}
              displayName={nft.display_name}
              floorPrice={nft.floor_price}
              variation={nft.variation_eth}
              name={nft.name}
              slug={nft.slug}
              img={nft.img}
              history_data_table={nft.history_data_table}
            />
          );
        }): null
      }
    </>
  );
};

// this is the home page
const Index = () => {
  const { popup, stacking } = useAppContext()

  return (
    <Layout>
      <NFTCard />
      <div className="space-y-12 hidden lg:block">
        <div className="my-20 lg:my-32">
          <p className=" gradient-text text-lg mx-auto">uniAsset.io</p>
          <p className="text-center text-lg sm:text-4xl py-4 font-extrabold">
            uNFT
          </p>
        </div>
        {/* listed NFts */}
        <RenderNFT num={2} />
        <LoadMore />
      </div>
      <EarnCardTitle />
      <div className=" max-w-xs mx-auto sm:max-w-full">
        {/* Earn */}
        <EarnCard />
      </div>
      {
        popup ?
          <MetaMaskPopup />
          : null
      }
      {
        stacking &&
        <StackingInfo />
      }
    </Layout>
  );
};

export default Index;
