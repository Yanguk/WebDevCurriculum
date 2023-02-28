import { Sequelize } from 'sequelize';
import logger from '../libs/logger';
import { User, File } from '../models';

const migrationDb = async (sequelize: Sequelize) => {
  try {
    await sequelize.sync();
    logger.info('Connection has been established successfully.');
  } catch (error) {
    logger.error('Unable to connect to the database:', error);

    throw error;
  }
};

const connectDB = async (sequelize: Sequelize) => {
  const models = [User, File];

  models.forEach((model) => model.initialize(sequelize));

  User.hasMany(File, { foreignKey: 'owner', sourceKey: 'id' });
  File.belongsTo(User, { foreignKey: 'owner', targetKey: 'id' });

  await migrationDb(sequelize);
};

export default connectDB;
