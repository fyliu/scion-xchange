module.exports = (sequelize, Sequelize) => {
  const Want = sequelize.define("users_want_scions", {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    chosen: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    }
  });

  return Want;
};
