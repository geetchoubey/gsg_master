const Reply = require('../Models/Reply');
module.exports = function (sequelize, DataTypes) {
  Reply.associate = (models) => {
    Reply.belongsTo(models.artist);
    Reply.belongsTo(models.requirement);
  };

  return Reply;
};
