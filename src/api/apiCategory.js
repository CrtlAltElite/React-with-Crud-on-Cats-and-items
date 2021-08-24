import apiClientWithToken from "./clientTokenAuth";


// category endpoints
const endpointCategories = "/api/category";

export const getCategories = async (token) => {
  const response=await apiClientWithToken(token).get(endpointCategories);
  if (400 <= response.status && response.status < 500){return 400;}
  if (500 <= response.status && response.status < 600){return 500;}
  if (response.ok) {return response.data.categories;}
  return 
};

export const postCategory = async(token, name) => {
  const response=await apiClientWithToken(token).post(endpointCategories, {name});
  if (response.ok){return true}else{return false}
};

export const patchCategory = async (token, data) => {
  const response= await apiClientWithToken(token).put(endpointCategories, data);
  if (response.ok){return true}else{return false}
};

export const deleteCategory = async (token, id) => {
  const response= await apiClientWithToken(token).delete(endpointCategories,{}, {"data":{id}});
  if (response.ok){return true}else{return false}

};
