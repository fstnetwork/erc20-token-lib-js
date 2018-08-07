import axios from "axios";

export function apiRequest(endpoint, param, apikey) {
  return axios.request({
    url: "/api",
    method: "get",
    baseURL: endpoint,
    params: { ...param, apikey }
  });
}
