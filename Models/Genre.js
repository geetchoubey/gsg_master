const db = require('../utils/connection');
const Sequelize = require('sequelize');

module.exports = db.define('genre', {
  id: {
    type: Sequelize.BIGINT(20),
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING
  }
}, {
  timestamps: false
});
