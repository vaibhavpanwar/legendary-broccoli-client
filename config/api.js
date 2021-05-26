import axios from "axios";
// https://calm-earth-52118.herokuapp.com/api/
const API = axios.create({
  baseURL: "https://calm-earth-52118.herokuapp.com/api/",
});

API.defaults.headers.common["Content-Type"] = "application/json";

export const setAuthHeader = (token) => {
  API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export default API;
