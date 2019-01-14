const Skill = require('../Models/Skill');
module.exports = function (sequelize, DataTypes) {
  Skill.associate = function (models) {
    Skill.belongsToMany(models.artist, {as: 'ArtistSkill', through: 'artist_skill', foreignKey: 'skill_id', otherKey: 'artist_id'});
  };
  return Skill;
};
