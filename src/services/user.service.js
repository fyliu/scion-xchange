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

const getProfile = () => {
  return axios.get(API_URL + "profile", { headers: authHeader() });
};

const updateProfile = (data) => {
  return axios.put(API_URL + "profile", data, {
    headers: authHeader()
  });
};

const getOffers = () => {
  return axios.get(API_URL + "offer-cultivars", { headers: authHeader() });
};

const updateOffers = (data) => {
  return axios.put(API_URL + "offer-cultivars", data, {
    headers: authHeader()
  });
};

const getWants = () => {
  return axios.get(API_URL + "want-cultivars", { headers: authHeader() });
};

const updateWants = (data) => {
  return axios.put(API_URL + "want-cultivars", data, {
    headers: authHeader()
  });
};

const getTradeWants = () => {
  return axios.get(API_URL + "trade-wants", { headers: authHeader() });
};

const getTradeOffers = () => {
  return axios.get(API_URL + "trade-offers", { headers: authHeader() });
};

export default {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  getProfile,
  updateProfile,
  getOffers,
  updateOffers,
  getWants,
  updateWants,
  getTradeWants,
  getTradeOffers
};
