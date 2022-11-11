import axios from "axios";
import { addTokenToWallet, sendRawTxn } from "./uttils";
import qs from "qs"
import { IuNFTData } from "@/context/AppContextProvider";
import { INFTInfo } from "@/components/NFT/NFT";

export async function quoteBuy(_unftNum: number, _nftId: number, slug: string) {

  const res = await axios("https://wegroup.app/calBuyUNFTPrice", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: qs.stringify({
      unftNum: _unftNum,
      nftId: _nftId,
      slug: slug,
    }),
  });

  return {
    totalPrice: res.data.UNftPriceInfo.price_needed,
    transferFess: res.data.UNftPriceInfo.transferFee,
    poundage: res.data.UNftPriceInfo.poundage,
    premium: res.data.UNftPriceInfo.premiumFee,
  };
  // return res.data
}

export function processBuy(_value, _product: INFTInfo, address, signer) {
  let vaultAddr = "0x85D546B0a97775D1553C2aAeE7c191211D3740Cd"; // smart contract
  let buyValEth = _value;
  let productId = _product;
  if (address == null) {
    alert("Please connect your wallet");
    return;
  }
  sendRawTxn(vaultAddr, buyValEth, address, signer).then(async (hs) => {
    let finalQuote = await quoteBuy(1, parseInt(_product.id.toString()), _product.slug);
    let buyValUNFT = buyValEth / finalQuote.totalPrice
    console.log(finalQuote)
    console.log(buyValUNFT)
    console.log(productId.id)
    const res = await axios("https://wegroup.app/buyNFT", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        userAddr: address,
        unftId: _product.id.toString(),
        unftNum: buyValUNFT.toString(),
        nftId: _product.id.toString(),
        txHash: hs,
      }),
    });
    if (res.status == 200) {
      console.log(res)
      addTokenToWallet(
        productId.asset_address,
        productId.slug,
        18,
        productId.img
      );
    } else if (res.status == 500) {

    }
  });
}
