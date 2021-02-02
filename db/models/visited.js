"use strict";
module.exports = (sequelize, DataTypes) => {
  const VisitedRestaurant = sequelize.define(
    "VisitedRestaurant",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      restaurantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {}
  );

  VisitedRestaurant.associate = function (models) {
    //do associations here
  };
  return VisitedRestaurant;
};
