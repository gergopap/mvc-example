'use strict';
module.exports = (sequelize, DataTypes) => {
  const Videogame = sequelize.define('Videogame', {
    manufacturer: DataTypes.STRING,
    model: DataTypes.STRING
  }, {});
  Videogame.associate = function(models) {
    // associations can be defined here
  };
  return Videogame;
};
