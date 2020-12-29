import axios from "axios";
import authHeader from "./auth-header";

//const PORT = process.env.PORT || 8080;
//const API_URL = "http://localhost:" + PORT + "/api/test/";
const API_URL = "/api/test/";
//const API_URL = 'https://scion-x-change.herokuapp.com/api/test/';

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

const getOffers = () => {
  return axios.get(API_URL + "plants", { headers: authHeader() });
};

const updateOffers = (data) => {
  return axios.put(API_URL + "plants", data, {
    headers: authHeader()
  });
};

export default {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  getOffers,
  updateOffers
};
