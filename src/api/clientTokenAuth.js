import { create } from "apisauce";

const apiClient = (token) =>
  create({
    baseURL: "http://127.0.0.1:5000",
    headers: { Authorization: `Bearer ${token}`,'Content-Type': 'application/json','Access-Control-Allow-Methods':"*" },
  });

const apiClientWithToken = (token) => {
  return apiClient(token);
};

export default apiClientWithToken;
