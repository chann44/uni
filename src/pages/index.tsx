import { useRouter } from "next/router";

import { EarnCard } from "@/components/Earn";
import { Layout } from "@/components/Layout";
import { NFTCard } from "@/components/Header";
import { NFT } from "@/components/NFT/NFT";
import { useAppContext } from "@/context/AppContextProvider";
import { uNFTData } from "@/controllers";
import { useEffect } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

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

export const Swap = () => {
  return (
    <div className="bg-black/30 flex items-center justify-center w-8 h-8 rounded-full">
      <FaArrowUp size={10} />
      <FaArrowDown size={10} />
    </div>
  );
};

export const RenderNFT = ({ num }: RenderNum) => {
  const { NFTDATA, unftData } = useAppContext();

  useEffect(() => {
    console.log(NFTDATA);
  }, []);
  return (
    <>
      {NFTDATA &&
        NFTDATA?.slice(0, num).map((nft: any, index: number) => {
          return (
            <NFT
              id={nft.id}
              displayName={unftData[index + 1][4]}
              floorPrice={nft.floor_price}
              variation={nft.variation_eth}
              name={nft.name}
              slug={nft.slug}
              img={unftData[index + 1][3]}
            />
          );
        })}
    </>
  );
};

// this is the home page
const Index = () => {
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
    </Layout>
  );
};

export default Index;
