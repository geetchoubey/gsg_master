require('dotenv').config({path: '/home/ubuntu/.env'});
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  timezone: '+05:30',
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci'
  },
});
sequelize.authenticate((err) => {
  console.error(err);
});

module.exports = sequelize;
