import axios from "axios";
import { approve } from "./uttils";
import qs from "qs"


import {uAzuki,
  uBeanz,
  uDoodles,
  uBoredApe,
  uMoonBirds, } from "../controllers/ABI"


  const Abis = {
    1: uAzuki,
    2: uBeanz,
    3: uDoodles,
    4: uBoredApe,
    uMoonBirds
  }

export async function quoteSell(_unftNum: number, _nftId: number, slug: string) {
  const res = await axios("https://wegroup.app/calSellUNFTPrice", {
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
    total_price: res.data.UNftPriceInfo.price_needed,
    fee: res.data.UNftPriceInfo.transferFee,
    poundage: res.data.UNftPriceInfo.poundage,
    premium: res.data.UNftPriceInfo.premiumFee,
  };
}

export function processSell(_value, _product, address, asset_address, signer) {
  let approveAddr = "0xC777F6E867D5F000000000000000000000000000";
  let sellVal = _value;
  console.log(sellVal)
  let productId = _product;
  if (address == null) {
    alert("please connect metamstk")
    return;
  }
  approve(_product, approveAddr, sellVal, asset_address, Abis[productId], signer).then(async (hs) => {
    const res = await axios("https://wegroup.app/sellNFT", {
      method: "POST",
       headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        userAddr: address,
        unftId: parseInt(productId),
        nftId: parseInt(productId),
        unftNum: parseFloat(sellVal),
        txHash: hs,
      }),
    });
    if (res.status == 201) {
      
    } else if (res.status == 501) {
      
    }
  });
}
