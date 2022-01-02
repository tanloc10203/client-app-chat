import axios from "axios";
import queryString from "query-string";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  paramsSerializer: params => queryString.stringify(params),
});


instance.interceptors.response.use((response) => {
  if (response && response.data) {
    return response.data;
  }
  return response;
}, (error) => {
  return Promise.reject(error);
});

export default instance;