let express = require('express');
let router = express.Router();

const AdminAuth = require('./auth/admin');

const UserController = require('../Controllers/UserController');


router.get('/:id', AdminAuth, function (req, res, next) {
    UserController.getUserProfile(req).then(user => {
        res.send(user);
    }).catch(err => next(err));
});

router.post('/login', (req, res, next) => {
    UserController.loginUser(req).then(user => {
        res.send(user);
    }).catch(err => next(err));
});

router.post('/register', (req, res, next) => {
    UserController.createUser(req).then(result => {
        res.status(201).send(result);
    }).catch(err => next(err));
});

router.post('/reset_password/:id', (req, res, next) => {
    UserController.updatePassword(req).then(result => {
        res.sendStatus(200);
    }).catch(err => next(err));
});

router.get('/reset_password/:id', (req, res, next) => {
    UserController.checkPasswordResetToken(req).then(user => {
        res.sendStatus(200);
    }).catch(err => next(err));
});

router.post('/reset_password', (req, res, next) => {
    UserController.initiatePasswordResetProcess(req).then(user => {
        res.sendStatus(200);
    }).catch(err => next(err));
});

router.get('/verify/:id/:token', (req, res, next) => {
    UserController.verifyProfile(req).then(verified => {
        res.sendStatus(200);
    }).catch(err => next(err));
});

module.exports = router;
