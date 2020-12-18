"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "plants",
      [
        {
          name: "DongKui",
          species: "Myrica rubra (Yangmei)"
        },
        {
          name: "Fuerte",
          species: "Persea americana (Avocado)"
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("plants", null, {});
  };
};
