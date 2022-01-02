import axios from "./axios";

const userApi = {
  search: data => {
    return axios.post("/user/search", data);
  },
  friend: id => {
    return axios.post("/user/following", id);
  }
}

export default userApi;