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
