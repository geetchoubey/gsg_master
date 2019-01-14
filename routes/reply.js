var express = require('express');
var router = express.Router();
const moment = require('moment');

const AdminAuth = require('./auth/admin');
const UserAuth = require('./auth/artist');
const Requirement = require('../Models/Requirement');
const ArtistTypeModel = require('../Models/ArtistType');

const db = require('../AssocationModels');
const Op = require('sequelize').Op;

router.get('/', [AdminAuth], (req, res, next) => {
  getReplies(req, {}).then(results => {
    if (!results || results.length === 0) {
      res.sendStatus(404);
      return;
    }
    res.send(db.paginate(req, results));
  }).catch(err => {
    global.logger(err);
    res.sendStatus(400);
  });
});

router.get('/:id', (req, res, next) => {
  getReplies(req, {id: req.params.id}).then(results => {
    if (!results || results.length === 0) {
      res.sendStatus(404);
      return;
    }
    res.send(db.paginate(req, results));
  }).catch(err => {
    global.logger(err);
    res.sendStatus(400);
  });
});

function getReplies(req, whereCondition = {}) {
  if (req.query.requirementId)
    whereCondition.requirement_id = req.query.requirementId;
  if (req.query.adminStatus)
    whereCondition.status = req.query.adminStatus;
  if (req.query.status) {
    if (req.query.status === 'live')
      whereCondition.status = 'pending';
    else if (req.query.status === 'status') {
      whereCondition.status = {
        [Op.and]: [{
          [Op.ne]: 'cancel'
        }, {
          [Op.ne]: 'pending'
        }, {
          [Op.ne]: 'got_it'
        }]
      };
    } else if (req.query.status === 'history') {
      whereCondition.status = {
        [Op.or]: ['cancel', 'got_it']
      };
      /*whereCondition.date_of_event = {
        [Op.lte]: moment().toDate()
      }*/
    }
  }
  return db.replies.findAndCountAll({
    include: [{
      model: Requirement,
      include: [ArtistTypeModel]
    }],
    order: [
      ['created_at', 'DESC']
    ],
    where: whereCondition,
    limit: req.query.limit,
    offset: req.skip
  });
}

router.put('/:id/accept', (req, res, next) => {
  db.replies.findOne({
    where: {
      id: req.params.id
    }
  }).then(reply => {
    if (!reply) {
      res.sendStatus(404);
      return;
    }
    reply.updateAttributes({
      status: 'accept'
    });
    res.send(reply);
  }).catch(err => {
    global.logger(err);
  });
});


router.put('/:id/reject', (req, res, next) => {
  db.replies.findOne({
    where: {
      id: req.params.id
    }
  }).then(reply => {
    if (!reply) {
      res.sendStatus(404);
      return;
    }
    reply.updateAttributes({
      status: 'not_interested'
    });
    res.send(reply);
  }).catch(err => {
    global.logger(err);
    res.sendStatus(400);
  });
});

router.put('/:id/accepted', [AdminAuth], (req, res, next) => {
  db.replies.findOne({
    where: {
      id: req.params.id,
      requirement_id: req.body.requirement_id
    }
  }).then(reply => {
    if (!reply) {
      res.sendStatus(404);
      return;
    }
    reply.updateAttributes({
      status: 'accept'
    });
    res.send(reply);
  }).catch(err => {
    global.logger(err);
    res.sendStatus(400);
  });
});

router.put('/:id/create', [AdminAuth], (req, res, next) => {
  db.requirement.findOne({
    where: {
      id: req.params.id
    }
  }).then(requirement => {
    if (!requirement) {
      res.sendStatus(404);
      return;
    }
    if (requirement.status === 'pending') {
      requirement.updateAttributes({
        status: 'send_to_artist'
      });
    }
    db.replies.findOrCreate({
      where: {
        artist_id: req.body.artist_id,
        requirement_id: req.body.requirement_id
      }
    }).splice((reply, created) => {
      if (created || reply.status === 'pending') {
        reply.updateAttributes({
          status: 'accept'
        });
      }
      res.status(201).send(reply);
    });
  }).catch(err => {
    global.logger(err);
    res.sendStatus(400);
  })
});

router.put('/:id/constants', [AdminAuth], (req, res, next) => {
  db.replies.findOne({
    where: {
      id: req.params.id,
      requirement_id: req.body.requirement_id
    }
  }).then(reply => {
    if (!reply) {
      res.sendStatus(404);
      return;
    }
    reply.updateAttributes({
      status: 'accept'
    });
    res.send(reply);
  }).catch(err => {
    global.logger(err);
  });
});

module.exports = router;
