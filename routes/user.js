var express = require('express');
var router = express.Router();

const db = require('../AssocationModels');
const Role = require('../Models/Role');
const Artist = require('../Models/Artist');
const ArtistType = require('../Models/ArtistType');
const Image = require('../Models/Image');

const Helper = require('../utils/Helper');

const AdminAuth = require('./auth/admin');

router.get('/', (req, res, next) => {
  res.status(400).send('Please enter Artist ID');
});

router.get('/:id', AdminAuth, function (req, res, next) {
  db.user.findOne({
    include: [{
      model: Role,
      attributes: {
        // exclude: ['id']
      }
    }],
    attributes: {
      exclude: ['password', 'created_at', 'updated_at', 'role_id']
    },
    where: {
      id: Helper.decrypt(req.params.id)
    }
  }).then(user => {
    if (!user) {
      res.sendStatus(404);
      return;
    }
    res.send(user);
  });
});

router.post('/login', (req, res, next) => {
  db.user.findOne({
    include: [Role, {
      model: Artist,
      as: 'artist',
      required: false,
      attributes: {
        exclude: ['user_id', 'created_at', 'updated_at', 'artist_type_id', 'logo_id']
      },
      include: [{
        model: ArtistType, as: 'artist_type'
      }, {
        model: Image, as: 'logo'
      }]
    }],
    where: {
      email: req.body.email
    },
    attributes: {
      exclude: ['created_at', 'updated_at']
    }
  }).then(user => {
    if (!user) {
      res.sendStatus(404);
    } else {
      console.log(Helper.decrypt(user.dataValues.password));
      if (Helper.decrypt(user.dataValues.password) === req.body.password) {
        user.updateAttributes({
          auth_token: Helper.encrypt(user.dataValues.email)
        });
        delete user.dataValues.password;
        delete user.dataValues.role;
        res.send(user.dataValues);
      } else {
        res.sendStatus(401);
      }
    }

  }).catch(err => {
    res.sendStatus(500);
  });
});

router.post('/register', (req, res, next) => {
  var role_id = 2;
  if (req.body.role_id) {
    role_id = req.body.role_id;
  }
  db.user.findOrCreate({
    where: {
      email: req.body.email,
      mobile: req.body.mobile
    },
    defaults: {
      password: req.body.password,
      role_id: role_id
    }
  }).spread((user, created) => {
    if (!created) {
      res.sendStatus(409);
      return;
    }
    delete user.dataValues.password;
    res.status(201).send(user.dataValues);
  }).catch(err => {
    global.logger(err);
    res.sendStatus(400);
  });
});

router.post('/reset_password/:id', (req, res, next) => {
  db.user.findOne({
    where: {
      id: Helper.decrypt(Helper.decrypt(req.params.id))
    }
  }).then(user => {
    if (!user) {
      res.sendStatus(404);
      return;
    }
    user.updateAttributes({
      password: req.body.password
    });
    res.sendStatus(200);
  }).catch(err => {
    res.sendStatus(500);
  });
});

router.get('/reset_password/:id', (req, res, next) => {
  db.user.findOne({
    // attributes: {
    //   exclude: ['mobile', 'status', 'auth_token', 'remember_token', 'password', 'created_at', 'updated_at', 'role_id']
    // },
    where: {
      id: Helper.decrypt(Helper.decrypt(req.params.id))
    }
  }).then(user => {
    if (!user) {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(200);
  });
});

router.post('/reset_password', (req, res, next) => {
  db.user.findOne({
    where: {
      email: req.body.email
    }
  }).then(user => {
    if (!user) {
      res.sendStatus(404);
      return ;
    }

    // #TODO Send email with reset password link and token
    res.sendStatus(200);
  }).catch(err => {
    global.logger(err);
    res.sendStatus(500);
  });
});

router.get('/verify/:id/:token', (req, res, next) => {
  var id = Helper.decrypt(req.params.id);
  if (id === Helper.decrypt(Helper.decrypt(req.params.token))) {
    db.user.findOne({
      where: {
        id: id
      }
    }).then(user => {
      if (!user) {
        res.sendStatus(404);
        return;
      }
      if (user.dataValues.status === 'active') {
        res.send(409);
        return;
      }
      user.updateAttributes({
        status: 'active'
      });
      res.sendStatus(200);
    });
  } else {
    res.sendStatus(401);
  }
});

module.exports = router;
