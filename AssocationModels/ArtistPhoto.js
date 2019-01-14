const ArtistPhoto = require('../Models/ArtistPhoto');
module.exports = function (sequelize, Sequelize) {
  ArtistPhoto.associate = function(models) {
    // ArtistPhoto.belongsTo(models.artist);
    // ArtistPhoto.belongsTo(models.image);
  };
  return ArtistPhoto;
};
