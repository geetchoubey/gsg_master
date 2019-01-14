const db = require('../utils/connection');
const Sequelize = require('sequelize');

module.exports = db.define('api_key', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  key: {
    type: Sequelize.STRING,
    unique: true
  },
  email: {
    type: Sequelize.STRING,
    unique: true
  },
  status: {
    type: Sequelize.ENUM,
    values: ['active', 'inactive', 'suspended', 'expired'],
    defaultValue: 'active'
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
  timestamps: false,
  underscored: true
});
