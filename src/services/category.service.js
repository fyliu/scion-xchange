import http from "../http-common";
//import authHeader from "./auth-header";

const getAll = () => {
  return http.get("/categories");
};

const get = (id) => {
  return http.get(`/categories/${id}`);
};

const create = (data) => {
  return http.post("/categories", data);
};

const update = (id, data) => {
  return http.put(`/categories/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/categories/${id}`);
};

const findByName = (name) => {
  return http.get(`/categories?name=${name}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  findByName
};
