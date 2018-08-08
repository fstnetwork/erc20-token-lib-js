import { perfromAction as perfromEnodeAction } from "./enodeProxy";
import { perfromAction as perfromEtherscanAccountAction } from "./etherscanAccountProxy";

export function getSmartContractCall(network, apikey, to, data) {
  return perfromEnodeAction(network, apikey, "eth_call", {
    to,
    data,
    tag: "latest"
  });
}

export function getETHBalance(network, apikey, address) {
  return perfromEtherscanAccountAction(network, apikey, "balance", {
    address,
    tag: "latest"
  });
}

export function getNonce(network, apikey, address) {
  return perfromEnodeAction(network, apikey, "eth_getTransactionCount", {
    address,
    tag: "pending"
  });
}

export function getEstimateGas(network, apikey, from, to, data) {
  return perfromEnodeAction(network, apikey, "eth_estimateGas", {
    from,
    to,
    data
  });
}

export function getEthGasPrice(network, apikey) {
  return perfromEnodeAction(network, apikey, "eth_gasPrice", {});
}

export function sendRawSignedTransaction(network, apikey, hex) {
  return perfromEnodeAction(network, apikey, "eth_sendRawTransaction", {
    hex
  });
}

export function getTransactionReceipt(network, apikey, txhash) {
  return perfromEnodeAction(network, apikey, "eth_getTransactionReceipt", {
    txhash
  });
}
