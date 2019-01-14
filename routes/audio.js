var express = require('express');
var router = express.Router({mergeParams: true});

const db = require('../AssocationModels');

const ArtistAuth = require('./auth/artist');

router.get('/', (req, res, next) => {
  db.artist.findOne({
    where: {
      slug: req.params.slug
    }
  }).then(artist => {
    if (!artist) {
      res.sendStatus(404);
      return;
    }
    db.audio.findAndCountAll({
      where: {
        artist_id: artist.id
      },
      limit: req.query.limit,
      offset: req.skip
    }).then(results => {
      res.send(db.paginate(req, results));
    }).catch(err => {
      global.logger(err);
      res.sendStatus(400);
    });
  }).catch(err => {
    global.logger(err);
    res.sendStatus(400);
  });
});

router.post('/', [ArtistAuth], (req, res, next) => {
  db.artist.findOne({
    where: {
      slug: req.params.slug
    }
  }).then(artist => {
    if (!artist) {
      res.sendStatus(404);
      return;
    }
    db.audio.create({
      url: req.body.url,
      artist_id: artist.id
    }).then(() => {
      res.sendStatus(201);
    }).catch(err => {
      global.logger(err);
      res.sendStatus(400);
    });
  }).catch(err => {
    global.logger(err);
    res.sendStatus(400);
  });
});

router.delete('/:id', [ArtistAuth], (req, res, next) => {
  db.artist.findOne({where: {slug: req.params.slug}}).then(artist => {
    if (!artist) {
      res.sendStatus(404);
      return;
    }
    db.audio.destroy({
      where: {
        id: req.params.id
      }
    }).then(deletedAudio => {
      if (!deletedAudio)
        res.sendStatus(404);
      else
        res.sendStatus(202);
    }).catch(err => {
      global.logger(err);
      res.sendStatus(400);
    });
  }).catch(err => {
    global.logger(err)
  });
});

module.exports = router;
