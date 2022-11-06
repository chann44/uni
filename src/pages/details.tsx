import { DetailsComponet } from "@/components/Details";
import { Layout } from "@/components/Layout";
import { useAppContext } from "@/context/AppContextProvider";
import { useState } from "react";

const Details = () => {
  const { currentIDDetails, setCurrentIDDetails, unftData } =
    useAppContext();
  return (
    <div
      className="min-h-screen w-full relative bg-center -mb-10 -mt-6 "
      style={{
        backgroundImage: `url(${unftData[currentIDDetails][3]})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100%",
      }}
    >
      <div className="min-h-screen relative  z-20">
        <Layout>
          <DetailsComponet />
        </Layout>
      </div>
      <div className="absolute w-full h-full bg-black bg-opacity-60 z-10 top-0 bottom-0"></div>
    </div>
  );
};

export default Details;
