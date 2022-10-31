import { Layout } from "@/components/Layout";
import { NFT } from "@/components/NFT/NFT";
import { RenderNFT } from ".";

const Market = () => {
  return (
    <>
      <div>
        <Layout>
          <div className="flex flex-col items-center space-y-4 w-full my-10 ">
            <p className="gradient-text  text-sm   w-full ">uniAsset.io</p>
            <h1 className="text-lg font-bold sm:text-xl lg:text-4xl">
              All uNFTs
            </h1>
          </div>
          <div className="space-y-10">
            <RenderNFT num={5} />
          </div>
        </Layout>
      </div>
    </>
  );
};

export default Market;
