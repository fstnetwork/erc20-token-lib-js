import createKeccakHash from "keccak";
import { BigNumber as BN } from "bignumber.js";

function getKeccak256Hash(str) {
  return prependZero(
    createKeccakHash("keccak256")
      .update(str)
      .digest("hex")
  );
}

function prependZero(str) {
  if (str.startsWith("0x")) {
    return str;
  }

  return "0x" + str;
}

function removePrependedZero(str) {
  if (str.startsWith("0x")) {
    return str.replace("0x", "");
  }

  return str;
}

function prependZeros(str, totalLength) {
  let tmpStr = removePrependedZero(str);

  if (totalLength === undefined || totalLength === null) {
    return tmpStr;
  }

  const originLength = tmpStr.length;

  if (originLength > totalLength) {
    return tmpStr;
  }

  for (let i = 0; i < totalLength - originLength; i++) {
    tmpStr = "0" + tmpStr;
  }

  return tmpStr;
}

function prepend64Zeros(str) {
  return prependZeros(str, 64);
}

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
