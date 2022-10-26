import { useRouter } from "next/router";

import { EarnCard } from "@/components/Earn";
import { Layout } from "@/components/Layout";
import { NFTCard } from "@/components/Header";
import { NFT } from "@/components/NFT/NFT";

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
        <NFT />
        <NFT />
        <NFT />
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
