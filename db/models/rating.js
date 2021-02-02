"use strict";
module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define(
    "Rating",
    {
      rating: {
        type: DataTypes.INTEGER,
      },
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
  Rating.associate = function (models) {
    Rating.belongsTo(models.User, { foreignKey: "userId" });
    Rating.belongsTo(models.Restaurant, { foreignKey: "restaurantId" });
  };
  return Rating;
};
