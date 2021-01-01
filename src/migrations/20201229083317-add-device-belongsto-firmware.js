'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    return queryInterface.addColumn('Devices', 'FirmwareId', {
      type : Sequelize.INTEGER,
      references : {
        model: 'Firmwares', // name of Target model
        key: 'id', // key in Target model that we're referencing
      },
      onUpdate: 'CASCADE',
      onDelete: null
   })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Devices', 'FirmwareId');
  }
};
