const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },

    pool: {
      max: +process.env.DB_pool_max,
      min: +process.env.DB_pool_min,
      acquire: +process.env.DB_pool_acquire,
      idle: +process.env.DB_pool_idle
    },
    define: {
      timestamps: false
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
const queryInterface = sequelize.getQueryInterface();

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.cultivar = require("./cultivar.model.js")(sequelize, Sequelize);
db.category = require("./category.model.js")(sequelize, Sequelize);
db.user_cultivar = require("./user_cultivar.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

// users scions relation
db.cultivar.belongsToMany(db.user, {
  through: db.user_cultivar,
  foreignKey: "cultivarId",
  otherKey: "userId"
});
db.user.belongsToMany(db.cultivar, {
  through: db.user_cultivar,
  foreignKey: "userId",
  otherKey: "cultivarId"
});
db.user_cultivar.belongsTo(db.cultivar);
db.user_cultivar.belongsTo(db.user);
db.cultivar.hasMany(db.user_cultivar);
db.user.hasMany(db.user_cultivar);

db.category.hasMany(db.cultivar);
db.cultivar.belongsTo(db.category);

// XXX this somehow executes before all the other queries
queryInterface.sequelize.query(
  'ALTER TABLE "cultivars" ADD CONSTRAINT "cultivar" UNIQUE ("categoryId", "name")'
);

//queryInterface.addConstraint("cultivars", ["categoryId", "name"], {
//  type: "primary key",
//  name: "cultivar_pkey"
//});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
