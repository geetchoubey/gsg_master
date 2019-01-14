const ArtistGenre = require('../Models/ArtistGenre');
module.exports = function (sequelize, Sequelize) {
  ArtistGenre.associate = function (models) {
    // ArtistGenre.belongsTo(models.artist);
    // ArtistGenre.belongsTo(models.genre);
  };
  return ArtistGenre;
};
