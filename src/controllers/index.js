// all the api calls and function starts here
import { ethers, utils, Wallet } from "ethers";
import { LP_ABI, uAzuki, uBeanz, uDoodles, uBoredApe, uMoonBirds } from "./ABI";


const uNFTData = {
  1: [
    "azuki",
    "0xf8CA97BE31E89D3FfB229F7AB8483bB9bB63F4fB",
    "uAzuki",
    "https://uniasset.oss-cn-hongkong.aliyuncs.com/token/azuki.pic.jpg",
  ],
  2: [
    "beanz-official",
    "0x3F767247aF189f6dF7660e105CD4a8E5632215f6",
    "uBeanz",
    "https://uniasset.oss-cn-hongkong.aliyuncs.com/token/13091656434593_.pic.jpg",
  ],
  3: [
    "doodles",
    "0x6C67cD5E815F6E274DFf75A4ee180e3cF49f98eD",
    "uDoodles",
    "https://uniasset.oss-cn-hongkong.aliyuncs.com/token/13101656434599_.pic.jpg",
  ],
  4: [
    "bored-ape-yacht-club",
    "0x61fDa6A13C255497146708A834896D70c33e41fe",
    "uBoredApe",
    "https://uniasset.oss-cn-hongkong.aliyuncs.com/token/13111656434603_.pic.jpg",
  ],
  5: [
    "proof-moonbirds",
    "0x91aE457665E95cADBd7630587FdF925afF065694",
    "uMoonBirds",
    "https://uniasset.oss-cn-hongkong.aliyuncs.com/token/13121656434613_.pic.jpg",
  ],
};

const uNFTDataBySlug = {
  azuki: [1, "0xf8CA97BE31E89D3FfB229F7AB8483bB9bB63F4fB"],
  "beanz-official": [2, "0x3F767247aF189f6dF7660e105CD4a8E5632215f6"],
  doodles: [3, "0x6C67cD5E815F6E274DFf75A4ee180e3cF49f98eD"],
  "bored-ape-yacht-club": [4, "0x61fDa6A13C255497146708A834896D70c33e41fe"],
  "proof-moonbirds": [5, "0x91aE457665E95cADBd7630587FdF925afF065694"],
};
const LP_addr = "0xacf64aD70D1ED44d094b8816b10B3A76df001b3d";

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

let provider;
let signer;
let LP;
let uAzukiInstance;
let uBeanzInstance;
let uDoodlesInstance;
let uBoredApeInstance;
let uMoonBirdsInstance;

if (!window.ethereum) {
  console.log("MetaMask is not installed");
} else {
  provider = new ethers.providers.Web3Provider(window.ethereum);
  signer = provider.getSigner();

  const  LP = new ethers.Contract(LP_addr, LP_ABI, signer);

  // contract instance
  uAzukiInstance = new ethers.Contract(uNFTData[1][1], uAzuki, signer);
  uBeanzInstance = new ethers.Contract(uNFTData[2][1], uBeanz, signer);
  uDoodlesInstance = new ethers.Contract(uNFTData[3][1], uDoodles, signer);
  uBoredApeInstance = new ethers.Contract(uNFTData[4][1], uBoredApe, signer);
  uMoonBirdsInstance = new ethers.Contract(uNFTData[5][1], uMoonBirds, signer);
  uNFTData[1].push(uAzukiInstance);
  uNFTData[2].push(uBeanzInstance);
  uNFTData[3].push(uDoodlesInstance);
  uNFTData[4].push(uBoredApeInstance);
  uNFTData[5].push(uMoonBirdsInstance);
}

async function approve(productId, _addr, _amt) {
  let txn = await uNFTData[productId][4].approve(
    _addr,
    ethers.utils.parseEther(_amt)
  );
  let hash = await txn.hash;

  return hash;
}

const toSqlDatetime = (inputDate) => {
  const date = new Date(inputDate);
  const dateWithOffest = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  );
  return dateWithOffest.toISOString().slice(0, 19).replace("T", " ");
};



// use this to stake eth and earn azuki 
async function stake(_value, _plan) {
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
async function unstake(_index) {
  let txn = await LP.unstake(_index);
  let result = await txn.wait();
  if (result.events[0].event == "userUnstakeTxn") {
    console.log("Success");
  }
}

// get all the stakes info a user staked 
async function getStakeInfo() {
  let result = [];
  let account = await LP.accounts(window.userWalletAddress);
  let upIndex = parseInt(account._hex, 16);
  for (let i = 0; i < upIndex; i++) {
    let currentInd = `${i}`;
    let reward = await LP.getReward(window.userWalletAddress, currentInd);
    let pricipal = await LP.getPrincipal(window.userWalletAddress, currentInd);
    let duration = await LP.getDuration(window.userWalletAddress, currentInd);
    let begTime = await LP.getBegTime(window.userWalletAddress, currentInd);
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


// date from unix timstamp 
function getDateFromUnixTimestamp(_unixTimestamp) {
  let date = new Date(_unixTimestamp * 1000);
  return (
    date.toLocaleDateString("en-US") + " " + date.toLocaleTimeString("en-US")
  );
}


// send eth
async function sendRawTxn(_recipient, _amt) {
  const txn = {
    from: window.userWalletAddress,
    to: _recipient,
    value: ethers.utils.parseEther(_amt),
  };
  let trans = await signer.sendTransaction(txn);
  let hash = await trans.hash;
  return hash;
}

// async function fetchPrice() {
//   return;
//   var settings = {
//     url: "http://172.20.10.11:8080",
//     method: "GET",
//     timeout: 0,
//   };

//   await $.ajax(settings).done(function (response) {
//     window.ETH2USD = response.data["1027"].quote.USD.price;
//   });
// }

async function quoteBuy(_unftNum, _nftId) {
  console.log(_nftId);
  let result = []; // total price, transfer fee, poundage, premium
  let _slug = uNFTData[_nftId][0]; // should be determined automatically
  var settings = {
    url: "https://wegroup.app/calBuyUNFTPrice",
    method: "POST",
    timeout: 0,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {
      unftNum: _unftNum,
      nftId: _nftId,
      slug: _slug,
    },
  };

  await $.ajax(settings).done(function (response) {
    result.push(response.UNftPriceInfo.price_needed);
    result.push(response.UNftPriceInfo.transferFee);
    result.push(response.UNftPriceInfo.poundage);
    result.push(response.UNftPriceInfo.premiumFee);
  });

  console.log(result);
  return result;
}

async function quoteSell(_unftNum, _nftId) {
  let result = []; // total price, transfer fee, poundage, premium
  let _slug = uNFTData[_nftId][0]; // should be determined automatically
  var settings = {
    url: "https://wegroup.app/calSellUNFTPrice",
    method: "POST",
    timeout: 0,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {
      unftNum: _unftNum,
      nftId: _nftId,
      slug: _slug,
    },
  };

  await ajax(settings).done(function (response) {
    result.push(response.UNftPriceInfo.price_needed);
    result.push(response.UNftPriceInfo.transferFee);
    result.push(response.UNftPriceInfo.poundage);
    result.push(response.UNftPriceInfo.premiumFee);
  });

  return result;
}

function processBuy(_value, _product) {
  console.log(_domArr);
  let vaultAddr = "0x85D546B0a97775D1553C2aAeE7c191211D3740Cd"; // smart contract 
  let address = window.userWalletAddress;
  let buyValEth = _value;
  let productId = _product;
  if (address == null) {
    console.log("Please connect your wallet");
    alert("Please connect your wallet");
    return;
  }
  sendRawTxn(vaultAddr, buyValEth).then(async (hs) => {
    let finalQuote = await quoteBuy(1, parseInt(productId));
    let buyValUNFT = buyValEth / finalQuote[0];
    console.log(buyValUNFT);
    console.log(hs);
    $.ajax({
      method: "POST",
      url: "https://wegroup.app/buyNFT",
      data: {
        userAddr: address,
        unftId: parseInt(productId),
        unftNum: buyValUNFT,
        nftId: parseInt(productId),
        txHash: hs,
      },
      success: function (data) {
        if (data.code == 200) {
          addTokenToWallet(
            uNFTData[productId][1],
            uNFTData[productId][2],
            18,
            uNFTData[productId][3]
          );
        } else if (data.code == 500) {
          console.log(data.msg);
        }
      },
    });
  });
}

function processSell(_value, _product, _domArr) {
  let approveAddr = "0xc777f6E867D5EeF7dD1735Dc5Ca38cd07B389A04";
  let address = window.userWalletAddress;
  let sellVal = _value;
  let productId = _product;
  if (address == null) {
    console.log("Please connect your wallet");
    return;
  }
  approve(_product, approveAddr, sellVal).then(async (hs) => {
    _domArr[0].classList.add("no-display");
    _domArr[1].classList.remove("no-display");

    console.log(hs);
    $.ajax({
      method: "POST",
      url: "https://wegroup.app/sellNFT",
      data: {
        userAddr: address,
        unftId: parseInt(productId),
        nftId: parseInt(productId),
        unftNum: parseFloat(sellVal),
        txHash: hs,
      },
      success: function (data) {
        if (data.code == 200) {
          console.log("done")
       } else if (data.code == 500) {
          console.log(data.msg);
        }
      },
    });
  });
}

async function getClientUNFTBal(_tokenContractInstance) {
  let result = await _tokenContractInstance.balanceOf(window.userWalletAddress);
  return parseInt(result._hex, 16) / 10 ** 18;
}

async function switchToMainnet() {
  await ethereum.request({
    method: "wallet_switchEthereumChain",
    params: [{ chainId: "0x1" }],
  });
  return;
}

async function addTokenToWallet(_tokenAddr, _tokenSymb, _tokenDeci, _tokenImg) {
  await ethereum.request({
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

const stakingPeriods = {
  1: 604800,
  2: 3024000,
  3: 6048000,
  4: 21168000,
  5: 31449600,
};

function calcUnlockTime(_productSel) {
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

export {
  stake,
  unstake,
  getStakeInfo,
  getDateFromUnixTimestamp,
  sendRawTxn,
  fetchPrice,
  quoteBuy,
  quoteSell,
  processBuy,
  processSell,
  switchToMainnet,
  addTokenToWallet,
  calcUnlockTime,
  sleep,
  countDecimals,
  check18Decimals,
  toSqlDatetime,
  uNFTDataBySlug,
  uNFTData,
};
