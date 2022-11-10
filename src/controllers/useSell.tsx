import axios from "axios";
import { approve } from "./uttils";
import qs from "qs"

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

// export function processSell(_value, _product, address, unftData) {
//   let approveAddr = "0xC777F6E867D5F000000000000000000000000000";
//   let sellVal = _value;
//   let productId = _product;
//   if (address == null) {
//     
//     return;
//   }
//   approve(_product, approveAddr, sellVal, unftData).then(async (hs) => {
//     const res = await axios("https://wegroup.app/sellNFT", {
//       method: "POST",
//       data: {
//         userAddr: address,
//         unftId: parseInt(productId),
//         nftId: parseInt(productId),
//         unftNum: parseFloat(sellVal),
//         txHash: hs,
//       },
//     });
//     if (res.status == 201) {
//       
//     } else if (res.status == 501) {
//       
//     }
//   });
// }
