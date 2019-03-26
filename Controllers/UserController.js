const db = require('../AssocationModels');
const verificationTask = require('../Tasks/SendVerificationLink');
const Helper = require('../utils/Helper');

module.exports.checkConflicts = async req => {
    let conditions = [];
    if (req.query.email) conditions.push({email: req.query.email});
    if (req.query.mobile) conditions.push({mobile: req.query.mobile});
    let user = await db.user.findOne({
        where: {
            [db.sequelize.Op.or]: conditions
        }
    });
    return !!user;
};

module.exports.getUserProfile = async req => {
    let user = await db.user.findOne({
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
    if (!user) return null;
    return user;
};

module.exports.createUser = async req => {
    let result = await db.user.findOrCreate({
        where: {
            [db.sequelize.Op.or]: [
                {
                    email: req.body.email
                }, {
                    mobile: req.body.mobile
                }
            ]
        },
        defaults: {
            email: req.body.email,
            mobile: req.body.mobile,
            password: req.body.password,
            role_id: req.body.role_id || 2
        }
    });
    if (!result[1]) return false;
    delete result[0].dataValues.password;
    try {
        await verificationTask.sendVerificationLinks(req);
    } catch (err) {
        global.logger(err);
    }
    return result[0];
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
    if (!user) return null;
    if (Helper.decrypt(user.dataValues.password) === req.body.password) {
        await user.update({
            auth_token: Helper.encrypt(user.dataValues.email)
        });
        delete user.dataValues.password;
        delete user.dataValues.role;
        return user.dataValues;
    } else return false;
};

module.exports.updatePassword = async req => {
    let user = await this.getUserProfile(req);
    if (!user) return null;
    await user.update({
        password: req.body.password
    });
    return true;
};

module.exports.checkPasswordResetToken = async req => {
    return await db.user.findOne({
        where: {
            id: Helper.decrypt(Helper.decrypt(req.params.id))
        }
    });
};

module.exports.initiatePasswordResetProcess = async (req) => {
    let user = await db.user.findOne({
        where: {
            email: req.body.email
        }
    });
    if (!user) return null;
};

module.exports.verifyProfile = async req => {
    let id = Helper.decrypt(req.params.id);
    if (id !== Helper.decrypt(Helper.decrypt(req.params.token))) return false;

    let user = await db.user.findOne({
        where: {
            id: id
        }
    });
    if (user.dataValues.status === 'active') {
        return false;
    }
    await user.update({
        status: 'active'
    });
    return true;
};