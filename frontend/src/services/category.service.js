import api from "./api";

const getAll = () => {
  return api.get("/categories");
};

const get = (id) => {
  return api.get(`/categories/${id}`);
};

const create = (data) => {
  return api.post("/categories", data);
};

const update = (id, data) => {
  return api.put(`/categories/${id}`, data);
};

const remove = (id) => {
  return api.delete(`/categories/${id}`);
};

const findByName = (name) => {
  return api.get(`/categories?name=${name}`);
};

const CategoryService = {
  getAll,
  get,
  create,
  update,
  remove,
  findByName
};

export default CategoryService;
