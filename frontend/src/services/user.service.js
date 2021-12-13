import api from "./api";

//const PORT = process.env.PORT || 8080;
//const API_URL = "http://localhost:" + PORT + "/api/test/";
const API_URL = "/test/";
//const API_URL = 'https://scion-x-change.herokuapp.com/api/test/';

const getPublicContent = () => {
  return api.get(API_URL + "all");
};

const getUserBoard = () => {
  return api.get(API_URL + "user");
};

const getModeratorBoard = () => {
  return api.get(API_URL + "mod");
};

const getAdminBoard = () => {
  return api.get(API_URL + "admin");
};

const getProfile = () => {
  return api.get(API_URL + "profile");
};

const updateProfile = (data) => {
  return api.put(API_URL + "profile", data);
};

const getOffers = () => {
  return api.get(API_URL + "offer-cultivars");
};

const updateOffers = (data) => {
  return api.put(API_URL + "offer-cultivars", data);
};

const getWants = () => {
  return api.get(API_URL + "want-cultivars");
};

const updateWants = (data) => {
  return api.put(API_URL + "want-cultivars", data);
};

const getTradeWants = () => {
  return api.get(API_URL + "trade-wants");
};

const getTradeOffers = () => {
  return api.get(API_URL + "trade-offers");
};

const getTrade = () => {
  return api.get(API_URL + "trade");
};

const UserService = {
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
  getTradeOffers,
  getTrade
};

export default UserService;
