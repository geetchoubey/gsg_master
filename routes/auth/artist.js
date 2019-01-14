const db = require('../../AssocationModels');

const ArtistModel = require('../../Models/Artist');
const Helper = require('../../utils/Helper');

const Op = require('sequelize').Op;

module.exports = (req, res, next) => {
  db.user.findOne({
    where: {
      [Op.or]: [{
        auth_token: req.headers.auth_token,
        role_id: 2
      }, {
        auth_token: req.headers.auth_token,
        id: Helper.decrypt(req.headers.auth_id),
        role_id: 1
      }]

    }, include: [{
      model: ArtistModel,
      as: 'artist',
      where: {
        slug: req.params.slug
      }
    }]
  }).then(user => {
    if (!user) {
      res.sendStatus(401);
    } else {
      next();
    }
  }).catch(err => {
    global.logger(err);
    res.sendStatus(400);
  });
};
