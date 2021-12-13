import api from "./api";

const getAll = () => {
  return api.get("/cultivars");
};

const get = (id) => {
  return api.get(`/cultivars/${id}`);
};

const create = (data) => {
  return api.post("/cultivars", data);
};

const update = (id, data) => {
  return api.put(`/cultivars/${id}`, data);
};

const remove = (id) => {
  return api.delete(`/cultivars/${id}`);
};

const findByName = (name) => {
  return api.get(`/cultivars?name=${name}`);
};

const CultivarService = {
  getAll,
  get,
  create,
  update,
  remove,
  findByName
};

export default CultivarService;
