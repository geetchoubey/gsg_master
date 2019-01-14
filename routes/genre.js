var express = require('express');
var router = express.Router();

const db = require('../AssocationModels');

const AdminAuth = require('./auth/admin');

router.get('/', (req, res, next) => {
  db.genre.findAndCountAll({limit: req.query.limit, offset: req.skip}).then(results => {
    res.send(db.paginate(req, results));
  }).catch(err => {
    global.logger(err);
    res.sendStatus(500);
  });
});

router.post('/', AdminAuth, (req, res, next) => {
  db.genre.findOrCreate({
    where: {
      name: req.body.name
    }
  }).spread((genre, created) => {
    if (!created){
      res.sendStatus(409);
      return;
    }
    res.status(201).send(genre);
  });
});

module.exports = router;
