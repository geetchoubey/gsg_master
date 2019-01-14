var express = require('express');
var router = express.Router({mergeParams: true});

const db = require('../AssocationModels');

router.post('/', (req, res) => {
  db.artist.findOne({
    where: {
      slug: req.params.slug
    }
  }).then(artist => {
    if (!artist) return res.sendStatus(404);
    db.rating.create({
      rating: req.body.rating,
      artist_id: artist.id
    }).then(rating => {
      res.sendStatus(201);
    }).catch(err => {
      global.logger(err);
      res.sendStatus(400);
    });
  });
});

module.exports = router;
