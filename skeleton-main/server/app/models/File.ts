import {
  CreationOptional,
  DataTypes,
  Model,
  Optional,
  Sequelize,
} from 'sequelize';

type FileAttributes = {
  id: number;
  owner: number;
  name: string;
  content: string;
  activeTab: boolean;

  createdAt: Date;
  updatedAt: Date;
};

type FileCreationAttributes = Optional<FileAttributes, keyof FileAttributes>;

export default class File extends Model<
  FileAttributes,
  FileCreationAttributes
> {
  declare id: CreationOptional<number>;
  declare owner: number;
  declare name: string;
  declare content: string;
  declare activeTab: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initialize(sequelize: Sequelize) {
    File.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        owner: {
          type: new DataTypes.INTEGER(),
          allowNull: false,
        },
        name: {
          type: new DataTypes.STRING(),
          allowNull: false,
        },
        content: {
          type: new DataTypes.STRING(),
          allowNull: false,
        },
        activeTab: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        tableName: 'files',
        sequelize, // passing the `sequelize` instance is required
      }
    );
  }
}
