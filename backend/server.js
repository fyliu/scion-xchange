require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const enforce = require("express-sslify");
const path = require("path");

const app = express();
const CLIENT_FILES = path.join(__dirname, "..", "frontend", "build");

// Static file declaration for production mode
if (process.env.NODE_ENV === "production") {
  app.use(express.static(CLIENT_FILES));
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
}

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Role = db.role;
const Category = db.category;
const Cultivar = db.cultivar;
const User = db.user;
const UserCultivar = db.user_cultivar;

db.sequelize.sync();
// force: true will drop the table if it already exists
//db.sequelize.sync({ force: true }).then(() => {
//  console.log("Drop and Resync Database with { force: true }");
//  initial();
//});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the scion exchange application." });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/cultivar.routes")(app);
require("./app/routes/category.routes")(app);
const categories = require("./data/category");
const cultivars = require("./data/cultivar");
const users = require("./data/user");
const users_cultivars = require("./data/user_cultivar");

// default route
app.get("*", (req, res) => {
  res.sendFile(path.join(CLIENT_FILES, "index.html"));
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });

  Role.create({
    id: 2,
    name: "moderator"
  });

  Role.create({
    id: 3,
    name: "admin"
  });

  Category.bulkCreate(categories).then(() => {
    Cultivar.bulkCreate(cultivars).then(() => {
      User.bulkCreate(users).then(() => {
        UserCultivar.bulkCreate(users_cultivars);
      });
    });
  });
}
