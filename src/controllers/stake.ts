import { ethers } from "ethers";
import { LP } from ".";

export async function stake(_value, _plan) {
  if (ethers.utils.parseEther(_value).toNumber() == 0) {
    return;
  }
  let txnValue = { value: ethers.utils.parseEther(_value) };
  let txn = await LP.stake(_plan, txnValue);
  let result = await txn.wait();
  if (result.events[0].event == "userStakeTxn") {
    console.log("Success");
  }
}

// this is how to unstake
export async function unstake(_index) {
  let txn = await LP.unstake(_index);
  let result = await txn.wait();
  if (result.events[0].event == "userUnstakeTxn") {
    console.log("Success");
  }
}
