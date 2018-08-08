import createKeccakHash from "keccak";

export function getKeccak256Hash(str) {
  return prependZero(
    createKeccakHash("keccak256")
      .update(str)
      .digest("hex")
  );
}

export function prependZero(str) {
  if (str.startsWith("0x")) {
    return str;
  }

  return "0x" + str;
}

export function removePrependedZero(str) {
  if (str.startsWith("0x")) {
    return str.replace("0x", "");
  }

  return str;
}

export function prependZeros(str, totalLength) {
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

export function prepend64Zeros(str) {
  return prependZeros(str, 64);
}

export function getNetworkNumber(str) {
  const mainnetNames = [
    "https://api.etherscan.io",
    "main",
    "mainnet",
    "main-net",
    "main net",
    "foundation",
    "frontier",
    "1"
  ];

  const kovanNames = [
    "https://api-kovan.etherscan.io",
    "kovan",
    "42",
    "kovan testnet",
    "kovan-testnet",
    "kovan test-net",
    "kovan-test-net",
    "kovan test net"
  ];

  const ropstenNames = [
    "https://api-ropsten.etherscan.io",
    "ropsten",
    "3",
    "ropsten testnet",
    "ropsten-testnet",
    "ropsten test-net",
    "ropsten-test-net",
    "ropsten test net"
  ];

  const rinkebyNames = [
    "https://api-rinkeby.etherscan.io",
    "rinkeby",
    "4",
    "rinkeby testnet",
    "rinkeby-testnet",
    "rinkeby test-net",
    "rinkeby-test-net",
    "rinkeby test net"
  ];

  if (mainnetNames.some(n => n === (str + "").toLowerCase())) {
    return 1;
  }

  if (kovanNames.some(n => n === (str + "").toLowerCase())) {
    return 42;
  }

  if (ropstenNames.some(n => n === (str + "").toLowerCase())) {
    return 3;
  }

  if (rinkebyNames.some(n => n === (str + "").toLowerCase())) {
    return 4;
  }

  throw new Error("not supported network name" + str);
}

export function getNetworkEndPoint(str) {
  const chainId = getNetworkNumber(str);

  let endpoint = "";

  if (chainId === 1) {
    endpoint = "https://api.etherscan.io";
  }

  if (chainId === 42) {
    endpoint = "https://api-kovan.etherscan.io";
  }

  if (chainId === 3) {
    endpoint = "https://api-ropsten.etherscan.io";
  }

  if (chainId === 4) {
    endpoint = "https://api-rinkeby.etherscan.io";
  }

  if (endpoint === "") {
    throw new Error("not supported network name" + str);
  }

  return endpoint;
}
