const db = require('../utils/connection');
const Sequelize = require('sequelize');

module.exports = db.define('feedback', {
  id: {
    type: Sequelize.BIGINT(20),
    primaryKey: true,
    autoIncrement: true
  },
  feedback: {
    type: Sequelize.STRING
  },
  rating: {
    type: Sequelize.ENUM,
    values: ['-1', '0', '1', '2', '3', '4', '5'],
    defaultValue: '-1'
  }
}, {
  timestamps: false,
  underscored: true
});
