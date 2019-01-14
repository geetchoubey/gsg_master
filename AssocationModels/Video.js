const Video = require('../Models/Video');
module.exports = function (sequelize, DataTypes) {
  Video.associate = (models) => {
    Video.belongsTo(models.artist);
  };
  return Video;
};
