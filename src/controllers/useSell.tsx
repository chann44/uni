import axios from "axios";
import { approve } from "./uttils";

export async function quoteSell(_unftNum, _nftId, unftData) {
  let result = []; // total price, transfer fee, poundage, premium
  let _slug = unftData[_nftId][0]; // should be determined automatically
  const res = await axios("https://wegroup.app/calSellUNFTPrice", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {
      unftNum: _unftNum,
      nftId: _nftId,
      slug: _slug,
    },
  });
  return {
    total_price: res.data.UNftPriceInfo.price_needed,
    fee: res.data.UNftPriceInfo.transferFee,
    poundage: res.data.UNftPriceInfo.poundage,
    premium: res.data.UNftPriceInfo.premiumFee,
  };
}

export function processSell(_value, _product, address, unftData) {
  let approveAddr = "0xc777f6E867D5EeF7dD1735Dc5Ca38cd07B389A04";
  let sellVal = _value;
  let productId = _product;
  if (address == null) {
    console.log("Please connect your wallet");
    return;
  }
  approve(_product, approveAddr, sellVal, unftData).then(async (hs) => {
    const res = await axios("https://wegroup.app/sellNFT", {
      method: "POST",
      data: {
        userAddr: address,
        unftId: parseInt(productId),
        nftId: parseInt(productId),
        unftNum: parseFloat(sellVal),
        txHash: hs,
      },
    });
    if (res.status == 200) {
      console.log("done");
    } else if (res.status == 500) {
      console.log(res.data);
    }
  });
}
