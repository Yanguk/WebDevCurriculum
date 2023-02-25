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

  static initialize(sequelize: Sequelize) {
    File.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        owner: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          references: {
            model: 'user',
            key: 'id',
          },
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
      },
      {
        tableName: 'files',
        sequelize, // passing the `sequelize` instance is required
      }
    );
  }
}
