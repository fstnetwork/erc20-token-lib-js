import axios from "axios";

export function apiRequest(endpoint, param, apikey) {
  return axios
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
    });
}
