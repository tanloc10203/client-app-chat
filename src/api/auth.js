import axios from "./axios";

const authApi = {
  resgister: (data) => {
    return axios.post("/auth/resgister", data);
  },
  login: (data) => {
    return axios.post("/auth/login", data);
  },
  refresh: token => {
    console.log("check token", token);
    return axios.post("/auth/refresh", { token: token });
  }
}

export default authApi;