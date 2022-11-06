import { stakingPeriods } from "@/context/AppContextProvider";
import { ethers } from "ethers";

export const toSqlDatetime = (inputDate) => {
  const date = new Date(inputDate);
  const dateWithOffest = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  );
  return dateWithOffest.toISOString().slice(0, 19).replace("T", "+");
};

export async function approve(productId, _addr, _amt, unftData) {
  let txn = await unftData[productId][4].approve(
    _addr,
    ethers.utils.parseEther(_amt)
  );
  let hash = await txn.hash;

  return hash;
}

export function getDateFromUnixTimestamp(_unixTimestamp) {
  let date = new Date(_unixTimestamp * 1000);
  return (
    date.toLocaleDateString("en-US") + " " + date.toLocaleTimeString("en-US")
  );
}

export async function sendRawTxn(_recipient, _amt, walletAddress, signer) {
  const txn = {
    from: walletAddress,
    to: _recipient,
    value: ethers.utils.parseEther(_amt),
  };
  let trans = await signer.sendTransaction(txn);
  let hash = await trans.hash;
  return hash;
}

export async function addTokenToWallet(
  _tokenAddr,
  _tokenSymb,
  _tokenDeci,
  _tokenImg
) {
  await (window as any).ethereum.request({
    method: "wallet_watchAsset",
    params: {
      type: "ERC20",
      options: {
        address: _tokenAddr,
        symbol: _tokenSymb,
        decimals: _tokenDeci,
        image: _tokenImg,
      },
    },
  });
}

export function calcUnlockTime(_productSel) {
  let now = new Date().getTime() / 1000;
  return getDateFromUnixTimestamp(now + stakingPeriods[_productSel]).split(
    " "
  )[0];
}

function countDecimals(value) {
  if (value.includes(".") == false) {
    return 0;
  }
  let decimalPart = `${value}`.split(".")[1];
  return decimalPart.length;
}

function check18Decimals(value) {
  let decimals = countDecimals(value);
  return decimals <= 19;
}

export async function switchToMainnet() {
  await (window as any).ethereum.request({
    method: "wallet_switchEthereumChain",
    params: [{ chainId: "0x1" }],
  });
  return;
}



export interface HIstoryData {
  id: number,
  nftid: number,
  time: string,
  floor_price: number,
  volumn: number
  sales: number
}