const db = require('../utils/connection');
const Sequelize = require('sequelize');

module.exports = db.define('requirement', {
  id: {
    type: Sequelize.BIGINT(20),
    primaryKey: true,
    autoIncrement: true
  },
  date_of_event: {
    type: Sequelize.DATE,
    validate: {
      isDate: true
    }
  },
  location: {
    type: Sequelize.STRING
  },
  budget: {
    type: Sequelize.STRING
  },
  pitched_number: {
    type: Sequelize.INTEGER
  },
  admin_budget: {
    type: Sequelize.STRING
  },
  status: {
    type: Sequelize.ENUM,
    values: ['pending', 'send_to_artist', 'pitched', 'got_it', 'cancel'],
    defaultValue: 'pending'
  },
  type_of_event: {
    type: Sequelize.STRING
  },
  additional_information: {
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
