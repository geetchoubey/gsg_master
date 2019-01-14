const db = require('../utils/connection');
const Sequelize = require('sequelize');

module.exports = db.define('bank_detail', {
  id: {
    type: Sequelize.BIGINT(20),
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING
  },
  account_number: {
    type: Sequelize.STRING
  },
  ifsc_code: {
    type: Sequelize.STRING
  },
  pan_card_number: {
    type: Sequelize.STRING
  },
  account_holder: {
    type: Sequelize.STRING
  }
}, {
  timestamps: false,
  underscored: true
});
