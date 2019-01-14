const BankDetails = require('../Models/BankDetail');
module.exports = function (sequelize, DataTypes) {
  BankDetails.associate = function (models) {
    BankDetails.belongsTo(models.artist, {as: 'artist'});
    BankDetails.belongsTo(models.image, {as: 'pan_card_image'});
  };
  return BankDetails;
};
