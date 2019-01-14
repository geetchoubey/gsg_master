const Invoice = require('../Models/Invoice');
module.exports = function (sequelize, DataTypes) {
  Invoice.associate = (models) => {
    Invoice.belongsTo(models.requirement);
    Invoice.belongsTo(models.artist);
    Invoice.belongsTo(models.image, {as: 'logo'});
    Invoice.belongsTo(models.artist_type);
    // User.hasOne(AssocationModels.artist, {as: 'user'});
  };

  return Invoice;
};
