import getTokenInfo from "./lib/erc20Token/getTokenInfo";
import getTokenBalance from "./lib/erc20Token/getTokenBalance";
import transferToken from "./lib/erc20Token/transferToken";

function notEmpty(o) {
  return o !== undefined && o !== null && o !== "";
}

export const ERC20Token = function(params) {
  const self = this;

  if (
    !(
      notEmpty(params.network) &&
      notEmpty(params.apikey) &&
      notEmpty(params.tokenAddress)
    )
  ) {
    throw new Error("ERC20Token params need network / apikey / tokenAddress");
  }

  self.network = params.network;
  self.apikey = params.apikey;
  self.tokenAddress = params.tokenAddress;

  self.tokenName = null;
  self.symbol = null;
  self.decimals = null;
  self.myAddress = null;
  self.balance = null;
  self.balanceHumanNumberString = null;
  self.balanceDecimaledNumberString = null;
  self.totalSupply = null;
  self.totalSupplyHumanNumberString = null;
  self.totalSupplyDecimaledNumberString = null;

  self.infoLoaded = false;
  self.balanceLoaded = false;

  self.afterAllLoaded = null;

  if (notEmpty(params.myAddress)) {
    self.myAddress = params.myAddress;

    self.afterAllLoaded = getTokenBalance(
      self.network,
      self.apikey,
      self.tokenAddress,
      self.myAddress
    ).then(balance => {
      self.balance = balance.balance;
      self.balanceHumanNumberString = balance.balanceHumanNumberString;
      self.balanceDecimaledNumberString = balance.balanceDecimaledNumberString;

      self.balanceLoaded = true;
    });
  }

  if (self.afterAllLoaded === null) {
    self.afterAllLoaded = getTokenInfo(
      self.network,
      self.apikey,
      self.tokenAddress
    )
      .then(info => {
        self.tokenName = info.name;
        self.symbol = info.symbol;
        self.decimals = info.decimals;
        self.totalSupply = info.totalSupply;
        self.totalSupplyHumanNumberString = info.totalSupplyHumanNumberString;
        self.totalSupplyDecimaledNumberString =
          info.totalSupplyDecimaledNumberString;

        self.infoLoaded = true;
      })
      .then(() => self);
  } else {
    self.afterAllLoaded = self.afterAllLoaded.then(() =>
      getTokenInfo(self.network, self.apikey, self.tokenAddress)
        .then(info => {
          self.tokenName = info.name;
          self.symbol = info.symbol;
          self.decimals = info.decimals;
          self.totalSupply = info.totalSupply;
          self.totalSupplyHumanNumberString = info.totalSupplyHumanNumberString;
          self.totalSupplyDecimaledNumberString =
            info.totalSupplyDecimaledNumberString;

          self.infoLoaded = true;
        })
        .then(() => self)
    );
  }

  self.transfer = function(
    senderPrivateKeyBuffer,
    receiverAddress,
    tokenValueDecimaledNumberString,
    extraParams = {}
  ) {
    return transferToken(
      self.network,
      self.apikey,
      senderPrivateKeyBuffer,
      self.tokenAddress,
      receiverAddress,
      tokenValueDecimaledNumberString,
      extraParams
    );
  };

  self.updateMyTokenBalance = function() {
    if (!notEmpty(self.myAddress)) {
      return;
    }

    return getTokenBalance(
      self.network,
      self.apikey,
      self.tokenAddress,
      self.myAddress
    ).then(balance => {
      self.balance = balance.balance;
      self.balanceHumanNumberString = balance.balanceHumanNumberString;
      self.balanceDecimaledNumberString = balance.balanceDecimaledNumberString;

      console.log(self);

      return balance;
    });
  };

  self.intervalID = null;
  self.intervalMS = 15000;
  self.autoUpdateMyTokenBalanceEnabled = false;

  self.enableAutoUpdateMyTokenBalance = function() {
    if (self.autoUpdateMyTokenBalanceEnabled === false) {
      self.intervalID = setInterval(() => {
        self.updateMyTokenBalance();
      }, self.intervalMS);

      self.autoUpdateMyTokenBalanceEnabled = true;
    }
  };

  self.disableAutoUpdateMyTokenBalance = function() {
    if (self.autoUpdateMyTokenBalanceEnabled === true) {
      clearInterval(self.intervalID);
      self.intervalID = null;
      self.autoUpdateMyTokenBalanceEnabled = false;
    }
  };
};
