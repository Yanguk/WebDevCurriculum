import { DataTypes } from "sequelize";
import sequelize from "../libs/db.config";

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

export default File;
