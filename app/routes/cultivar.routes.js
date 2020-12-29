const cultivars = require("../controllers/cultivar.controller");

module.exports = function (app) {
  var router = require("express").Router();

  router.post("/", cultivars.create);

  router.get("/", cultivars.findAll);

  router.get("/:id", cultivars.findOne);

  router.put("/:id", cultivars.update);

  router.delete("/:id", cultivars.delete);

  app.use("/api/cultivars", router);
};
