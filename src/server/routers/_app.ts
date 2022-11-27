import { INFTDetail } from "@/types";
import axios from "axios";
import { z } from "zod";
import { uNFTData } from "../db";
import { procedure, router } from "../trpc";

export const validateData = async () => {
  const newNFTData: INFTDetail[] = [];
  const res = await axios.post("https://wegroup.app/searchNFTList");
  const nftData: INFTDetail[] = res.data.NFTInfo;
  for (let i = 0; i < nftData.length; i++) {
    let unft = uNFTData[i];
    let nft = nftData[i];
    newNFTData.push({
      ...unft,
      description: nft.description,
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
  return newNFTData;
};

export const appRouter = router({
  nftList: procedure.query(async ({ input }) => {
    const data = await validateData();
    return {
      data,
    };
  }),
  getNFtData: procedure.input(z.number()).query(async ({ input }) => {
    const data = await validateData();
    const id = input;
    let  nftData: INFTDetail | null = null
    const res = data.map((nft) => {
      if (nft.id == id) {
        nftData = nft
      }
    });
    return {
      nftData
    };
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
