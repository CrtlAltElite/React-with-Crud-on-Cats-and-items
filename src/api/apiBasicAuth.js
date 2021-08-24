import apiClient from "./clientBasicAuth";

const endpoint = "/api/token";

const getToken = async (email, password) => {
  let response= await apiClient(email,password).get(endpoint);
  if (response.status===401) {return 401}
  if (!response.ok) {return 500}
  if (response.ok) {return response.data.token;}
  return
};

export default getToken;
