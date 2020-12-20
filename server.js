require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
//const cors = require("cors");
const path = require("path");

const app = express();
const CLIENT_FILES = path.join(__dirname, "..", "frontend", "build");

//var corsOptions = {
//  origin: "http://localhost:8081"
//};

//app.use(cors(corsOptions));

// Static file declaration for production mode
if (process.env.NODE_ENV === "production") {
  app.use(express.static(CLIENT_FILES));
}

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Role = db.role;
const Plant = db.plant;

// db.sequelize.sync();
// force: true will drop the table if it already exists
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and Resync Database with { force: true }");
  initial();
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the scion exchange application." });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/plant.routes")(app);
const plants = require("./data/plant");

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

  Plant.bulkCreate(plants);
}
