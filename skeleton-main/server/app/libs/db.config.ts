import { Sequelize } from 'sequelize';

const { DATA_BASE, USER_NAME, PASSWORD, PORT, HOST } = process.env;

const sequelize = new Sequelize(
  DATA_BASE as string,
  USER_NAME as string,
  PASSWORD,
  {
    host: HOST,
    dialect: 'mysql',
    port: Number(PORT),
    logging: false,
  }
);

export const connectDb = async () => {
  try {
    await sequelize.sync();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export default sequelize;
