const { DataTypes } = require('sequelize');
const sequelize = require('../libs/db.config');

const File = sequelize.define('File', {
  owner: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  activeTab: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = File;
