"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("wantToVisits", [
      {
        userId: 1,
        restaurantId: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        restaurantId: 49,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        restaurantId: 62,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        restaurantId: 57,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("wantToVisits", null, {});
  },
};
