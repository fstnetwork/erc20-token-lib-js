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

export default function getTokenInfo(limiter, network, apikey, tokenAddress) {
  return Promise.all([
    getSmartContractCall(
      limiter,
      network,
      apikey,
      tokenAddress,
      getDecimalsABIEncoded()
    ),
    getSmartContractCall(
      limiter,
      network,
      apikey,
      tokenAddress,
      getSymbolABIEncoded()
    ),
    getSmartContractCall(
      limiter,
      network,
      apikey,
      tokenAddress,
      getTokenNameABIEncoded()
    ),
    getSmartContractCall(
      limiter,
      network,
      apikey,
      tokenAddress,
      getTotalSupplyABIEncoded()
    )
  ]).then(([decimalsData, symbolData, nameData, totalSupplyData]) => {
    return {
      decimals: new BN(prependZero(decimalsData)).toNumber(),
      symbol: decodeMethod(
        ABIJSON.find(abi => abi.name === "symbol"),
        symbolData
      )[0],
      name: decodeMethod(ABIJSON.find(abi => abi.name === "name"), nameData)[0],
      totalSupply: new BN(prependZero(totalSupplyData)).toString(10),
      totalSupplyHumanNumberString: new BN(prependZero(totalSupplyData))
        .shiftedBy(-1 * new BN(prependZero(decimalsData)).toNumber())
        .toString(10),
      totalSupplyDecimaledNumberString: new BN(
        prependZero(totalSupplyData)
      ).toString(10)
    };
  });
}
