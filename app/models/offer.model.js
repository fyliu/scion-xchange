module.exports = (sequelize, Sequelize) => {
  const Offer = sequelize.define("users_offer_scion", {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    offered: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    }
  });

  return Offer;
};
