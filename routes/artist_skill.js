var express = require('express');
var router = express.Router({mergeParams: true});

const db = require('../AssocationModels');
const Skills = require('../Models/Skill');

const ArtistAuth = require('./auth/artist');

const Sequelize = require('Sequelize');
const Op = Sequelize.Op;

// Fetch Artist publicly available Genre
router.get('/', (req, res, next) => {
  db.artist.findAll({
    where: {
      slug: req.params.slug
    }, attributes: ['id']
    , include: [{
      model: Skills,
      as: 'ArtistSkill',
      required: false,
      // attributes: ['id'],
      through: {attributes: []},
    }],
    subQuery: false,
    limit: req.query.limit,
    offset: req.skip
  }).then(artists => {
    let artist = artists[0];
    if (!artist) {
      res.sendStatus(404);
      return;
    }
    db.artist_skill.findAndCountAll({
      where: {
        artist_id: artist.id
      },
      limit: req.query.limit,
      offset: req.skip
    }).then(results => {
      results.rows = artist.ArtistSkill;
      res.send(db.paginate(req, results));
    });
  }).catch(err => {
    global.logger(err);
    res.sendStatus(500);
  });
});

router.post('/', [ArtistAuth], (req, res, next) => {
  db.artist.findOne({
    where: {
      slug: req.params.slug
    }
  }).then(artist => {
    db.skill.findAll({
      where: {
        id: {
          [Op.or]: req.body.skills
        }
      }
    }).then(skills => {
      artist.setArtistSkill(skills);
      res.sendStatus(200);
    })
  });
});

module.exports = router;
