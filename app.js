let express = require('express');
let formidable = require('express-formidable');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let history = require('connect-history-api-fallback');

let index = require('./routes/index');

let app = express();

let db = require('./AssocationModels');

db.sequelize.sync(/*{force: true}*/).then(() => {
  global.logger('DB connected');
}).catch(err => {
  global.logger(err);
});

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'html');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use((req, res, next) => {
  if (req.secure) next();
  else res.redirect(307, 'https://' + req.headers.host + req.url);
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(formidable());

app.use('/api', index);

app.use((err, req, res, next) => {
    if (err.isServer) {
        // log the error...
        // probably you don't want to log unauthorized access
        // or do you?
    }
    global.logger(err);
    return res.status(err.output.statusCode).json(err.output.payload);
});

app.use(history());
app.use(express.static(path.join(__dirname, 'build')));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);

function shutDown() {
  db.sequelize.close().then(() => {
    global.logger('Closed DB connection gracefully!!');
  }).catch(err => {
    console.error('Error while closing DB connection\n' + err);
  });
}

module.exports = app;
