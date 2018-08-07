import { BigNumber as BN } from "bignumber.js";
import { getKeccak256Hash, prepend64Zeros, removePrependedZero } from "../util";

export const tokenNameSignature = getKeccak256Hash("name()").slice(0, 10);
export const tokenSymbolSignature = getKeccak256Hash("symbol()").slice(0, 10);
export const tokenDecimalsSignature = getKeccak256Hash("decimals()").slice(
  0,
  10
);
export const tokenTotalSupplySignature = getKeccak256Hash(
  "totalSupply()"
).slice(0, 10);
export const tokenBalanceOfSignature = getKeccak256Hash(
  "balanceOf(address)"
).slice(0, 10);
export const tokenTransferSignature = getKeccak256Hash(
  "transfer(address,uint256)"
).slice(0, 10);

export function getTokenNameABIEncoded() {
  return tokenNameSignature;
}

export function getSymbolABIEncoded() {
  return tokenSymbolSignature;
}

export function getDecimalsABIEncoded() {
  return tokenDecimalsSignature;
}

export function getTotalSupplyABIEncoded() {
  return tokenTotalSupplySignature;
}

export function getBalanceOfABIEncoded(address) {
  const addressWithoutZero = removePrependedZero(address.toLowerCase());

  return `${tokenBalanceOfSignature}${prepend64Zeros(addressWithoutZero)}`;
}

export function getTransferABIEncoded(to, value) {
  const addressWithoutZero = removePrependedZero(to.toLowerCase());
  const valueHexStringWithoutZero = removePrependedZero(
    new BN(value).toString(16)
  );

  return `${tokenTransferSignature}${prepend64Zeros(
    addressWithoutZero
  )}${prepend64Zeros(valueHexStringWithoutZero)}`;
}

export const ABIJSON = [
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [
      {
        name: "",
        type: "string"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "from",
        type: "address"
      },
      {
        name: "to",
        type: "address"
      },
      {
        name: "value",
        type: "uint256"
      }
    ],
    name: "transferFrom",
    outputs: [
      {
        name: "",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [
      {
        name: "",
        type: "uint8"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        name: "owner",
        type: "address"
      }
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [
      {
        name: "",
        type: "string"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "to",
        type: "address"
      },
      {
        name: "value",
        type: "uint256"
      }
    ],
    name: "transfer",
    outputs: [
      {
        name: "",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  }
];
