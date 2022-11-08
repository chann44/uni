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

export interface IuNFTData {
  id: number;
  slug: string;
  name: string;
  display_name: string;
  img: string;
  floor_price: number;
  total_supply: number;
  num_owners: number;
  total_volume: number;
  "24h_volume": number;
  belong: any;
  bought: number;
  in_hold: number;
  history_data_table: string;
  asset_address: string;
  uasset_contract_address: string;
  variation_eth: number;
  type: string;
  count_onsale: number;
  listed_ratio: number;
  url: string;
  uName: string;
}

export const stakingPeriods = {
  1: 604800,
  2: 3024000,
  3: 6048000,
  4: 21168000,
  5: 31449600,
};

const uNFTData: IuNFTData[] = [
  {
    id: 1,
    name: "Azuki",
    slug: "azuki",
    uasset_contract_address: "0xf8CA97BE31E89D3FfB229F7AB8483bB9bB63F4fB",
    uName: "uAzuki",
    img: "https://uniasset.oss-cn-hongkong.aliyuncs.com/token/azuki.pic.jpg",
    display_name: "Azuki",
    bought: 0,
    count_onsale: 0,
    floor_price: 0,
    history_data_table: "",
    in_hold: 0,
    belong: 0,
    listed_ratio: 0,
    num_owners: 0,
    total_supply: 0,
    total_volume: 0,
    type: "",
    asset_address: "",
    url: "",
    variation_eth: 0,
    "24h_volume": 0,
  },
  {
    id: 2,
    name: "beanz-official",
    slug: "beanz-official",
    uasset_contract_address: "0x3F767247aF189f6dF7660e105CD4a8E5632215f6",
    uName: "uBeanz",
    img: "https://uniasset.oss-cn-hongkong.aliyuncs.com/token/13091656434593_.pic.jpg",
    display_name: "BEANZ",
    bought: 0,
    count_onsale: 0,
    floor_price: 0,
    history_data_table: "",
    in_hold: 0,
    belong: 0,
    listed_ratio: 0,
    num_owners: 0,
    total_supply: 0,
    total_volume: 0,
    type: "",
    asset_address: "",
    url: "",
    variation_eth: 0,
    "24h_volume": 0,
  },
  {
    id: 3,
    name: "doodles",
    slug: "doodles",
    uasset_contract_address: "0x6C67cD5E815F6E274DFf75A4ee180e3cF49f98eD",
    uName: "uDoodles",
    img: "https://uniasset.oss-cn-hongkong.aliyuncs.com/token/13101656434599_.pic.jpg",
    display_name: "Doodles",
    bought: 0,
    count_onsale: 0,
    floor_price: 0,
    history_data_table: "",
    in_hold: 0,
    belong: 0,
    listed_ratio: 0,
    num_owners: 0,
    total_supply: 0,
    total_volume: 0,
    type: "",
    asset_address: "",
    url: "",
    variation_eth: 0,
    "24h_volume": 0,
  },
  {
    id: 4,
    name: "bored-ape-yacht-club",
    slug: "bored-ape-yacht-club",
    uasset_contract_address: "0x61fDa6A13C255497146708A834896D70c33e41fe",
    uName: "uBoredApe",
    img: "https://uniasset.oss-cn-hongkong.aliyuncs.com/token/13111656434603_.pic.jpg",
    display_name: "BoredApe",
    bought: 0,
    count_onsale: 0,
    floor_price: 0,
    history_data_table: "",
    in_hold: 0,
    belong: 0,
    listed_ratio: 0,
    num_owners: 0,
    total_supply: 0,
    total_volume: 0,
    type: "",
    asset_address: "",
    url: "",
    variation_eth: 0,
    "24h_volume": 0,
  },
  {
    id: 5,
    name: "proof-moonbirds",
    slug: "proof-moonbirds",
    uasset_contract_address: "0x91aE457665E95cADBd7630587FdF925afF065694",
    uName: "uMoonBirds",
    img: "https://uniasset.oss-cn-hongkong.aliyuncs.com/token/13121656434613_.pic.jpg",
    display_name: "moonbirds",
    bought: 0,
    count_onsale: 0,
    floor_price: 0,
    history_data_table: "",
    in_hold: 0,
    belong: 0,
    listed_ratio: 0,
    num_owners: 0,
    total_supply: 0,
    total_volume: 0,
    type: "",
    asset_address: "",
    url: "",
    variation_eth: 0,
    "24h_volume": 0,
  },
];

interface IAppContext {
  Lp_Address: string;
  address: string;
  setAddress: Dispatch<SetStateAction<string>>;
  provider: any;
  setProvider: Dispatch<SetStateAction<any>>;
  signer: any;
  setSigner: Dispatch<SetStateAction<any>>;
  unftData: IuNFTData[];
  setUnftData: Dispatch<SetStateAction<IuNFTData[]>>;
  currentIDDetails: any;
  setCurrentIDDetails: any;
  popup: boolean;
  setPopup: Dispatch<SetStateAction<boolean>>;
  stacking: boolean;
  setStacking: Dispatch<SetStateAction<boolean>>;
  setCurrentNFTData: Dispatch<SetStateAction<IuNFTData>>;
  currentNFTData: IuNFTData;
}
const context = createContext({} as IAppContext);
export const useAppContext = () => {
  return useContext(context);
};

export const AppContextProvider = ({ children }: Props) => {
  const Lp_Address = "0xacf64aD70D1ED44d094b8816b10B3A76df001b3d";
  const [address, setAddress] = useState("");
  const [provider, setProvider] = useState<any>();
  const [signer, setSigner] = useState<any>();
  const [unftData, setUnftData] = useState<IuNFTData[]>(uNFTData);
  const [NFTDATA, setNFTDATA] = useState<any>();
  const [currentIDDetails, setCurrentIDDetails] = useState<any>(1);
  const [popup, setPopup] = useState<boolean>(false);
  const [stacking, setStacking] = useState<boolean>(false);
  const [currentNFTData, setCurrentNFTData] = useState<IuNFTData>();
  // useEffect(() => {
  //   if (window.ethereum) {
  //     console.log("MetaMask is not installed");
  //   } else {
  //     setProvider(new ethers.providers.Web3Provider(window.ethereum));
  //     setSigner(Provider.getSigner());

  //     const LP = new ethers.Contract(LP_Addr, LP_ABI, signer);
  //     setuAzukiInstance(new ethers.Contract(uNFTData[1][1], uAzuki, signer));
  //     setuBeanzInstance(new ethers.Contract(uNFTData[2][1], uBeanz, signer));
  //     setuDoodlesInstance(
  //       new ethers.Contract(uNFTData[3][1], uDoodles, signer)
  //     );
  //     setuBoredApeInstance(
  //       new ethers.Contract(uNFTData[4][1], uBoredApe, signer)
  //     );
  //     setMoonBirdsInstance(
  //       new ethers.Contract(uNFTData[5][1], uMoonBirds, signer)
  //     );
  //     setUnftData(unftData[1].push(uAzukiInstance));
  //     setUnftData(unftData[2].push(uBeanzInstance));
  //     setUnftData(uNFTData[3].push(uDoodlesInstance));
  //     setUnftData(uNFTData[4].push(uBoredApeInstance));
  //     setUnftData(uNFTData[5].push(uMoonBirdsInstance));
  //   }
  // }, []);

  useEffect(() => {
    (async () => {
      let newuNFtData: IuNFTData[] = [];
      const res = await axios.post("https://wegroup.app/searchNFTList");
      const nftData: IuNFTData[] = res.data.NFTInfo;
      for (let i = 0; i < nftData.length; i++) {
        let unft = unftData[i];
        let nft = nftData[i];
        console.log("yeh", nft);
        newuNFtData.push({
          ...unft,
          name: nft.name,
          url: nft.url,
          asset_address: nft.asset_address,
          "24h_volume": nft["24h_volume"],
          floor_price: nft.floor_price,
          belong: nft.belong,
          bought: nft.bought,
          count_onsale: nft.count_onsale,
          history_data_table: nft.history_data_table,
          in_hold: nft.in_hold,
          variation_eth: nft.variation_eth,
          total_volume: nft.total_volume,
          total_supply: nft.total_supply,
          listed_ratio: nft.listed_ratio,
          slug: nft.slug,
        });
      }
      setUnftData(newuNFtData);
    })();
  }, []);

  const shared_value = {
    Lp_Address,
    address,
    setAddress,
    provider,
    setProvider,
    signer,
    setSigner,
    unftData,
    setUnftData,
    currentIDDetails,
    setCurrentIDDetails,
    popup,
    setPopup,
    stacking,
    setStacking,
    currentNFTData,
    setCurrentNFTData,
  };
  return (
    <>
      <div>
        <context.Provider value={shared_value}>{children}</context.Provider>
      </div>
    </>
  );
};
