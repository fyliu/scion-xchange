module.exports = (sequelize, Sequelize) => {
  const Offer = sequelize.define("users_scions", {
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

  return Offer;
};
