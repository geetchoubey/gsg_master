var express = require('express');
var router = express.Router();
const moment = require('moment');

const AdminAuth = require('./auth/admin');
const EnquiryModel = require('../Models/Enquiry');
const ReplyModel = require('../Models/Reply');
const GenreModel = require('../Models/Genre');
const SkillModel = require('../Models/Skill');
const ArtistTypeModel = require('../Models/ArtistType');
const ArtistModel = require('../Models/Artist');
const UserModel = require('../Models/User');
const ImageModel = require('../Models/Image');
const RequirementModel = require('../Models/Requirement');

const db = require('../AssocationModels');

const Op = require('sequelize').Op;

router.get('/', AdminAuth, (req, res, next) => {
  try {
    var whereStatement = [];

    if (req.query.name)
      whereStatement.push({
        name: {
          [Op.like]: '%' + (req.query.name) + '%'
        }
      });
    if (req.query.email)
      whereStatement.push({
        email: req.query.email
      });
    if (req.query.phone)
      whereStatement.push({
        mobile: req.query.mobile
      });

    var modelObj = {
      model: EnquiryModel,
      required: true,
      where: {
        [Op.or]: whereStatement
      }
      // through: {attributes: []}
    };
    if (!req.query.phone && !req.query.email && !req.query.name)
      delete modelObj.where;

    const condition = {};
    if (req.query.status) {
      if (req.query.status === 'live') {
        condition.status = 'pending';
      } else if (req.query.status === 'status') {
        condition.status = {
          [Op.and]: [{
            [Op.ne]: 'cancel'
          }, {
            [Op.ne]: 'pending'
          }]
        };
      } else if (req.query.status === 'history') {
        condition.status = {
          [Op.or]: ['cancel', 'got_it']
        };
        condition.date_of_event = {
          [Op.lte]: moment().toDate()
        }
      }
    }

    db.requirement.findAndCountAll({
        where: condition,
        include: [modelObj],
        limit: req.query.limit,
        offset: req.skip
      }
    ).then(results => {
      res.send(db.paginate(req, results));
    }).catch(err => {
      global.logger(err);
      res.sendStatus(400);
    });
  } catch (err) {
    global.logger(err);
    res.sendStatus(500);
  }
});

router.post('/', (req, res, next) => {
  if (!req.query.enquiry_id) {
    res.sendStatus(400);
    return;
  }
  req.body.enquiry_id = req.query.enquiry_id;
  db.requirement.create(req.body).then(createdRequirement => {
    if (!createdRequirement) {
      res.sendStatus(424);
      return;
    }
    res.sendStatus(201);
  }).catch(err => {
    global.logger(err);
    res.sendStatus(400);
  });
});

router.put('/', (req, res, next) => {
  if (!req.query.requirement_id) {
    res.sendStatus(400);
    return;
  }
  db.requirement.findOne({
    where: {
      id: req.query.requirement_id
    }
  }).then(requirement => {
    if (!requirement)
      return res.sendStatus(404);
    requirement.updateAttributes(req.body);
    res.send(requirement);
  }).catch(err => {
    res.sendStatus(400);
    global.logger(err);
  });
});

router.put('/:requirement_id/SendToArtist', (req, res, next) => {
  let requirementId = req.params.requirement_id;
  db.requirement.findOne({
    where: {
      id: requirementId
    },
    include: [
      EnquiryModel, {
        model: ReplyModel,
        include: [{
          model: ArtistModel,
          include: [{
            model: ImageModel,
            as: 'logo'
          }]
        }]
      }, SkillModel, GenreModel, ArtistTypeModel] // 'enquiry', 'replies', 'replies.artist', 'replies.artist.logo', 'genre', 'skill', 'artist_type'
  }).then(requirement => {
    if (!requirement)
      return res.sendStatus(404);
    if (requirement.status === 'send_to_artist') return res.status(409);
    requirement.updateAttributes({
      status: 'send_to_artist'
    });
    db.artist.findAll({
      where: {
        status: 'active',
        artist_type_id: requirement.artist_type_id
      }
    }).then(artists => {
      artists.forEach(artist => {
        db.replies.create({
          requirement_id: requirementId,
          artist_id: artist.id,
          status: 'pending'
        });
        // #TODO SEND EMAIL CODE HERE!!
      });

      res.send(requirement);
    }).catch(err => {
      global.logger(err);
      res.sendStatus(400);
    });
  }).catch(err => {
    global.logger(err);
    res.sendStatus(400);
  });
});

router.put('/:requirement_id/Pitch', (req, res, next) => {
  const replyIds = req.body.reply_ids;
  if (replyIds.length === 0) return res.sendStatus(400);
  db.requirement.findOne({
    where: {
      id: req.params.requirement_id
    }
  }).then(requirement => {
    if (!requirement) return res.sendStatus(404);
    if (requirement.status === 'send_to_artist') {
      requirement.updateAttributes({
        status: 'pitched',
        pitched_number: 1
      });
    } else {
      requirement.updateAttributes({
        pitched_number: requirement.dataValues.pitched_number + 1
      });
    }

    if (!replyIds || replyIds.length === 0) {
      res.sendStatus(400);
      return;
    }

    replyIds.forEach(replyId => {
      db.replies.findOne({
        where: {
          id: replyId
        }, include: [{
          model: ArtistModel,
          include: [{
            model: UserModel,
            attributes: {
              exclude: ['password', 'id', 'auth_token', 'remember_token', 'role_id']
            }
          }]
        },
          RequirementModel
        ] // #TODO include artist, artist.user, requirement tables // Seems done
      }).then(reply => {
        reply.updateAttributes({
          status: 'pitched',
          token: Helper.encrypt(Helper.encrypt(reply.id)),
          pitched_number: requirement.pitched_number
        });

        // SEND EMAIL TO ARTIST REGARDING PITCH

      }).catch(err => {
        global.logger(err);
        res.sendStatus(400);
      });
    });

    // #TODO SEND EMAIL TO USER WITH PITCH NUMBERS

    res.send(requirement);

  }).catch(err => {
    global.logger(err);
    res.sendStatus(400);
  });
});

router.put('/:requirement_id/Cancel', (req, res, next) => {
  db.replies.findAll({
    where: {
      requirement_id: req.params.requirement_id
    }
  }).then(replies => {
    replies.forEach(reply => {
    });

    db.requirement.findOne({
      where: {
        id: req.params.requirement_id
      }, include: [EnquiryModel]
    }).then(requirement => {
      if (!requirement) return res.sendStatus(404);
      if (requirement.status === 'cancel') return res.status(409).send(requirement);
      requirement.updateAttributes({
        status: 'cancel'
      });

      // #TODO SEND EMAIL REGARDING CRASH with REQUIREMENT

      res.send(requirement);

    }).catch(err => {
      global.logger(err);
      res.sendStatus(400);
    });
  }).catch(err => {
    global.logger(err);
    res.sendStatus(400);
  });
});

router.put('/:requirement_id/GotIt', (req, res, next) => {
  db.replies.findOne({
    where: {
      requirement_id: req.params.requirement_id
    }
  }).then(reply => {
    if (!reply) {
      res.sendStatus(404);
      return;
    }
    if (reply.status === 'got_it') return res.sendStatus(409);

    reply.updateAttributes({
      status: 'got_it'
    });

    // #TODO Send email with reply.id

    db.requirement.findOne({
      where: {
        id: req.params.requirement_id
      }
    }).then(requirement => {
      requirement.updateAttributes({
        status: 'got_it'
      });
      res.send(requirement);
    }).catch(err => {
      global.logger(err);
      res.sendStatus(400);
    })
  }).catch(err => {
    global.logger(err);
    res.sendStatus(400);
  });
});

router.put('/:token/SelectedArtist', (req, res, next) => {
  db.replies.findOne({
    where: {
      token: req.params.token
    }
  }).then(reply => {
    if (!reply) return res.sendStatus(404);
    db.requirement.findOne({
      where: {
        id: reply.requirement_id
      }
    }).then(requirement => {
      if (!requirement) return res.sendStatus(404);

      if (requirement.status === 'got_it' && reply.status === 'got_it') return res.sendStatus(409);

      requirement.updateAttributes({
        status: 'got_it'
      });
      reply.updateAttributes({
        status: 'got_it'
      });


      // #TODO Send email to Artist that was selected
      // #TODO Send email to User who selected the artist

      db.replies.findAll({
        where: {
          status: {
            [Op.and]: [{
              [Op.ne]: 'pending'
            }, {
              [Op.ne]: 'got_it'
            }]
          }, requirement_id: reply.requirement_id
        }, include: [{
          model: ArtistModel,
          include: [{
            model: UserModel,
            attributes: {
              exclude: ['password', 'id', 'auth_token', 'remember_token', 'role_id']
            }
          }]
        }, RequirementModel],
        limit: req.query.limit,
        offset: req.skip
      }).then(notGotReplies => {
        // #TODO Send email to not GOT_IT Artists with $notGotReplies

        db.replies.findAll({
          where: {
            requirement_id: reply.requirement_id
          }
        }).then(noGoReplies => {
          noGoReplies.forEach(noGoReply => {
            noGoReply.updateAttributes({
              status: 'no_go',
              token: ''
            });
          });

          res.send({
            requirement: requirement,
            pitched_number: reply.pitched_number
          });

        }).catch(err => {
          global.logger(err);
          res.sendStatus(400);
        });
      }).catch(err => {
        global.logger(err);
        res.sendStatus(400);
      });

    }).catch(err => {
      global.logger(err);
      res.sendStatus(400);
    });
  }).catch(err => {
    global.logger(err);
    res.sendStatus(400);
  })
});

module.exports = router;
