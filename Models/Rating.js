const db = require('../utils/connection');
const Sequelize = require('sequelize');

var RatingModel = db.define('rating', {
  rating: {
    type: Sequelize.DECIMAL(10, 2),
    validate: {
      min: 0,
      max: 5,
      isDecimal: true,
    }, defaultValue: 0
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
RatingModel.removeAttribute('id');

module.exports = RatingModel;
