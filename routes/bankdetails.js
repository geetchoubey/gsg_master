const express = require('express');
const router = express.Router({mergeParams: true});

const AdminAuth = require('./auth/admin');
const ArtistAuth = require('./auth/artist');

const db = require('../AssocationModels');
const ImageModel = require('../Models/Image');

router.get('/', [ArtistAuth],(req, res, next) => {
  db.artist.findOne({
    where: {
      slug: req.params.slug
    }, attributes: {
      exclude: ['created_at', 'updated_at', 'user_id', 'logo_id', 'artist_type_id']
    }
  }).then(artist => {
    if (!artist) {
      res.sendStatus(404);
      return;
    }
    db.bank_detail.findOne({
      where: {
        artist_id: artist.id
      }, include: [{
        model: ImageModel,
        as: 'pan_card_image'
      }], attributes: {
        exclude: ['pan_card_image_id', 'id', 'artist_id']
      }
    }).then(details => {
      if (!details) {
        res.sendStatus(404);
        return;
      }
      res.send(details);
    }).catch(err => {
      global.logger(err);
      res.sendStatus(400);
    });
  }).catch(err => {
    global.logger(err);
    res.sendStatus(400);
  });
});

router.put('/', [ArtistAuth], (req, res, next) => {
  db.artist.findOne({
    where: {
      slug: req.params.slug
    }
  }).then(artist => {
    if (!artist) {
      res.sendStatus(404);
      return;
    }
    delete req.body.artist_id;
    db.bank_detail.update(req.body, {
      where: {
        artist_id: artist.id
      }
    }).then(details => {
      if (!details) {
        res.sendStatus(404);
        return;
      }
      res.send(details);
    }).catch(err => {
      global.logger(err);
      res.sendStatus(500);
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
    delete req.body.artist_id;
    db.bank_detail.findOrCreate({
      where: {
        artist_id: artist.id
      }, defaults: req.body
    }).spread((details, created) => {
      if (created) {
        details.setArtist(artist);
        res.sendStatus(201);
      }
      else
        res.sendStatus(409);
    }).catch(err => {
      global.logger(err);
      res.sendStatus(500);
    });
  }).catch(err => {
    global.logger(err);
    res.sendStatus(400);
  });
});

module.exports = router;
