import { CreationOptional, DataTypes, Model, Optional, Sequelize } from 'sequelize';

type UserAttributes = {
  id: number;
  name: string;
  password: string;
  salt: string;
};

type UserCreationAttributes = Optional<UserAttributes, keyof UserAttributes>;

export default class User extends Model<UserAttributes, UserCreationAttributes> {
  declare id: CreationOptional<number>;
  declare userId: string;
  declare password: string;
  declare salt: string;

  static initialize(sequelize: Sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: new DataTypes.STRING(),
          allowNull: false,
        },
        password: {
          type: new DataTypes.STRING(),
          allowNull: false,
        },
        salt: {
          type: new DataTypes.STRING(),
          allowNull: false,
        },
      },
      {
        tableName: 'user',
        sequelize, // passing the `sequelize` instance is required
      }
    );
  }
}
