const SEO = require('../Models/SEO');
module.exports = function (sequelize, DataTypes) {
  SEO.associate = (models) => {
    SEO.belongsTo(models.genre);
    SEO.belongsTo(models.skill);
    SEO.belongsTo(models.artist_type);
    SEO.belongsTo(models.image);
  };

  return SEO;
};
