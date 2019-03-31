const db = require('../utils/connection');
const Sequelize = require('sequelize');
const Helper = require('../utils/Helper');


module.exports = db.define('artist', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    get() {
      return Helper.encrypt(this.getDataValue('id'));
    }
  },
  name: {
    type: Sequelize.STRING
  },
  slug: {
    type: Sequelize.STRING,
    set(val) {
      this.setDataValue('slug', Helper.str_slug(val));
    }
  },
  location: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  gender: {
    type: Sequelize.ENUM,
    values: ['male', 'female', 'other']
  },
  status: {
    type: Sequelize.ENUM,
    values: ['active', 'inactive'],
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
  underscored: true,
  timestamps: false
});
