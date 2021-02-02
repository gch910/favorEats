"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Comments",
      [
        {
          comment: "I loved eating here!",
          userId: 1,
          restaurantId: 55,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          comment: "I hated eating here!",
          userId: 1,
          restaurantId: 60,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          comment: "Great service!",
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
    return queryInterface.bulkDelete("Comments", null, {});
  },
};
