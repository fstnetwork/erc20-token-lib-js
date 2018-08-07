import { BigNumber as BN } from "bignumber.js";

import { decodeMethod } from "ethjs-abi";

import { getSmartContractCall } from "../etherscanAPI/actions";

import {
  getDecimalsABIEncoded,
  getSymbolABIEncoded,
  getTokenNameABIEncoded,
  getTotalSupplyABIEncoded,
  ABIJSON
} from "./abi";

import { prependZero } from "../util";

export function getTokenInfo(network, apikey, tokenAddress) {
  return Promise.all([
    getSmartContractCall(
      network,
      apikey,
      tokenAddress,
      getDecimalsABIEncoded()
    ),
    getSmartContractCall(network, apikey, tokenAddress, getSymbolABIEncoded()),
    getSmartContractCall(
      network,
      apikey,
      tokenAddress,
      getTokenNameABIEncoded()
    ),
    getSmartContractCall(
      network,
      apikey,
      tokenAddress,
      getTotalSupplyABIEncoded()
    )
  ]).then(([decimalsData, symbolData, nameData, totalSupplyData]) => {
    // console.log(decimalsData.data);
    // console.log(symbolData.data);
    // console.log(nameData.data);
    // console.log(totalSupplyData.data);

    return {
      decimals: new BN(prependZero(decimalsData.data.result)).toNumber(),
      symbol: decodeMethod(
        ABIJSON.find(abi => abi.name === "symbol"),
        symbolData.data.result
      )[0],
      name: decodeMethod(
        ABIJSON.find(abi => abi.name === "name"),
        nameData.data.result
      )[0],
      totalSupply: new BN(prependZero(totalSupplyData.data.result)).toString(
        10
      ),
      totalSupplyHumanNumber: new BN(prependZero(totalSupplyData.data.result))
        .shiftedBy(
          -1 * new BN(prependZero(decimalsData.data.result)).toNumber()
        )
        .toString(10)
    };
  });
}
