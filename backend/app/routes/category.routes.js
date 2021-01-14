const { authJwt } = require("../middleware");
const categories = require("../controllers/category.controller");

module.exports = function (app) {
  var router = require("express").Router();

  router.post("/", [authJwt.verifyToken], categories.create);

  router.get("/", [authJwt.verifyToken], categories.findAll);

  router.get("/:id", [authJwt.verifyToken], categories.findOne);

  router.put("/:id", [authJwt.verifyToken], categories.update);

  router.delete("/:id", [authJwt.verifyToken], categories.delete);

  app.use("/api/categories", router);
};
