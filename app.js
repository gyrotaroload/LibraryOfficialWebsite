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
const SocketServer = require('ws').Server;
const { Base64 } = require('js-base64');
////////////////////////////
var token = require('token');
const jsonwebtoken = require('jsonwebtoken');
var b64a = require('base64-arraybuffer');
var pdf = require('html-pdf');
//////////////////////////////////ws//////////////////////////////////////////
token.defaults.secret = process.env.token_defaults_secret;
token.defaults.timeStep = 5 * 60; //5min
async function verifyJWT(jwt) {
  if (!jwt) {
    return Promise.reject(new Error('No JWT'));
  }
  const decoded = jsonwebtoken.verify(jwt, process.env.token_defaults_secret);
  return decoded;
}


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

///////////////////WS area////////////////////////////
var ws_go = null;
app.myLibrary = function (ws_go_mjs) {
  ws_go = ws_go_mjs;
};
//指定開啟的 port
const PORT13030 = process.env.wsPORT || 13030;

//創建 express 的物件，並綁定及監聽 3000 port ，且設定開啟後在 console 中提示
const server = express()
  .listen(PORT13030, () => console.log(`Listening on ${PORT13030}`))

//將 express 交給 SocketServer 開啟 WebSocket 的服務
const wss = new SocketServer({ server })
//當 WebSocket 從外部連結時執行
wss.on('connection', ws => {

  //連結時執行此 console 提示
  console.log('Client connected')

  //對 message 設定監聽，接收從 Client 發送的訊息
  ws.on('message', data => {
    if (data) {
      try {
        //data 為 Client 發送的訊息，現在將訊息原封不動發送出去
        var dd = Base64.decode(data);
        //debug(dd);
        var sd = JSON.parse(dd);
        //debug(sd);
        var tf = token.verify(sd.id + '|' + sd.role, sd.auth);
        var ht = Base64.decode(sd.id);
        var tm = Base64.decode(sd.role);
        //debug(ht); debug(tm);
        verifyJWT(tm)
          .then(decoded => {
            //console.log(decoded);
            if (tf && decoded.stuff === ht) {
              /*//TODO iat/exp

              ///////////////////////////////////////////////////////////pdf/////////////////////////////////////
              pdf.create(decoded.stuff).toBuffer(function (err, buffer) {
                //console.log('This is a buffer:', b64a.encode(buffer));
                if (!err && Buffer.isBuffer(buffer)) {
                  try {
                    ws.send(b64a.encode(buffer));
                  } catch (error_of_ws) {
                    console.log(error_of_ws);
                  }
                } else {
                  try {
                    ws.send('pdf||');
                  } catch (error_of_ws) {
                    console.log(error_of_ws);
                  }
                  console.log(err);
                }
              });
              ////////////////////////////////////////////////////////////////////////////////////////////////

              var pt = parse(ht);
              translate(pt.text, { to: 'en' }).then(res => {//TODO 翻譯功能要換掉 https://github.com/shikar/NODE_GOOGLE_TRANSLATE/issues/7
                //TypeError: Cannot read property '1' of null
                //Url: https://translate.google.com/_/TranslateWebserverUi/data/batchexecute?rpcids=MkEWBc&f.sid=9118077551142346777&bl=boq_translate-webserver_20220206.16_p0&hl=en-US&soc-app=1&soc-platform=1&soc-device=1&_reqid=4040&rt=c
                //at D:~/code\LibraryOfficialWebsiteNew\LibraryOfficialWebsite\node_modules\translate-google\index.js:179:15
                //at processTicksAndRejections (internal/process/task_queues.js:93:5) {
                //code: 'BAD_NETWORK'
                //}
                debug(res);
                if (res) {

                  kw(res, ka => {
                    translate(ka, { to: 'zh-tw' }).then(restw => {
                      debug(restw);
                      var JSON_stringify_restw_items = restw.Keywords.concat(restw.Keyphrases);
                      debug(JSON_stringify_restw_items);
                      var JSON_stringify_restw_unique = [...new Set(JSON_stringify_restw_items)];
                      try {
                        ws.send(JSON.stringify(JSON_stringify_restw_unique));
                      } catch (error_of_ws) {
                        console.log(error_of_ws);
                      }

                    }).catch(errtw => {
                      console.log(errtw);
                      try {
                        ws.send('解析失敗!');
                      } catch (error_of_ws) {
                        console.log(error_of_ws);
                      }
                    })
                  })
                } else {
                  try {
                    ws.send('解析失敗!');
                  } catch (error_of_ws) {
                    console.log(error_of_ws);
                  }
                }
              }).catch(err => {
                console.log(err);
                try {
                  ws.send('解析失敗!');
                } catch (error_of_ws) {
                  console.log(error_of_ws);
                }
              })
            */} else {
              console.log(decoded.stuff);
              try {
                ws.send(ws_go(decoded.stuff));
              } catch (error_of_ws) {
                console.log(error_of_ws);
              }
            }
          })
          .catch(() => {
            try {
              ws.send('解析失敗!');
            } catch (error_of_ws) {
              console.log(error_of_ws);
            }
          });
      } catch (error) {
        console.log(error);
        try {
          ws.send('解析失敗!');
        } catch (error_of_ws) {
          console.log(error_of_ws);
        }
      }
    } else {
      try {
        ws.send('解析失敗!');
      } catch (error_of_ws) {
        console.log(error_of_ws);
      }
    }
  })

  //當 WebSocket 的連線關閉時執行
  ws.on('close', () => {
    console.log('Close connected')
  })
})
//////////////////////////////////ws//////////////////////////////////////////



module.exports = app;

/*TODO
package json sort按字母排序
*/