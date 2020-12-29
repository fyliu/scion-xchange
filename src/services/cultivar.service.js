import http from "../http-common";
//import authHeader from "./auth-header";

const getAll = () => {
  return http.get("/cultivars");
};

const get = (id) => {
  return http.get(`/cultivars/${id}`);
};

const create = (data) => {
  return http.post("/cultivars", data);
};

const update = (id, data) => {
  return http.put(`/cultivars/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/cultivars/${id}`);
};

const findByName = (name) => {
  return http.get(`/cultivars?name=${name}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  findByName
};

//const getPublicContent = () => {
//  return axios.get(API_URL + "all");
//};
//
//const getUserBoard = () => {
//  return axios.get(API_URL + "user", { headers: authHeader() });
//};
//
//const getModeratorBoard = () => {
//  return axios.get(API_URL + "mod", { headers: authHeader() });
//};
//
//const getAdminBoard = () => {
//  return axios.get(API_URL + "admin", { headers: authHeader() });
//};
//
//export default {
//  getPublicContent,
//  getUserBoard,
//  getModeratorBoard,
//  getAdminBoard,
//};
