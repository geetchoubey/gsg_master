const db = require('../AssocationModels');
const verificationTask = require('../Tasks/SendVerificationLink');

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