'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Device extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Device.belongsTo(models.Location);
      Device.belongsTo(models.Firmware);
    }
  };
  Device.init({
    name: DataTypes.STRING,
    mac: {
      type : DataTypes.STRING,
      is: {
        args : "^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$",
        msg : "mac must be a valid MAC address XX:XX:XX:XX:XX:XX"
      },
      unique : true
    },
    description: DataTypes.STRING,
    model: DataTypes.STRING,
    firmwareVersion : {
      type: DataTypes.STRING,
      defaultValue : ''
    }
  }, {
    sequelize,
    modelName: 'Device',
  });
  return Device;
};