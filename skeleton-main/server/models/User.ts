import { DataTypes } from "sequelize";
import sequelize from "../libs/db.config";

const User = sequelize.define('User', {
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  salt: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default User;
