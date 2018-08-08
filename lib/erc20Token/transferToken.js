import { BigNumber as BN } from "bignumber.js";
import { privateToAccount } from "ethjs-account";
import { SignTransaction } from "eth-key-lib-js";

import {
  getEstimateGas,
  getETHBalance,
  getEthGasPrice,
  getNonce,
  sendRawSignedTransaction
} from "../etherscanAPI/actions";

import { prependZero, getNetworkNumber } from "../util";

import { getTransferABIEncoded } from "../erc20Token/abi";

export default function transferToken(
  network,
  apikey,
  privateKeyBuffer,
  tokenAddress,
  receiverAddress,
  tokenValueString,
  extraParams
) {
  let gasPriceGweiString = null;
  let chainId = null;
  let dryRun = null;

  if (extraParams !== undefined) {
    gasPriceGweiString = extraParams.gasPriceGweiString || null;
    chainId = extraParams.chainId || null;
    dryRun = extraParams.dryRun || null;
  }

  const senderAddress = prependZero(
    privateToAccount(prependZero(privateKeyBuffer.toString("hex"))).address
  );

  const encodedData = getTransferABIEncoded(receiverAddress, tokenValueString);

  return Promise.all([
    getEstimateGas(network, apikey, senderAddress, tokenAddress, encodedData),
    getETHBalance(network, apikey, senderAddress),
    gasPriceGweiString !== null
      ? new BN(gasPriceGweiString).toString(16)
      : getEthGasPrice(network, apikey),
    getNonce(network, apikey, senderAddress)
  ]).then(([estimateGasData, ethBalanceData, ethGasPriceData, nonceData]) => {
    const _estimateGasData = prependZero(
      new BN(estimateGasData).plus(new BN("30000")).toString(16)
    );

    if (
      new BN(_estimateGasData)
        .times(new BN(ethGasPriceData))
        .gt(new BN(ethBalanceData))
    ) {
      throw new Error("ether balance is not sufficient!");
    }

    let _chainId;

    if (chainId === null) {
      _chainId = getNetworkNumber(network);
    } else {
      _chainId = new BN(chainId).toNumber();
    }

    const txObj = {
      to: tokenAddress,
      value: "0x0",
      data: encodedData,
      nonce: nonceData,
      gasLimit: _estimateGasData,
      gasPrice: ethGasPriceData,
      chainId: _chainId
    };

    console.info("transfer token txObj", txObj);

    const hex = SignTransaction(privateKeyBuffer, txObj);

    if (dryRun) {
      return hex;
    }

    return sendRawSignedTransaction(network, apikey, hex);
  });
}
