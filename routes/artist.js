let express = require('express');
let router = express.Router();

const ArtistController = require('../Controllers/ArtistController');
const ArtistAuth = require('./auth/artist');
const AdminAuth = require('./auth/admin');

const BankDetailsAPI = require('./bankdetails');
const ArtistGenreAPI = require('./artist_genre');
const ArtistSkillAPI = require('./artist_skill');
const AudioAPI = require('./audio');
const VideoAPI = require('./video');
const RatingAPI = require('./rating');

router.get('/', [AdminAuth], (req, res, next) => {
    ArtistController.getAllArtists(req).then(data => {
        res.send(data);
    }).catch(err => next(err));
});

router.get('/:slug', (req, res, next) => {
    ArtistController.getArtistPublicProfile(req).then(artist => {
        res.send(artist);
    }).catch(err => next(err));
});

// Create New Artist
router.post('/:userId', [ArtistAuth], (req, res, next) => {
    ArtistController.createNewArtist(req).then(artistResult => {
        res.send(artistResult);
    }).catch(err => next(err));
});

router.use('/:slug/bankdetails', BankDetailsAPI);
router.use('/:slug/genres', ArtistGenreAPI);
router.use('/:slug/skills', ArtistSkillAPI);
router.use('/:slug/audios', AudioAPI);
router.use('/:slug/videos', VideoAPI);
router.use('/:slug/ratings', RatingAPI);

router.post('/:slug/logo', [ArtistAuth], (req, res, next) => {
    ArtistController.uploadImage(req).then(() => {
        res.sendStatus(201);
    }).catch(err => next(err));
});

module.exports = router;
