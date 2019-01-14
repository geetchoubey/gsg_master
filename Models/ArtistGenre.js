const db = require('../utils/connection');
const Sequelize = require('sequelize');

let ArtistGenre = db.define('artist_genre', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
}, {
  timestamps: false,
  underscored: true
});

ArtistGenre.removeAttribute('id');

module.exports = ArtistGenre;
