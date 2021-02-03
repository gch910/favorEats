"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        unique: true,
      },
    },
    {}
  );
  User.associate = function (models) {
    const columnMapping = {
      through: "VisitedRestaurant",
      otherKey: "restaurantId",
      foreignKey: "userId",
    };
    const columnMapping2 = {
      through: "wantToVisit",
      otherKey: "restaurantId",
      foreignKey: "userId",
    };
    User.belongsToMany(models.Restaurant, columnMapping);
    User.belongsToMany(models.Restaurant, columnMapping2);
    User.hasMany(models.Comment, { foreignKey: "userId" });
    User.hasMany(models.Rating, { foreignKey: "userId" });
  };
  return User;
};
