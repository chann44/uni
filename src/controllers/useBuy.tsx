import axios from "axios";
import { uNFTData } from ".";
import { addTokenToWallet, sendRawTxn } from "./uttils";

export async function quoteBuy(_unftNum, _nftId, uNFTData) {
  console.log(_nftId);
  //   let result = {}; // total price, transfer fee, poundage, premium
  let _slug = uNFTData[_nftId][0]; // should be determined automatically
  const res = await axios("https://wegroup.app/calBuyUNFTPrice", {
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
    totalPrice: res.data.UNftPriceInfo.price_needed,
    transferFess: res.data.UNftPriceInfo.transferFee,
    poundage: res.data.UNftPriceInfo.poundage,
    premium: res.data.NftPriceInfo.premiumFee,
  };
}

export function processBuy(_value, _product, address, signer) {
  let vaultAddr = "0x85D546B0a97775D1553C2aAeE7c191211D3740Cd"; // smart contract
  let buyValEth = _value;
  let productId = _product;
  if (address == null) {
    console.log("Please connect your wallet");
    alert("Please connect your wallet");
    return;
  }
  sendRawTxn(vaultAddr, buyValEth, address, signer).then(async (hs) => {
    let finalQuote = await quoteBuy(1, parseInt(productId), uNFTData);
    let buyValUNFT = buyValEth / finalQuote[0];
    console.log(buyValUNFT);
    console.log(hs);
    const res = await axios("https://wegroup.app/buyNFT", {
      method: "POST",
      data: {
        userAddr: address,
        unftId: parseInt(productId),
        unftNum: buyValUNFT,
        nftId: parseInt(productId),
        txHash: hs,
      },
    });

    if (res.status == 200) {
      addTokenToWallet(
        uNFTData[productId][1],
        uNFTData[productId][2],
        18,
        uNFTData[productId][3]
      );
    } else if (res.status == 500) {
      console.log(res.data);
    }
  });
}
