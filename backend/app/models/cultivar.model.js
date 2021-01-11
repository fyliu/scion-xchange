module.exports = (sequelize, Sequelize) => {
  const Cultivar = sequelize.define("cultivars", {
    name: {
      type: Sequelize.STRING
    }
  });

  return Cultivar;
};
