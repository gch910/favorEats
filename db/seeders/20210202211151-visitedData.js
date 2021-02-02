"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("VisitedRestaurants", [
      {
        userId: 1,
        restaurantId: 42,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        restaurantId: 55,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        restaurantId: 60,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        restaurantId: 48,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("VisitedRestaurants", null, {});
  },
};
