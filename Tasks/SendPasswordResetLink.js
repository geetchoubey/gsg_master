const EmailSender = require('../utils/EmailSender');
const SMSSender = require('../utils/SMSSender');

module.exports.sendVerificationLinks = async (email, mobile, context) => {
    try {
        await EmailSender.sendEmail(email, 'Password reset link', 'test', context);
    } catch (err) {
        global.logger(err);
    }
    try {
        await SMSSender.sendSMS(`+91${mobile}`, 'A password generation link has been generated and sent to your registered e-mail id');
    } catch (err) {
        global.logger(err);
    }
};