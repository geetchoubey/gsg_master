const Requirement = require('../Models/Requirement');
module.exports = function (sequelize, DataTypes) {
  Requirement.associate = (models) => {
    Requirement.belongsTo(models.enquiries);
    Requirement.belongsTo(models.genre);
    Requirement.belongsTo(models.artist_type);
    Requirement.belongsTo(models.skill);
    Requirement.hasMany(models.replies);
    Requirement.hasOne(models.invoice);
  };

  return Requirement;
};
