const boom = require('boom');
const db = require('../AssocationModels');
const verificationTask = require('../Tasks/SendVerificationLink');
const passwordResetTask = require('../Tasks/SendPasswordResetLink');
const Helper = require('../utils/Helper');
const stringConstants = require('../Constants/APIMessages');

module.exports.checkConflicts = async req => {
    let conditions = [];
    if (req.query.email) conditions.push({email: req.query.email});
    if (req.query.mobile) conditions.push({mobile: req.query.mobile});
    if (req.query.slug) conditions.push({slug: req.query.slug});
    let user = await db.user.findOne({
        where: {
            [db.sequelize.Op.or]: conditions
        }
    });
    if (user) throw boom.conflict(stringConstants.artist.already_exists);
};

module.exports.getUserProfile = async req => {
    let user;
    try {
        user = await db.user.findOne({
            include: [{
                model: db.role,
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
        });
    } catch (e) {
        throw boom.internal(stringConstants.general.unknown_error, e);
    }
    if (!user) throw boom.notFound(stringConstants.user.not_found);
    return user;
};

module.exports.createUser = async req => {
    let user = await db.user.findOne({
        where: {
            [db.Sequelize.Op.or]: [
                {
                    email: req.body.email
                }, {
                    mobile: req.body.mobile
                }
            ]
        }
    });
    if (user) throw boom.conflict(stringConstants.user.already_exists);
    let result;
    try {
        await db.sequelize.transaction(async t => {
            result = await db.user.create({
                email: req.body.email,
                mobile: req.body.mobile,
                password: req.body.password,
                role_id: req.body.role_id || 2
            }, {transaction: t});
            await verificationTask.sendVerificationLinks(req);
            return result;
        });
    } catch (e) {
        throw boom.internal(stringConstants.general.unknown_error, e);
    }
    delete result.dataValues.password;
    return result;
};

module.exports.loginUser = async req => {
    let user = await db.user.findOne({
        include: [
            db.role,
            {
                model: db.artist,
                as: 'artist',
                required: false,
                attributes: {
                    exclude: ['user_id', 'created_at', 'updated_at', 'artist_type_id', 'logo_id']
                },
                include: [
                    {
                        model: db.artist_type, as: 'artist_type'
                    }, {
                        model: db.image, as: 'logo'
                    }
                ]
            }
        ],
        where: {
            email: req.body.email
        },
        attributes: {
            exclude: ['created_at', 'updated_at']
        }
    });
    if (!user) throw boom.notFound(stringConstants.user.email_not_found);
    if (Helper.decrypt(user.dataValues.password) === req.body.password) {
        await user.update({
            auth_token: Helper.encrypt(user.dataValues.email)
        });
        delete user.dataValues.password;
        delete user.dataValues.role;
        return user.dataValues;
    } else throw boom.unauthorized(stringConstants.user.wrong_password);
};

module.exports.updatePassword = async req => {
    let user = await this.getUserProfile(req);
    if (!user) throw boom.notFound(stringConstants.user.email_not_found);
    await user.update({
        password: req.body.password
    });
    return true;
};

module.exports.checkPasswordResetToken = async req => {
    let user = await db.user.findOne({
        where: {
            id: Helper.decrypt(Helper.decrypt(req.params.id))
        }
    });
    if (user) return true;
    throw boom.notFound(stringConstants.user.not_found);
};

module.exports.initiatePasswordResetProcess = async (req) => {
    let user = await db.user.findOne({
        where: {
            email: req.body.email
        }
    });
    if (!user) throw boom.notFound(stringConstants.user.not_found);
    await passwordResetTask(user.email, user.mobile);
    return true;
};

module.exports.verifyProfile = async req => {
    let id = Helper.decrypt(req.params.id);
    if (id !== Helper.decrypt(Helper.decrypt(req.params.token)))
        throw boom.badRequest(stringConstants.token.invalid_verification_link);

    let user = await db.user.findOne({
        where: {
            id: id
        }
    });
    if (!user) throw boom.badRequest(stringConstants.token.invalid_verification_link);
    if (user.dataValues.status === 'active') {
        throw boom.conflict(stringConstants.user.already_active);
    }
    await user.update({
        status: 'active'
    });
    return true;
};