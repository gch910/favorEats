"use strict";
module.exports = (sequelize, DataTypes) => {
  const wantToVisit = sequelize.define(
    "wantToVisit",
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
  wantToVisit.associate = function (models) {
    // associations can be defined here
  };
  return wantToVisit;
};
