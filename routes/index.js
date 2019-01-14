var express = require('express');
var router = express.Router();
const db = require('../AssocationModels');
const Role = require('../Models/Role');
const Helper = require('../utils/Helper');
const paginate = require('express-paginate');

const SubscriptionAPI = require('./subscription');
const UsersAPI = require('./user');
const ArtistsAPI = require('./artist');
const ArtistsTypeAPI = require('./artist_type');
const GenreAPI = require('./genre');
const SkillAPI = require('./skill');
const EnquiryAPI = require('./enquiry');
const RequirementAPI = require('./requirement');
const ReplyAPI = require('./reply');
const ImageService = require('./image');

// Pagination
router.use(paginate.middleware(10, 50));

/* GET home page. */
router.use('/users', UsersAPI);
router.use('/artists', ArtistsAPI);
router.use('/artistTypes', ArtistsTypeAPI);
router.use('/subscriptions', SubscriptionAPI);
router.use('/genres', GenreAPI);
router.use('/skills', SkillAPI);
router.use('/enquiries', EnquiryAPI);
router.use('/requirements', RequirementAPI);
router.use('/replies', ReplyAPI);
router.use('/images', ImageService);

/*router.get('/', function (req, res, next) {

  db.user.findAll({
    include: [Role]
  }).then(data => {
    res.send(data);
  }).catch(err => {
    res.sendStatus(500);
  });


});*/

router.get('/encrypt/:str', (req, res, next) => {
  res.send(Helper.encrypt(req.params.str));
});

router.get('/decrypt/:str', (req, res, next) => {
  res.send(Helper.decrypt(req.params.str));
});

module.exports = router;
