import apiClientWithToken from "./clientTokenAuth";


// items endpoints
const endpointItems = "/api/item";
const endpointAllItems ="/api/all_items";
const endpointItemsByCat ="/api/items_by_category_id";

export const getItems = async (token) => {
  const response = await apiClientWithToken(token).get(endpointAllItems);
  console.log(response.data.items)
  if (400 <= response.status && response.status< 500){return 400}
  if (500 <= response.status && response.status < 600){return 500}
  if (response.ok) {return response.data.items}
  return
};

//change the api to request.args.get('id')
export const getItemsByCat = async (token, id) => {
  const response = await apiClientWithToken(token).get(endpointItemsByCat, {id:id});
    if (400 <= response.status && response.status< 500){return 400}
    if (500 <= response.status && response.status < 600){return 500}
    if (response.ok) {return response.data.items}
    return
  };
  
  export const getItem = async (token, id) => {
    const response = await apiClientWithToken(token).get(endpointItems,{id:id});
    console.log("item in api call",response.data)
    if (400 <= response.status && response.status< 500){return 400}
    if (500 <= response.status && response.status < 600){return 500}
    if (response.ok) {return response.data}
    return
  };


export const postItem = async (token, data) => {
  const response = await apiClientWithToken(token).post(endpointItems, data);
  if (response.ok){return true}else{return false}

};

export const patchItem = async (token, data) => {
  const response = await apiClientWithToken(token).put(endpointItems,data);
  if (response.ok){return true}else{return false}

};

export const deleteItem = async (token, id) => {
  const response = await apiClientWithToken(token).delete(endpointItems,{}, {data:{id}});
  if (response.ok){return true}else{return false}
};


