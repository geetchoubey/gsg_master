var express = require('express');
var router = express.Router();
var path = require('path');
var aws = require('aws-sdk');
var multerS3 = require('multer-s3');
const multer = require('multer');


const db = require('../AssocationModels');
const ArtistAuth = require('./auth/artist');

const BankDetailsAPI = require('./bankdetails');
const ArtistGenreAPI = require('./artist_genre');
const ArtistSkillAPI = require('./artist_skill');
const AudioAPI = require('./audio');
const VideoAPI = require('./video');
const RatingAPI = require('./rating');

const ArtistController = require('../Controllers/ArtistController');

const successStrings = require('../utils/ResponseHandling/SuccessConstants');
const errorStrings = require('../utils/ResponseHandling/ErrorConstants');

router.get('/', (req, res, next) => {
    ArtistController.getAllArtists(req).then(data => {
        res.send(new GetSetGig(data));
    }).catch(err => {
        global.logger(err);
        next(err);
    });
});

router.get('/:slug', (req, res, next) => {
    ArtistController.getArtistPublicProfile(req).then(artist => {
        if (artist) return res.send(new GetSetGig(artist));
        next(new GetSetGigError(errorStrings.artist.not_found, 404));
    }).catch(err => {
        global.logger(err);
        next(err);
    })
});

// Create New Artist
router.post('/:userId', (req, res, next) => {
    ArtistController.createNewArtist(req).then(artistResult => {
        if (artistResult === null) return next(new GetSetGigError(errorStrings.user.not_found, 404));
        if (artistResult === false) return next(new GetSetGigError(errorStrings.artist.already_exists, 409));
        res.send(new GetSetGig(artistResult));
    });
});

router.use('/:slug/bankdetails', BankDetailsAPI);
router.use('/:slug/genres', ArtistGenreAPI);
router.use('/:slug/skills', ArtistSkillAPI);
router.use('/:slug/audios', AudioAPI);
router.use('/:slug/videos', VideoAPI);
router.use('/:slug/ratings', RatingAPI);

var s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
});

var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME || '',
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            cb(null, (Date.now().toString() + path.extname(file.originalname)))
        }
    })
}).single('logo');

router.post('/:slug/logo', [ArtistAuth], async (req, res, next) => {
    const artist = await db.artist.findOne({
        where: {
            slug: req.params.slug
        }
    });
    if (!artist) {
        res.sendStatus(404);
        return;
    }
    upload(req, res, err => {

        if (err) {
            res.sendStatus(400);
            return;
        }
        db.image.create({
            url: req.file.filename
        }).then(image => {
            artist.setLogo(image);
            res.sendStatus(201);
        }).catch(err => {
            res.sendStatus(400);
            global.logger(err);
        });
    });
});

module.exports = router;
