module.exports = (sequelize, Sequelize) => {
  const UserCultivar = sequelize.define("users_cultivars", {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    offer: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    want: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false
    }
  });

  return UserCultivar;
};
