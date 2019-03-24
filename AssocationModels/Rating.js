const Rating = require('../Models/Rating');
module.exports = function (sequelize, Sequelize) {
  Rating.associate = function (models) {
    Rating.belongsTo(models.artist);
  };
  return Rating;
};
