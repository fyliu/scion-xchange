const plants = require("../controllers/plant.controller");

module.exports = function (app) {
  var router = require("express").Router();

  router.post("/", plants.create);

  router.get("/", plants.findAll);

  router.get("/:id", plants.findOne);

  router.put("/:id", plants.update);

  router.delete("/:id", plants.delete);

  app.use("/api/plants", router);
};
