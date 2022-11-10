import { useAppContext } from "@/context/AppContextProvider";
import { ethers } from "ethers";
import { getDateFromUnixTimestamp } from "./uttils";

export async function stake(_value, _plan) {
  const LP: any = {}
  if (ethers.utils.parseEther(_value).toNumber() == 0) {
    return;
  }
  let txnValue = { value: ethers.utils.parseEther(_value) };
  let txn = await LP.stake(_plan, txnValue);
  let result = await txn.wait();
  if (result.events[0].event == "userStakeTxn") {

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

export async function getStakeInfo() {
  const { address } = useAppContext();
  const LP: any = ""
  let result = [];
  let account = await LP.accounts(address);
  let upIndex = parseInt(account._hex, 16);
  for (let i = 0; i < upIndex; i++) {
    let currentInd = `${i}`;
    let reward = await LP.getReward(address, currentInd);
    let pricipal = await LP.getPrincipal(address, currentInd);
    let duration = await LP.getDuration(address, currentInd);
    let begTime = await LP.getBegTime(address, currentInd);
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
