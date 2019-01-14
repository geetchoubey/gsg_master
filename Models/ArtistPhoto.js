const db = require('../utils/connection');
const Sequelize = require('sequelize');

module.exports = db.define('artist_photo', {
  id: {
    type: Sequelize.BIGINT(20),
    primaryKey: true,
    autoIncrement: true
  },
  cover: {
    type: Sequelize.BOOLEAN
  }
}, {
  timestamps: false,
  underscored: true
});
