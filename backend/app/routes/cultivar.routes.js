const { authJwt } = require("../middleware");
const cultivars = require("../controllers/cultivar.controller");

module.exports = function (app) {
  var router = require("express").Router();

  router.post("/", [authJwt.verifyToken], cultivars.create);

  router.get("/", [authJwt.verifyToken], cultivars.findAll);

  router.get("/:id", [authJwt.verifyToken], cultivars.findOne);

  router.put("/:id", [authJwt.verifyToken], cultivars.update);

  router.delete("/:id", [authJwt.verifyToken], cultivars.delete);

  app.use("/api/cultivars", router);
};
