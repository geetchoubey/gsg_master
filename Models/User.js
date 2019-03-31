const db = require('../utils/connection');
const Sequelize = require('sequelize');
const helper = require('../utils/Helper');

module.exports = db.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    get() {
      return helper.encrypt(this.getDataValue('id'));
    }
  },
  email: {
    type: Sequelize.STRING,
    unique: true
  },
  mobile: {
    type: Sequelize.STRING,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    set(val) {
      if (val) this.setDataValue('password', helper.encrypt(val));
    }
  },
  status: {
    type: Sequelize.ENUM,
    values: ['not_verified', 'active', 'inactive', 'deleted'],
    defaultValue: 'not_verified'
  },
  auth_token: {
    type: Sequelize.STRING,
    defaultValue: null
  },
  remember_token: {
    type: Sequelize.STRING,
    defaultValue: null
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
