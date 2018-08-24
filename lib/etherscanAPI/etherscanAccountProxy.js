import { perfromProxyAction } from "./proxy";

export function perfromAction(
  limiter,
  network,
  apikey,
  actionName,
  actionParams
) {
  return perfromProxyAction(
    limiter,
    network,
    apikey,
    "account",
    actionName,
    actionParams
  );
}
