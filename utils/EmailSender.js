const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

// When playing with Handlebars in pro-mode
var options = {
  viewEngine: {
    extname: '.hbs',
    layoutsDir: 'templates/layouts',
    defaultLayout: 'base',
    partialsDir: 'templates/partials/'
  },
  viewPath: 'templates',
  extName: '.hbs'
};

// Create folder in project root directory
// When playing with Handlebars with NO IDEA
/*var options = {
  viewPath: 'templates',
  extName: '.hbs'
};*/

const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER_ID,
    pass: process.env.EMAIL_PASSWORD
  }
});

transport.use('compile', hbs(options));

exports.sendEmail = (to, subject, templateName, context) => {
  const mailOptions = {
    from: 'geet@getsetgig.com', // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    template: templateName,
    context: context
  };

  return new Promise((resolve, reject) => {
      transport.sendMail(mailOptions, (err, info) => {
        if (err) return reject(err);
        resolve(info);
      });
  });
};

// Usage ->
/*router.get('/email', (req, res, next) => {
  Email.sendEmail('geet@getsetgig.com', 'TestSubject', 'test', {
    title: 'Geet',
    body: 'Choubey'
  }, (err, result) => {
  if (!err)
    return res.send(result);
  return res.sendStatus(400);
  });
});*/
