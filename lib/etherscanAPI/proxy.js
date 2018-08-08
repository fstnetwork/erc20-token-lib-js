import { apiRequest } from "./httpClient";

import { getNetworkEndPoint } from "../util";

export function perfromProxyAction(
  network,
  apikey,
  moduleName,
  actionName,
  actionParams
) {
  return apiRequest(
    getNetworkEndPoint(network),
    {
      module: moduleName,
      action: actionName,
      ...actionParams
    },
    apikey
  );
}
