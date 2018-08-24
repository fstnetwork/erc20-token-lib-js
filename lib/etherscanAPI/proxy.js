import { apiRequest } from "./httpClient";

import { getNetworkEndPoint } from "../util";

export function perfromProxyAction(
  limiter,
  network,
  apikey,
  moduleName,
  actionName,
  actionParams
) {
  return apiRequest(
    limiter,
    getNetworkEndPoint(network),
    {
      module: moduleName,
      action: actionName,
      ...actionParams
    },
    apikey
  );
}
