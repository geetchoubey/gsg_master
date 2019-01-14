const db = require('../utils/connection');
const Sequelize = require('sequelize');

module.exports = db.define('replies', {
  id: {
    type: Sequelize.BIGINT(20),
    primaryKey: true,
    autoIncrement: true
  },
  used: {
    type: Sequelize.BOOLEAN
  },
  status: {
    type: Sequelize.ENUM,
    values: ['pending', 'accept', 'pitched', 'got_it', 'no_go', 'not_interested', 'cancel']
  },
  pitched_number: {
    type: Sequelize.INTEGER
  },
  token: {
    type: Sequelize.STRING
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
  underscored: true,
  timestamps: false
});
