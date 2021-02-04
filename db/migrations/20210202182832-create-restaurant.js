"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Restaurants", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      category: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING(500),
      },
      streetAddress: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING(40),
      },
      state: {
        allowNull: false,
        type: Sequelize.STRING(2),
      },
      zipCode: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      img: {
        type: Sequelize.STRING(500),
        unique: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Restaurants");
  },
};
