const EmailSender = require('../utils/EmailSender');
const SMSSender = require('../utils/SMSSender');

module.exports.sendVerificationLinks = async (req) => {
    try {
        await EmailSender.sendEmail(req.body.email, 'Welcome to GetSetGig!', 'test', req.body);
    } catch (err) {
        global.logger(err);
    }
    try {
        await SMSSender.sendSMS(`+91${req.body.mobile}`, 'Welcome to GetSetGig Please click here to verify your mobile number!');
    } catch (err) {
        global.logger(err);
    }
};