const { authJwt } = require("../middleware");
const user = require("../controllers/user.controller");

module.exports = function (app) {
  var router = require("express").Router();

  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  router.get("/all", user.allAccess);

  router.get("/user", [authJwt.verifyToken], user.userBoard);

  router.get(
    "/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    user.moderatorBoard
  );

  router.get("/admin", [authJwt.verifyToken, authJwt.isAdmin], user.adminBoard);

  router.get("/profile", [authJwt.verifyToken], user.getProfile);
  router.put("/profile", [authJwt.verifyToken], user.updateProfile);

  router.put("/offer-cultivars", [authJwt.verifyToken], user.updateOffers);

  router.get("/offer-cultivars", [authJwt.verifyToken], user.getOffers);

  router.get("/want-cultivars", [authJwt.verifyToken], user.getWants);

  router.put("/want-cultivars", [authJwt.verifyToken], user.updateWants);

  router.get("/trade-wants", [authJwt.verifyToken], user.getTradeWants);

  router.get("/trade-offers", [authJwt.verifyToken], user.getTradeOffers);

  app.use("/api/test", router);
};
