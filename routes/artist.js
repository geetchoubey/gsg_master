var express = require('express');
var router = express.Router();
var path = require('path');
var aws = require('aws-sdk');
var multerS3 = require('multer-s3');

const db = require('../AssocationModels');
const AdminAuth = require('./auth/admin');
const Logo = require('../Models/Image');
const Genres = require('../Models/Genre');
const Skills = require('../Models/Skill');
const Ratings = require('../Models/Rating');
const ArtistType = require('../Models/ArtistType');

const UserModel = require('../Models/User');

const ArtistAuth = require('./auth/artist');

const sequelize = require('sequelize');

const BankDetailsAPI = require('./bankdetails');
const ArtistGenreAPI = require('./artist_genre');
const ArtistSkillAPI = require('./artist_skill');
const AudioAPI = require('./audio');
const VideoAPI = require('./video');
const RatingAPI = require('./rating');

const multer = require('multer');

const Helper = require('../utils/Helper');

router.get('/', [AdminAuth], (req, res, next) => {
    db.artist.findAll({
        include: [{
            model: Genres,
            as: 'ArtistGenre',
            through: {attributes: []},
            attributes: {
                exclude: ['id']
            }
        }, {
            model: Skills,
            as: 'ArtistSkill',
            through: {attributes: []},
            attributes: ['id'],
            required: false,
        }, {
            model: Logo,
            as: 'logo',
            attributes: {
                exclude: ['id']
            }
        }, {
            model: ArtistType,
            attributes: {
                exclude: ['id']
            }
        }, {
            model: UserModel,
            attributes: {
                exclude: ['password', 'id', 'auth_token', 'remember_token', 'role_id']
            }
        }, {
            model: Ratings,
            as: 'ratings',
            attributes: {
                exclude: ['rating', 'created_at', 'updated_at', 'artist_id'],
                include: [[sequelize.fn('AVG', sequelize.col('rating')), 'rating']]
            }
        }],
        subQuery: false,
        order: [
            ['created_at', 'DESC']
        ],
        group: ['artist.id', 'ArtistGenre.id', 'ArtistSkill.id'],
        attributes: {
            exclude: ['user_id', 'logo_id', 'artist_type_id']
        },
        limit: req.query.limit,
        offset: req.skip
    }).then(artists => {
        var results = {};
        results.rows = artists;
        db.artist.count().then(count => {
            results.count = count;
            res.send(db.paginate(req, results));
        });

    });
});

router.get('/:slug', (req, res, next) => {
    db.artist.findAll({
        include: [{
            model: Genres,
            as: 'ArtistGenre',
            through: {attributes: []},
            attributes: {
                exclude: ['id']
            }
        }, {
            model: Skills,
            as: 'ArtistSkill',
            through: {attributes: []},
            attributes: {
                exclude: ['id']
            }
        }, {
            model: Logo,
            as: 'logo',
            attributes: {
                exclude: ['id']
            }
        }, {
            model: ArtistType,
            attributes: {
                exclude: ['id']
            }
        }, {
            model: UserModel,
            attributes: {
                exclude: ['password', 'id', 'auth_token', 'remember_token', 'role_id']
            }
        }, {
            model: Ratings,
            as: 'ratings',
            attributes: {
                exclude: ['rating', 'created_at', 'updated_at', 'artist_id'],
                include: [[sequelize.fn('AVG', sequelize.col('rating')), 'rating']]
            }
        }],
        // raw: true,
        where: {
            slug: req.params.slug
        }, subQuery: false,
        group: ['id', 'ArtistGenre.id', 'ArtistGenre->artist_genre.id', 'ArtistSkill.id', 'ArtistSkill->artist_skill.id'],
        attributes: {
            exclude: ['created_at', 'updated_at', 'user_id', 'logo_id', 'artist_type_id']
        }
    }).then(artist => {
        if (!artist[0]) {
            res.sendStatus(404);
            return;
        }
        res.send(artist[0]);

    }).catch(err => {
        global.logger(err);
        res.sendStatus(500);
    })
});

// Create New Artist
router.post('/:userId', (req, res, next) => {
    db.user.findOne({
        where: {
            id: Helper.decrypt(req.params.userId)
        }
    }).then(user => {
        if (!user) {
            res.sendStatus(404);
            return;
        }
        db.artist.findOrCreate({
            where: {
                user_id: Helper.decrypt(req.params.userId)
            }, defaults: {
                // Set other body values
                name: req.body.name,
                slug: req.body.name,
                location: req.body.location,
                description: req.body.description,
                gender: req.body.gender,
                user_id: user.dataValues.id,
                artist_type_id: req.body.artistTypeId
            }
        }).spread((artist, created) => {
            if (!created) {
                res.sendStatus(409);
                return;
            }
            res.status(201).send(artist);
        });
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
