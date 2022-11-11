import { useAppContext } from "@/context/AppContextProvider";
import { ethers } from "ethers";
import { getDateFromUnixTimestamp } from "./uttils";
import {
  LP_ABI,
  uAzuki,
  uBeanz,
  uDoodles,
  uBoredApe,
  uMoonBirds,
} from "./ABI.js";



export async function stake(_value, _plan, Lp) {
  let txnValue = { value: ethers.utils.parseEther(_value) };
  let txn = await Lp.stake(_plan, txnValue);
  let result = await txn.wait();
  if (result.events[0].event == "userStakeTxn") {
    console.log("txn happende")
  }
}

export async function unstake(_index) {
  const { address } = useAppContext();
  const LP: any = ""
  let txn = await LP.unstake(_index);
  let result = await txn.wait();
  if (result.events[0].event == "userUnstakeTxn") {

  }
}

export async function getStakeInfo(address, Lp) {
  let result = [];
  console.log(Lp)

  let account = await Lp.accounts("0xA3BCE4E423970ca35C4339500Cac0BC5c439CD29");
  let upIndex = parseInt(account._hex, 16);
  for (let i = 0; i < upIndex; i++) {
    let currentInd = `${i}`;
    let reward = await Lp.getReward(address, currentInd);
    let pricipal = await Lp.getPrincipal(address, currentInd);
    let duration = await Lp.getDuration(address, currentInd);
    let begTime = await Lp.getBegTime(address, currentInd);
    let rewardFormatted = parseInt(reward._hex, 16) / 10 ** 18;
    let pricipalFormatted = parseInt(pricipal._hex, 16) / 10 ** 18;
    let unlockTimeFormatted = getDateFromUnixTimestamp(
      parseInt(begTime._hex, 16) + parseInt(duration._hex, 16)
    );
    let begTimeFormatted = getDateFromUnixTimestamp(parseInt(begTime._hex, 16));
    if (pricipalFormatted != 0) {
      result.push([
        currentInd,
        pricipalFormatted,
        begTimeFormatted,
        unlockTimeFormatted,
        rewardFormatted,
      ]);
    }
  }
  return result;
}
