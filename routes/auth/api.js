const db = require('../../AssocationModels');

const Helper = require('../../utils/Helper');

module.exports = (req, res, next) => {
  db.api_key.findOne({
    where: {}
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
