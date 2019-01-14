var express = require('express');
var router = express.Router();

const AdminAuth = require('./auth/admin');

const db = require('../AssocationModels');

router.get('/', AdminAuth, (req, res, next) => {
  db.enquiries.findAndCountAll({limit: req.query.limit, offset: req.skip}).then(results => {
    res.send(db.paginate(req, results));
  }).catch(err => {
    global.logger(err);
    res.sendStatus(400);
  });
});

router.post('/', (req, res, next) => {
  db.enquiries.create(req.body).then((enquiry) => {
    res.status(201).send(enquiry);
  }).catch(err => {
    global.logger(err);
    res.sendStatus(400);
  });
});

module.exports = router;
