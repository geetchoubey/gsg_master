const Artist = require('../Models/Artist');

module.exports = function (sequelize, Sequelize) {
  Artist.associate = function (models) {
    Artist.belongsTo(models.user);
    Artist.belongsTo(models.artist_type);
    Artist.belongsTo(models.image, {as: 'logo'});
    Artist.belongsToMany(models.genre, {as: 'ArtistGenre', through: 'artist_genre', foreignKey: 'artist_id', otherKey: 'genre_id'});
    Artist.belongsToMany(models.skill, {as: 'ArtistSkill', through: 'artist_skill', foreignKey: 'artist_id', otherKey: 'skill_id'});
    Artist.hasMany(models.rating, {as: 'ratings'});
  };
  return Artist;
};
