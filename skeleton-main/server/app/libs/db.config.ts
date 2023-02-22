import { Sequelize } from 'sequelize';

const getSequelizeInstance = (SequelizeClass: typeof Sequelize) => {
  const { DATA_BASE, USER_NAME, PASSWORD, PORT, HOST } = process.env;

  return new SequelizeClass(
    DATA_BASE as string,
    USER_NAME as string,
    PASSWORD as string,
    {
      host: HOST,
      dialect: 'mysql',
      port: Number(PORT),
      logging: false,
    }
  );
};

export default getSequelizeInstance;
