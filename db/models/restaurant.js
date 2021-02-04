"use strict";
module.exports = (sequelize, DataTypes) => {
  const Restaurant = sequelize.define(
    "Restaurant",
    {
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      streetAddress: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING(2),
        allowNull: false,
      },
      zipCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      img: {
        type: DataTypes.STRING(500),
        unique: true
      },
    },
    {}
  );
  Restaurant.associate = function (models) {
    const columnMapping = {
      through: "VisitedRestaurant",
      otherKey: "userId",
      foreignKey: "restaurantId",
      as: "visited"
    };
    const columnMapping2 = {
      through: "wantToVisit",
      otherKey: "userId",
      foreignKey: "restaurantId",
    };
    Restaurant.belongsToMany(models.User, columnMapping);
    Restaurant.belongsToMany(models.User, columnMapping2);
    Restaurant.hasMany(models.Comment, { foreignKey: "restaurantId" });
    Restaurant.hasMany(models.Rating, { foreignKey: "restaurantId" });
    // Restaurant.belongsTo(models.VisitedRestaurant, {
    //   foreignKey: "restaurantId",
    // });
  };
  return Restaurant;
};
