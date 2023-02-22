import { Sequelize } from 'sequelize';

const { DATA_BASE, USER_NAME, PASSWORD, PORT, HOST } = process.env;

const getSequelizeInstance = () => {
  return new Sequelize(DATA_BASE as string, USER_NAME as string, PASSWORD, {
    host: HOST,
    dialect: 'mysql',
    port: Number(PORT),
    logging: false,
  });
};

export default getSequelizeInstance;
