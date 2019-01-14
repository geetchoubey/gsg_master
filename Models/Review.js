const db = require('../utils/connection');
const Sequelize = require('sequelize');

module.exports = db.define('review', {
  id: {
    type: Sequelize.BIGINT(20),
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  review: {
    type: Sequelize.STRING
  },
  type: {
    type: Sequelize.STRING
  },
  artist_id: {
    type: Sequelize.INTEGER
  },
  rating: {
    type: Sequelize.FLOAT,
    defaultValue: 0
  },
  is_active: {
    type: Sequelize.BOOLEAN
  },
  created_at: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  updated_at: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }
}, {
  timestamps: false
});
