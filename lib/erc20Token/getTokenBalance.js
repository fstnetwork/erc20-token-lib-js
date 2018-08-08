import { BigNumber as BN } from "bignumber.js";

import { getSmartContractCall } from "../etherscanAPI/actions";

import { getDecimalsABIEncoded, getBalanceOfABIEncoded } from "./abi";

import { prependZero } from "../util";

export default function(network, apikey, tokenAddress, holderAddress) {
  return Promise.all([
    getSmartContractCall(
      network,
      apikey,
      tokenAddress,
      getDecimalsABIEncoded()
    ),
    getSmartContractCall(
      network,
      apikey,
      tokenAddress,
      getBalanceOfABIEncoded(holderAddress)
    )
  ]).then(([decimalsData, balanceData]) => {
    return {
      decimals: new BN(prependZero(decimalsData)).toNumber(),
      balance: new BN(prependZero(balanceData)).toString(10),
      balanceHumanNumberString: new BN(prependZero(balanceData))
        .shiftedBy(-1 * new BN(prependZero(decimalsData)).toNumber())
        .toString(10),
      balanceDecimaledNumberString: new BN(prependZero(balanceData)).toString(
        10
      )
    };
  });
}
