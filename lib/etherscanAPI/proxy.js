import { apiRequest } from "./httpClient";

const mainnetNames = [
  "https://api.etherscan.io",
  "main",
  "mainnet",
  "main-net",
  "main net",
  "foundation",
  "0"
];

const kovanNames = [
  "https://api-kovan.etherscan.io",
  "kovan",
  "42",
  "kovan testnet",
  "kovan-testnet",
  "kovan test-net",
  "kovan-test-net"
];

export function perfromProxyAction(
  network,
  apikey,
  moduleName,
  actionName,
  actionParams
) {
  let endpoint = "";

  if (mainnetNames.some(n => n === (network + "").toLowerCase())) {
    endpoint = mainnetNames[0];
  }

  if (kovanNames.some(n => n === (network + "").toLowerCase())) {
    endpoint = kovanNames[0];
  }

  if (endpoint === "") {
    throw new Error("not supported network name" + network);
  }

  return apiRequest(
    endpoint,
    {
      module: moduleName,
      action: actionName,
      ...actionParams
    },
    apikey
  );
}
