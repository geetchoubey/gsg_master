const db = require('../utils/connection');
const Sequelize = require('sequelize');

module.exports = db.define('image', {
  id: {
    type: Sequelize.BIGINT(20),
    primaryKey: true,
    autoIncrement: true
  },
  url: {
    type: Sequelize.STRING
  }
}, {
  timestamps: false
});
