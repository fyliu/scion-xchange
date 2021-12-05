const { verifySignUp } = require("../middleware");
const auth = require("../controllers/auth.controller");

module.exports = function (app) {
  var router = require("express").Router();

  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  router.post(
    "/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    auth.signup
  );

  router.post("/signin", auth.signin);

  app.use("/api/auth", router);

  app.post("/api/auth/refreshtoken", auth.refreshToken);
};
