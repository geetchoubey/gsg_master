const db = require('../utils/connection');
const Sequelize = require('sequelize');

module.exports = db.define('seo', {
  id: {
    type: Sequelize.BIGINT(20),
    primaryKey: true,
    autoIncrement: true
  },
  base_slug: {
    type: Sequelize.STRING
  },
  slug: {
    type: Sequelize.STRING
  },
  title: {
    type: Sequelize.STRING
  },
  location: {
    type: Sequelize.STRING
  },
  headline: {
    type: Sequelize.STRING
  },
  sub_headline: {
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
  timestamps: false,
  underscored: true
});
