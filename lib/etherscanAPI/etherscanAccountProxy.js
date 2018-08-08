import { perfromProxyAction } from "./proxy";

export function perfromAction(network, apikey, actionName, actionParams) {
  return perfromProxyAction(
    network,
    apikey,
    "account",
    actionName,
    actionParams
  );
}
