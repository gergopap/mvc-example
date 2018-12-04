'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Clocks', [{
      manufacturer: 'Casio',
      model: 'Szamologepes',
      type: 'Retro',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
  }
};
