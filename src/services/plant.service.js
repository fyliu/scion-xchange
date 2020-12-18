import http from "../http-common";
//import authHeader from "./auth-header";

const getAll = () => {
  return http.get("/plants");
};

const get = id => {
  return http.get(`/plants/${id}`);
};

const create = data => {
  return http.post("/plants", data);
};

const update = (id, data) => {
  return http.put(`/plants/${id}`, data);
};

const remove = id => {
  return http.delete(`/plants/${id}`);
};

const findByName = name => {
  return http.get(`/plants?name=${name}`);
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
