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
    // VisitedRestaurant.belongsTo(models.User, {
    //   foreignKey: "userId",
    // });
  };
  return VisitedRestaurant;
};
