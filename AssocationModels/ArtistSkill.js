const ArtistSkill = require('../Models/ArtistSkill');
module.exports = function (sequelize, Sequelize) {
  ArtistSkill.associate = function (models) {
    // ArtistGenre.belongsTo(models.artist);
    // ArtistGenre.belongsTo(models.genre);
  };
  return ArtistSkill;
};
