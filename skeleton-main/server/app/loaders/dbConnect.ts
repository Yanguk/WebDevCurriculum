import { Sequelize } from 'sequelize';
import logger from '../libs/logger';
import { intoIter } from '../libs/utils';
import * as models from '../models';

const eachModels = (fn: (_any: any) => void) => {
  const iter = intoIter(models);

  for (const model of iter) {
    fn(model);
  }
};

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
  const initModel = (model: {
    initialize: (_sequelize: Sequelize) => void;
  }) => {
    model.initialize(sequelize);
  };

  eachModels(([_key, value]) => initModel(value));

  await migrationDb(sequelize);
};

export default connectDB;
