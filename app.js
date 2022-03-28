var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var RateLimit = require('express-rate-limit');
var session = require('express-session');
var randomstring = require("randomstring");
const { body, validationResult } = require('express-validator');
const robots = require('express-robots-txt');
var minifyHTML = require('express-minify-html-2');
var flash = require('connect-flash');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var debug = require('debug')('libraryofficialwebsite:app');

var limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 60 * 1000 * 1000 //1000*1000/1sec max
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mainRouter = require('./routes/main');
var toolRouter = require('./routes/tool');
var uploadRouter = require('./routes/upload');

var app = express();
var expressWs = require('express-ws')(app);
//console.log(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json({ limit: 10485760 }));//rest-payload-10mb-max
app.use(express.urlencoded({ extended: false, limit: 10485760 }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));
// Handle Sessions
app.use(session({
  secret: randomstring.generate(100),
  saveUninitialized: true,
  resave: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(limiter);
require('express-file-logger')(app, {
  showOnConsole: false,
  bodyDetails: false
})//express log to file
app.use(minifyHTML({
  override: true,
  exception_url: false,
  htmlMinifier: {
    removeComments: true,
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    removeAttributeQuotes: true,
    removeEmptyAttributes: true,
    minifyJS: true
  }
}));


app.use(function (req, res, next) {
  console.log('middleware');
  req.testing = 'testing';
  next();
});

app.ws('/websocket', function (ws, req) {
  console.log("🚀 ~ file: app.js ~ line 130 ~ req", req)
  ws.on('message', function (msg) {
    //Create a table
    const ws_income_msg = [
      { ws_income_msg: String(msg) }];

    //print
    printTable(ws_income_msg);
    ws.send("李栗栗好可愛");
  });
  console.log('socket', req.testing);
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/main', mainRouter);
app.use('/tool', toolRouter);
app.use('/upload', uploadRouter);
app.use(robots({
  UserAgent: '*',
  Disallow: ['/users/login', '/main'],//allow every things
  CrawlDelay: '5',
  Sitemap: 'https://library.math.ncku.edu.tw/sitemap.xml',
}))

//get/post
app.get('*', function (req, res, next) {
  //console.log((!req.user) ? "[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[nouser]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]" : req.user);
  res.locals.user = req.user || null;
  next();
});

app.post(
  '/user',
  body('username').isEmail(),
  body('password').isLength({ min: 5 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.create({
      username: req.body.username,
      password: req.body.password,
    }).then(user => res.json(user));
  },
);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
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

debug('started app');

module.exports = app;

/*TODO
package json sort按字母排序
*/