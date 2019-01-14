const Genre = require('../Models/Genre');
module.exports = function (sequelize, DataTypes) {
  Genre.associate = function (models) {
    Genre.belongsToMany(models.artist, {as: 'ArtistGenre', through: 'artist_genre', foreignKey: 'genre_id', otherKey: 'artist_id'});
  };
  return Genre;
};
