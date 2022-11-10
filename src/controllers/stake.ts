import { ethers } from "ethers";

export async function stake(_value, _plan) {
  const LP : any=  {}
  if (ethers.utils.parseEther(_value).toNumber() == 0) {
    return;
  }
  let txnValue = { value: ethers.utils.parseEther(_value) };
  let txn = await LP.stake(_plan, txnValue);
  let result = await txn.wait();
  if (result.events[0].event == "userStakeTxn") {
    
  }
}

// this is how to unstake
export async function unstake(_index) {
  const LP : any = {}
  let txn = await LP.unstake(_index);
  let result = await txn.wait();
  if (result.events[0].event == "userUnstakeTxn") {
    
  }
}
