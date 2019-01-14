var express = require('express');
var router = express.Router();
const db = require('../AssocationModels');
const Helper = require('../utils/Helper');

router.post('/', function (req, res, next) {
  db.subscription.findOrCreate({
    where: {
      email: req.body.email
    }
  }).spread((user, created) => {
    if (created) {
      res.status(201).send(user);
    } else {
      res.sendStatus(409);
    }
  }).catch(err => {
    res.sendStatus(400);
  });
});

/* GET home page. */
router.get('/:email', function (req, res, next) {
  db.subscription.findOne({
      email: Helper.decrypt(req.params.email)
    }
  ).then(subscription => {
    if (subscription) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  });
});

router.delete('/:email', function (req, res, next) {
  db.subscription.destroy({
    where: {
      email: Helper.decrypt(req.params.email)
    }
  }).then(deleted => {
    if (deleted === 1) {
      res.sendStatus(202);
    } else {
      res.sendStatus(404);
    }
  });
});

module.exports = router;
