const Audio = require('../Models/Audio');
module.exports = function (sequelize, Sequelize) {
  Audio.associate = function (models) {
    Audio.belongsTo(models.artist);
  };
  return Audio;
};
