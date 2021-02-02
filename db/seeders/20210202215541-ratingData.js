"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Ratings",
      [
        {
          rating: 5,
          userId: 1,
          restaurantId: 55,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          rating: 1,
          userId: 1,
          restaurantId: 60,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          rating: 4,
          userId: 1,
          restaurantId: 48,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Ratings", null, {});
  },
};
