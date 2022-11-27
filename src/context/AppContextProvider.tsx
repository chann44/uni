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
import axios from "axios";

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


interface IAppContext {
  Lp_Address: string;
  address: string;
  setAddress: Dispatch<SetStateAction<string>>;
  provider: any;
  setProvider: Dispatch<SetStateAction<any>>;
  signer: any;
  setSigner: Dispatch<SetStateAction<any>>;
  popup: boolean;
  setPopup: Dispatch<SetStateAction<boolean>>;
  stacking: boolean;
  setStacking: Dispatch<SetStateAction<boolean>>;
  Lp: any
}


const context = createContext({} as IAppContext);
export const useAppContext = () => {
  return useContext(context);
};

  export const Lp_Address = "0xacf64aD70D1ED44d094b8816b10B3A76df001b3d";

export const AppContextProvider = ({ children }: Props) => {
  const [address, setAddress] = useState("");
  const [provider, setProvider] = useState<any>();
  const [signer, setSigner] = useState<any>();
  const [NFTDATA, setNFTDATA] = useState<any>();
  const [currentIDDetails, setCurrentIDDetails] = useState<any>(1);
  const [popup, setPopup] = useState<boolean>(false);
  const [stacking, setStacking] = useState<boolean>(false);
  const [Lp, setLp] = useState<any>()



  useEffect(() => {
    const LP_addr = "0xacf64aD70D1ED44d094b8816b10B3A76df001b3d";
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    setSigner(signer)
    const Lp = new ethers.Contract("0xacf64aD70D1ED44d094b8816b10B3A76df001b3d", LP_ABI, signer);
    setLp(Lp)
  }, [])






  const shared_value = {
    Lp_Address,
    address,
    setAddress,
    provider,
    setProvider,
    signer,
    setSigner,
    popup,
    setPopup,
    stacking,
    setStacking,
    Lp
  };
  return (
    <>
      <div>
        <context.Provider value={shared_value}>{children}</context.Provider>
      </div>
    </>
  );
};
