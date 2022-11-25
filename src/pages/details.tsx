import { DetailsComponet } from "@/components/Details";
import { Layout } from "@/components/Layout";
import Example from "@/components/testchart";
import { useAppContext } from "@/context/AppContextProvider";
import { useState } from "react";

const Details = () => {
  const { currentIDDetails, setCurrentIDDetails, unftData, currentNFTData } =
    useAppContext();
  return (
    <div
      className="min-h-screen w-full relative bg-center -mb-10 -mt-6 "
    >
      <div className="absolute border w-full h-full z-10 top-0 bottom-0">
        <img className="w-full h-full object-cover" src={currentNFTData?.img} alt="" />
      </div>
      <div className="min-h-screen relative  z-30">
        <Layout>
          <DetailsComponet />
        </Layout>
      </div>
      <div className="absolute w-full h-full bg-black bg-opacity-60 z-20 top-0 bottom-0"></div>
    </div>
  );
};


export default Details;
