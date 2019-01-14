const User = require('../Models/User');
module.exports = function (sequelize, DataTypes) {
  User.associate = (models) => {
    User.belongsTo(models.role, {foreignKey: 'role_id'});
    User.hasOne(models.artist, {foreignKey: 'user_id', as: 'artist'});
  };

  return User;
};
