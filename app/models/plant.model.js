module.exports = (sequelize, Sequelize) => {
  const Plant = sequelize.define("plant", {
    name: {
      type: Sequelize.STRING
    },
    species: {
      type: Sequelize.STRING
    }
  });

  return Plant;
};
