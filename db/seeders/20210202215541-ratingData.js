"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Ratings",
      [
        {
          rating: 5,
          userId: 1,
          restaurantId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          rating: 1,
          userId: 1,
          restaurantId: 15,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          rating: 4,
          userId: 1,
          restaurantId: 20,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          rating: 3,
          userId: 1,
          restaurantId: 20,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          rating: 2,
          userId: 1,
          restaurantId: 20,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          rating: 5,
          userId: 1,
          restaurantId: 20,
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
