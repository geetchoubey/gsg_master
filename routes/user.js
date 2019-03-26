var express = require('express');
var router = express.Router();

const AdminAuth = require('./auth/admin');

const UserController = require('../Controllers/UserController');
const boom = require('boom');

const stringConstants = require('../Constants/APIMessages');

router.get('/:id', AdminAuth, function (req, res, next) {
    UserController.getUserProfile(req).then(user => {
        if (!user) {
            res.sendStatus(404);
            return;
        }
        res.send(user);
    });
});

router.post('/login', (req, res, next) => {
    UserController.loginUser(req).then(user => {
        if (user === null) {
            next(boom.notFound(stringConstants.user.email_not_found));
        }
        if (user === false) {
            return next(boom.unauthorized(stringConstants.user.wrong_password));
        }
        res.send(user);

    }).catch(err => {
        global.logger(err);
        next(boom.internal(err));
    });
});

router.post('/register', (req, res, next) => {
    UserController.createUser(req).then(result => {
        if (!result) {
            return next(boom.conflict(stringConstants.user.already_exists));
        }
        res.status(201).send(result);
    }).catch(err => {
        global.logger(err);
        next(boom.internal(err));
    });
});

router.post('/reset_password/:id', (req, res, next) => {
    UserController.updatePassword(req).then(result => {
        if (result === null) return next(boom.notFound(stringConstants.user.not_found));
        res.sendStatus(200);
    }).catch(err => {
        global.logger(err);
        next(boom.internal(err));
    });
});

router.get('/reset_password/:id', (req, res, next) => {
    UserController.checkPasswordResetToken(req).then(user => {
        if (!user) {
            return next(boom.badRequest(stringConstants.token.invalid_password_reset_token));
        }
        res.sendStatus(200);
    });
});

router.post('/reset_password', (req, res, next) => {
    UserController.initiatePasswordResetProcess(req).then(user => {
        if (!user) return next(boom.notFound(stringConstants.user.not_found));
        res.sendStatus(200);
    }).catch(err => {
        global.logger(err);
        next(boom.internal(err));
    });
});

router.get('/verify/:id/:token', (req, res, next) => {
    UserController.verifyProfile(req).then(verified => {
        if (verified) return res.sendStatus(200);
        return next(boom.badRequest(stringConstants.token.invalid_verification_link));
    });
});

module.exports = router;
