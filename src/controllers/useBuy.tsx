import axios from "axios";
import { addTokenToWallet, sendRawTxn } from "./uttils";
import qs from "qs"
import { INFTInfo } from "@/types";

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
}

export function processBuy(_value, _product: INFTInfo, address, signer, setLoading, loading, setOrderDone) {
  let vaultAddr = "0x85D546B0a97775D1553C2aAeE7c191211D3740Cd"; // smart contract
  let buyValEth = _value;
  let productId = _product;
  if (address == null) {
    alert("Please connect your wallet");
    return;
  }
  console.log("started processing ")
  setLoading(true)
  try {
  sendRawTxn(vaultAddr, buyValEth, signer).then(async (hs) => {
    let finalQuote = await quoteBuy(1, parseInt(_product.id.toString()), _product.slug);
    let buyValUNFT = buyValEth / finalQuote.totalPrice
    console.log(
      {
        userAddr: address,
        unftId: _product.id.toString(),
        unftNum: buyValUNFT.toString(),
        nftId: _product.id.toString(),
        txHash: hs,
      }
    )
    console.log("started request")
    const res = await axios("https://wegroup.app/buyNFT", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        'Access-Control-Allow-Credentials':true
      },
      data: qs.stringify({
        userAddr: address,
        unftId: _product.id.toString(),
        unftNum: buyValUNFT.toString(),
        nftId: _product.id.toString(),
        txHash: hs,
      }),

    });
      setLoading(false)
      setOrderDone(true)
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
  }
)} catch(e) {
  console.log(loading)
  setLoading(false)
}
}
