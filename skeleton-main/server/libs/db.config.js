const { Sequelize } = require('sequelize');

const { DATA_BASE, USER_NAME, PASSWORD, PORT } = process.env;

const sequelize = new Sequelize(DATA_BASE, USER_NAME, PASSWORD, {
  host: '127.0.0.1',
  dialect: 'mysql',
  port: PORT,
  logging: false,
});

(async () => {
  try {
    await sequelize.sync();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = sequelize;
