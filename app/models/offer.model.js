module.exports = (sequelize, Sequelize) => {
  const Offer = sequelize.define("users_offer_scions", {
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

  return Offer;
};
