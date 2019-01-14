const db = require('../../AssocationModels');

const Helper = require('../../utils/Helper');

module.exports = (req, res, next) => {
  db.user.findOne({
    where: {
      auth_token: req.headers.auth_token,
      id: Helper.decrypt(req.headers.auth_id),
      role_id: 1
    }
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
