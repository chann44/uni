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


