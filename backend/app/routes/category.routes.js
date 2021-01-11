const categories = require("../controllers/category.controller");

module.exports = function (app) {
  var router = require("express").Router();

  router.post("/", categories.create);

  router.get("/", categories.findAll);

  router.get("/:id", categories.findOne);

  router.put("/:id", categories.update);

  router.delete("/:id", categories.delete);

  app.use("/api/categories", router);
};
