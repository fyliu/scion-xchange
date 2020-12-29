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

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.cultivar = require("./cultivar.model.js")(sequelize, Sequelize);
db.offer = require("../models/offer.model.js")(sequelize, Sequelize);
db.want = require("../models/want.model.js")(sequelize, Sequelize);

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

// users offering scions
db.cultivar.belongsToMany(db.user, {
  through: db.offer,
  foreignKey: "cultivarId",
  otherKey: "userId"
});
db.user.belongsToMany(db.cultivar, {
  through: db.offer,
  foreignKey: "userId",
  otherKey: "cultivarId"
});
db.offer.belongsTo(db.cultivar);
db.offer.belongsTo(db.user);
db.cultivar.hasMany(db.offer);
db.user.hasMany(db.offer);

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
