'use strict';
const fs = require('fs')


const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Firmware extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Firmware.hasMany(models.Device);
    }
  };
  Firmware.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    versionAvailable: DataTypes.STRING,
    url: {
      type: DataTypes.STRING,
      validate: {
        exists(value) {
          console.log('check filename');
          if (!fs.existsSync(value)) 
          {
            throw new Error(`The file: "${value}" does not exist!`);
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Firmware',
  });
  return Firmware;
};