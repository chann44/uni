import { EarnCard } from "@/components/Earn";
import { Layout } from "@/components/Layout";
import { useAppContext } from "@/context/AppContextProvider";
import { getStakeInfo } from "@/controllers/useStack";
import { useEffect } from "react";

const Earn = () => {
 
  return (
    <>
      <Layout>
        <div>
          <div className="flex flex-col items-center space-y-4">
            <p className="gradient-text   text-sm ">uniAsset.io</p>
            <h1 className="text-lg font-bold sm:text-xl lg:text-4xl">
              Earn by Eth
            </h1>
          </div>
        </div>
        <EarnCard />
      </Layout>
    </>
  );
};

export default Earn;
