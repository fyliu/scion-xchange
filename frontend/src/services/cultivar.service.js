import http from "../http-common";
import authHeader from "./auth-header";

const getAll = () => {
  return http.get("/cultivars", { headers: authHeader() });
};

const get = (id) => {
  return http.get(`/cultivars/${id}`, { headers: authHeader() });
};

const create = (data) => {
  return http.post("/cultivars", data, { headers: authHeader() });
};

const update = (id, data) => {
  return http.put(`/cultivars/${id}`, data, { headers: authHeader() });
};

const remove = (id) => {
  return http.delete(`/cultivars/${id}`, { headers: authHeader() });
};

const findByName = (name) => {
  return http.get(`/cultivars?name=${name}`, { headers: authHeader() });
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  findByName
};
