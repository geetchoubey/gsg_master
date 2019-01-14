const db = require('../utils/connection');
const Sequelize = require('sequelize');

module.exports = db.define('invoice', {
  id: {
    type: Sequelize.BIGINT(20),
    primaryKey: true,
    autoIncrement: true
  },
  date: {
    type: 'date'
  },
  artist_name: {
    type: Sequelize.STRING
  },
  artist_number: {
    type: Sequelize.STRING
  },
  artist_mobile: {
    type: Sequelize.STRING
  },
  type_of_event: {
    type: Sequelize.STRING
  },
  date_of_gig: {
    type: 'date'
  },
  amount: {
    type: Sequelize.STRING
  },
  status: {
    type: Sequelize.ENUM,
    values: ['pending', 'paid']
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
