import { perfromAction as perfromEnodeAction } from "./enodeProxy";
import { perfromAction as perfromEtherscanAccountAction } from "./etherscanAccountProxy";

export function getSmartContractCall(limiter, network, apikey, to, data) {
  return perfromEnodeAction(limiter, network, apikey, "eth_call", {
    to,
    data,
    tag: "latest"
  });
}

export function getETHBalance(limiter, network, apikey, address) {
  return perfromEtherscanAccountAction(limiter, network, apikey, "balance", {
    address,
    tag: "latest"
  });
}

export function getNonce(limiter, network, apikey, address) {
  return perfromEnodeAction(
    limiter,
    network,
    apikey,
    "eth_getTransactionCount",
    {
      address,
      tag: "pending"
    }
  );
}

export function getEstimateGas(limiter, network, apikey, from, to, data) {
  return perfromEnodeAction(limiter, network, apikey, "eth_estimateGas", {
    from,
    to,
    data
  });
}

export function getEthGasPrice(limiter, network, apikey) {
  return perfromEnodeAction(limiter, network, apikey, "eth_gasPrice", {});
}

export function sendRawSignedTransaction(limiter, network, apikey, hex) {
  return perfromEnodeAction(
    limiter,
    network,
    apikey,
    "eth_sendRawTransaction",
    {
      hex
    }
  );
}

export function getTransactionReceipt(limiter, network, apikey, txhash) {
  return perfromEnodeAction(
    limiter,
    network,
    apikey,
    "eth_getTransactionReceipt",
    {
      txhash
    }
  );
}

export function getSmartContractCode(limiter, network, apikey, address) {
  return perfromEnodeAction(limiter, network, apikey, 'eth_getCode', {
    address,
  });
}