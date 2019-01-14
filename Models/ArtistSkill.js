const db = require('../utils/connection');
const Sequelize = require('sequelize');

let ArtistSkill = db.define('artist_skill', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
}, {
  timestamps: false,
  underscored: true
});

ArtistSkill.removeAttribute('id');

module.exports = ArtistSkill;
