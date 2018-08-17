# erc20-token-lib-js
ERC20 helper functions for nodejs / web, using enode proxy on etherscan.io

## Installation

```
npm install https://github.com/funderstoken/erc20-token-lib-js

// or
yarn add https://github.com/funderstoken/erc20-token-lib-js
```

## Prerequisite

Please register an account on [etherscan.io](https://etherscan.io), and then create api-keys to use this library.

## Basic usage

#### Initialization

```js
import { ERC20Token } from 'erc20-token-lib'

const aERC20Token = new ERC20Token({
  network: 'mainnet', // or 'kovan' | 'rinkeby' | 'ropsten'
  apikey: '<ETHERSCAN_APIKEY>', // string
  tokenAddress: '<TOKEN_CONTRACT_ADDRESS>', // address string with prefix 0x
  myAddress: '<END_USER_ACCOUNT_ADDRESS>', // optional, string with prefix 0x, if provided then also fetch user's token balance
});

aERC20Token.afterAllLoaded.then(aERC20Token => {
    console.log(aERC20Token);
});
```

#### Properties and methods overview

```
{ 
  network: 'mainnet',
  apikey: 'AAAAAAAAAABBBBBBBBBBCCCCCCCCCCDDDD',
  tokenAddress: '0x51c028bc9503874d74965638a4632a266d31f61f',
  tokenName: 'Funder Smart Token',
  symbol: 'FST',
  decimals: 18,
  myAddress: '0x71ea4d72535f9c92ea8fa99e32311bdbbaf34618',
  balance: '1000000000000000800',
  balanceHumanNumberString: '1.0000000000000008',
  balanceDecimaledNumberString: '1000000000000000800',
  totalSupply: '330000000000000000000000000',
  totalSupplyHumanNumberString: '330000000',
  totalSupplyDecimaledNumberString: '330000000000000000000000000',
  infoLoaded: true,
  balanceLoaded: true,
  afterAllLoaded:
   Promise {
     [Circular],
     domain:
      Domain {
        domain: null,
        _events: [Object],
        _eventsCount: 3,
        _maxListeners: undefined,
        members: [] } },
  transfer: [Function],
  updateMyTokenBalance: [Function],
  intervalID: null,
  intervalMS: 15000,
  autoUpdateMyTokenBalanceEnabled: false,
  enableAutoUpdateMyTokenBalance: [Function],
  disableAutoUpdateMyTokenBalance: [Function] }
}
```

#### Trasfer Token

(Please refer to [`eth-key-lib-js`](https://github.com/funderstoken/eth-key-lib-js) to generate private keys)

```js
aERC20Token.transfer(
  '<EndUserPrivateKeyBuffer>',
  '<ReceiverAddrses>',
  '<trasferringValueDecimaledNumberString>'
).then(txhash => console.log(txhash));

```

#### Auto polling latest balance

```js
aERC20Token.enableAutoUpdateMyTokenBalance()
aERC20Token.disableAutoUpdateMyTokenBalance()

```
