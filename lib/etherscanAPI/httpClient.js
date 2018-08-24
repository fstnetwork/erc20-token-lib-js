import axios from "axios";

export function apiRequest(limiter, endpoint, param, apikey) {
  return limiter.schedule(() =>
    axios
      .request({
        url: "/api",
        method: "get",
        baseURL: endpoint,
        params: { ...param, apikey }
      })
      .then(res => {
        if (res.data) {
          if (res.data.result) {
            return res.data.result;
          }
        }

        throw new Error(
          `${endpoint}/api + ${JSON.stringify(
            param
          )} + ${apikey} error : ${JSON.stringify(res.data)}`
        );
      })
  );
}
