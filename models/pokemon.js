'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pokemon = sequelize.define('Pokemon', {
    manufacturer: DataTypes.STRING,
    model: DataTypes.STRING,
    type: DataTypes.STRING
  }, {});
  Pokemon.associate = function(models) {
    // associations can be defined here
  };
  return Pokemon;
};