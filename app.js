var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');

var bodyParser = require('body-parser');
var session = require('./routes/session');
var index = require('./routes/index');
var admin = require('./routes/admin/admin');
var library = require('./routes/library/library');
// var sports = require('./routes/sports/sports');
// var student = require('./routes/student/student');
// var teacher = require('./routes/teacher/teacher');

var app = express();

var randomstring = require("randomstring");
var cookieSession = require('cookie-session');
var cookieParser=require('cookie-parser');
app.use(cookieParser());
app.use(cookieSession({
  name: 'rabs',
  secret: randomstring.generate(),
  httpOnly: true, 
  expires:{},//Set expiration date
  maxAge: {},//maxage of session cookie
  secure: false,
  overwrite: false
}));

app.use(function(req, res, next) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next();
})


// view engine setup
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Static content path setup
app.use(express.static(path.join(__dirname, 'public')));

//Set path
app.use('/', index);
app.use('/admin', admin);
app.use('/session', session);
app.use('/library', library);
//app.use('/sports', sports);
//app.use('/student', student);
//app.use('/teacher', teacher);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
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
  res.render('error');
});

module.exports = app;
