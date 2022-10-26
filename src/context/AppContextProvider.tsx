import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ethers } from "ethers";
import { MetaMaskInpageProvider } from "@metamask/providers";
import {
  LP_ABI,
  uAzuki,
  uBeanz,
  uDoodles,
  uBoredApe,
  uMoonBirds,
} from "../controllers/ABI";

interface Props {
  children: ReactNode;
}

export const stakingPeriods = {
  1: 604800,
  2: 3024000,
  3: 6048000,
  4: 21168000,
  5: 31449600,
};

export const uNFTData = {
  1: [
    "azuki",
    "0xf8CA97BE31E89D3FfB229F7AB8483bB9bB63F4fB",
    "uAzuki",
    "https://uniasset.oss-cn-hongkong.aliyuncs.com/token/azuki.pic.jpg",
  ],
  2: [
    "beanz-official",
    "0x3F767247aF189f6dF7660e105CD4a8E5632215f6",
    "uBeanz",
    "https://uniasset.oss-cn-hongkong.aliyuncs.com/token/13091656434593_.pic.jpg",
  ],
  3: [
    "doodles",
    "0x6C67cD5E815F6E274DFf75A4ee180e3cF49f98eD",
    "uDoodles",
    "https://uniasset.oss-cn-hongkong.aliyuncs.com/token/13101656434599_.pic.jpg",
  ],
  4: [
    "bored-ape-yacht-club",
    "0x61fDa6A13C255497146708A834896D70c33e41fe",
    "uBoredApe",
    "https://uniasset.oss-cn-hongkong.aliyuncs.com/token/13111656434603_.pic.jpg",
  ],
  5: [
    "proof-moonbirds",
    "0x91aE457665E95cADBd7630587FdF925afF065694",
    "uMoonBirds",
    "https://uniasset.oss-cn-hongkong.aliyuncs.com/token/13121656434613_.pic.jpg",
  ],
};

const context = createContext({} as any);

export const useAppContext = () => {
  return useContext(context);
};

export const AppContextProvider = ({ children }: Props) => {
  const LP_Addr = "0xacf64aD70D1ED44d094b8816b10B3A76df001b3d";
  const [address, setAdrress] = useState("");
  const [Provider, setProvider] = useState<any>();
  const [signer, setSigner] = useState<any>();
  const [LP, setLp] = useState<any>();
  const [uAzukiInstance, setuAzukiInstance] = useState<any>();
  const [uBeanzInstance, setuBeanzInstance] = useState<any>();
  const [uDoodlesInstance, setuDoodlesInstance] = useState<any>();
  const [uBoredApeInstance, setuBoredApeInstance] = useState<any>();
  const [uMoonBirdsInstance, setMoonBirdsInstance] = useState<any>();
  const [unftData, setUnftData] = useState<any>(uNFTData);

  useEffect(() => {
    if (window.ethereum) {
      console.log("MetaMask is not installed");
    } else {
      setProvider(new ethers.providers.Web3Provider(window.ethereum));
      setSigner(Provider.getSigner());

      const LP = new ethers.Contract(LP_Addr, LP_ABI, signer);
      setuAzukiInstance(new ethers.Contract(uNFTData[1][1], uAzuki, signer));
      setuBeanzInstance(new ethers.Contract(uNFTData[2][1], uBeanz, signer));
      setuDoodlesInstance(
        new ethers.Contract(uNFTData[3][1], uDoodles, signer)
      );
      setuBoredApeInstance(
        new ethers.Contract(uNFTData[4][1], uBoredApe, signer)
      );
      setMoonBirdsInstance(
        new ethers.Contract(uNFTData[5][1], uMoonBirds, signer)
      );
      setUnftData(unftData[1].push(uAzukiInstance));
      setUnftData(unftData[2].push(uBeanzInstance));
      setUnftData(uNFTData[3].push(uDoodlesInstance));
      setUnftData(uNFTData[4].push(uBoredApeInstance));
      setUnftData(uNFTData[5].push(uMoonBirdsInstance));
    }
  }, []);

  const shared_value = {
    LP_Addr,
    LP,
    Provider,
    signer,
    uAzukiInstance,
    uBeanzInstance,
    unftData,
    uDoodlesInstance,
    uBoredApeInstance,
    uMoonBirdsInstance,
    address,
    setAdrress,
  };
  return (
    <>
      <context.Provider value={shared_value}>{children}</context.Provider>
    </>
  );
};
