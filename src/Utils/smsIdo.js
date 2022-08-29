export const smsIdoContractAddress =
  "0xb9969F83A715c4a76E85c0EdFe0130f214Ac1d30";
export const smsContractAbi = [{
  "inputs": [{
    "internalType": "contract IBEP20",
    "name": "_HPG",
    "type": "address"
  }, {
    "internalType": "contract IBEP20",
    "name": "_BUSD",
    "type": "address"
  }],
  "stateMutability": "nonpayable",
  "type": "constructor"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "internalType": "address",
    "name": "previousOwner",
    "type": "address"
  }, {
    "indexed": true,
    "internalType": "address",
    "name": "newOwner",
    "type": "address"
  }],
  "name": "OwnershipTransferred",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "internalType": "address",
    "name": "T1",
    "type": "address"
  }, {
    "indexed": true,
    "internalType": "uint256",
    "name": "t1",
    "type": "uint256"
  }],
  "name": "Transaction1",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "internalType": "address",
    "name": "T2",
    "type": "address"
  }, {
    "indexed": true,
    "internalType": "uint256",
    "name": "t2",
    "type": "uint256"
  }],
  "name": "Transaction2",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "internalType": "address",
    "name": "T3",
    "type": "address"
  }, {
    "indexed": true,
    "internalType": "uint256",
    "name": "t3",
    "type": "uint256"
  }],
  "name": "Transaction3",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "internalType": "address",
    "name": "T4",
    "type": "address"
  }, {
    "indexed": true,
    "internalType": "uint256",
    "name": "t4",
    "type": "uint256"
  }],
  "name": "Transaction4",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "internalType": "address",
    "name": "from",
    "type": "address"
  }, {
    "indexed": true,
    "internalType": "address",
    "name": "to",
    "type": "address"
  }, {
    "indexed": false,
    "internalType": "uint256",
    "name": "value",
    "type": "uint256"
  }, {
    "indexed": false,
    "internalType": "uint256",
    "name": "time",
    "type": "uint256"
  }],
  "name": "TransferBUSD",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "internalType": "address",
    "name": "owner",
    "type": "address"
  }, {
    "indexed": true,
    "internalType": "address",
    "name": "spender",
    "type": "address"
  }, {
    "indexed": false,
    "internalType": "uint256",
    "name": "value",
    "type": "uint256"
  }, {
    "indexed": false,
    "internalType": "uint256",
    "name": "time",
    "type": "uint256"
  }],
  "name": "TransferHPG",
  "type": "event"
}, {
  "inputs": [],
  "name": "BUSD",
  "outputs": [{
    "internalType": "contract IBEP20",
    "name": "",
    "type": "address"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "BUSDRate",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "address",
    "name": "refer",
    "type": "address"
  }],
  "name": "CheckReferrals",
  "outputs": [{
    "internalType": "bool",
    "name": "",
    "type": "bool"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "HPG",
  "outputs": [{
    "internalType": "contract IBEP20",
    "name": "",
    "type": "address"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "address",
    "name": "referredBy",
    "type": "address"
  }, {
    "internalType": "uint256",
    "name": "_amount",
    "type": "uint256"
  }],
  "name": "Refer",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [],
  "name": "Time",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "ViewUsers",
  "outputs": [{
    "internalType": "address[]",
    "name": "",
    "type": "address[]"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "address",
    "name": "",
    "type": "address"
  }],
  "name": "alladdress",
  "outputs": [{
    "internalType": "address",
    "name": "",
    "type": "address"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "uint256",
    "name": "_BUSDAmount",
    "type": "uint256"
  }, {
    "internalType": "address",
    "name": "referredBy",
    "type": "address"
  }],
  "name": "buyTokens",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [],
  "name": "firstPercentage",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "fourthPercentage",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "uint256",
    "name": "_BUSDAmount",
    "type": "uint256"
  }],
  "name": "getInvestorBonus",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "uint256",
    "name": "_amount",
    "type": "uint256"
  }],
  "name": "getValues",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }, {
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }, {
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }, {
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "address",
    "name": "_user",
    "type": "address"
  }],
  "name": "getaddress",
  "outputs": [{
    "internalType": "address",
    "name": "",
    "type": "address"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "address",
    "name": "_user",
    "type": "address"
  }],
  "name": "getaddresses",
  "outputs": [{
    "internalType": "address",
    "name": "add1",
    "type": "address"
  }, {
    "internalType": "address",
    "name": "add2",
    "type": "address"
  }, {
    "internalType": "address",
    "name": "add3",
    "type": "address"
  }, {
    "internalType": "address",
    "name": "add4",
    "type": "address"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "investorBonus",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "owner",
  "outputs": [{
    "internalType": "address",
    "name": "",
    "type": "address"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "percentage",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "saleOn",
  "outputs": [{
    "internalType": "bool",
    "name": "",
    "type": "bool"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "secondPercentage",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "uint256",
    "name": "_rate",
    "type": "uint256"
  }],
  "name": "setBUSDToHPGrate",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "uint256",
    "name": "_InvestorBonus",
    "type": "uint256"
  }],
  "name": "setInvestorPercentage",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "uint256",
    "name": "_firstPercentage",
    "type": "uint256"
  }, {
    "internalType": "uint256",
    "name": "_secondPercentage",
    "type": "uint256"
  }, {
    "internalType": "uint256",
    "name": "_thirdPercentage",
    "type": "uint256"
  }, {
    "internalType": "uint256",
    "name": "_fourthPercentage",
    "type": "uint256"
  }],
  "name": "setPercentages",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "bool",
    "name": "oN_Off",
    "type": "bool"
  }],
  "name": "setSALE",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [],
  "name": "thirdPercentage",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "address",
    "name": "newOwner",
    "type": "address"
  }],
  "name": "transferOwnership",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "uint256",
    "name": "_amount",
    "type": "uint256"
  }],
  "name": "withDrawBUSD",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "uint256",
    "name": "_amount",
    "type": "uint256"
  }],
  "name": "withDrawHPG",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}];