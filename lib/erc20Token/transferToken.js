import { BigNumber as BN } from "bignumber.js";
import { privateToAccount } from "ethjs-account";
import { decodeMethod } from "ethjs-abi";
import { SignTransaction } from "eth-key-lib-js";

import {
  getSmartContractCall,
  getEstimateGas,
  getETHBalance,
  getEthGasPrice,
  getNonce,
  getTransactionReceipt,
  sendRawSignedTransaction
} from "../etherscanAPI/actions";

import { prependZero } from "../util";

import { getTransferABIEncoded } from "../erc20Token/abi";

export default function transferToken(
  network,
  apikey,
  privateKeyBuffer,
  tokenAddress,
  receiverAddress,
  tokenValueString
) {
  const senderAddress = prependZero(
    privateToAccount(prependZero(privateKeyBuffer.toString("hex"))).address
  );

  return Promise.all([
    getEstimateGas(
      network,
      apikey,
      senderAddress,
      tokenAddress,
      getTransferABIEncoded(receiverAddress, tokenValueString)
    ),
    getETHBalance(network, apikey, senderAddress),
    getEthGasPrice(network, apikey),
    getNonce(network, apikey, senderAddress)
  ]).then(([estimateGasData, ethBalanceData, ethGasPriceData, nonceData]) => {
    return {
      estimateGasData,
      ethBalanceData,
      ethGasPriceData,
      nonceData
    };
  });
}
