import { CreationOptional, DataTypes, Model, Optional, Sequelize } from 'sequelize';

type UserAttributes = {
  id: number;
  userId: string;
  password: string;
  salt: string;
  createdAt: Date;
  updatedAt: Date;
};

type UserCreationAttributes = Optional<UserAttributes, keyof UserAttributes>;

export default class User extends Model<UserAttributes, UserCreationAttributes> {
  declare id: CreationOptional<number>;
  declare userId: string;
  declare password: string;
  declare salt: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initialize(sequelize: Sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        userId: {
          type: new DataTypes.STRING(128),
          allowNull: false,
        },
        password: {
          type: new DataTypes.STRING(128),
          allowNull: false,
        },
        salt: {
          type: new DataTypes.STRING(128),
          allowNull: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        tableName: 'users',
        sequelize, // passing the `sequelize` instance is required
      }
    );
  }
}
