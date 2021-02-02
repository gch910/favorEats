"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("wantToVisits", [
      {
        userId: 1,
        restaurantId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        restaurantId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        restaurantId: 17,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        restaurantId: 21,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("wantToVisits", null, {});
  },
};
