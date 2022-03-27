#!/usr/bin/env node

/**
 * Random security code generation (please put it at the beginning of the file)
 */
var randomstring = require("randomstring");
process.env.token_defaults_secret = randomstring.generate();
var debug = require('debug')('libraryofficialwebsite:server');
debug(process.env.token_defaults_secret);

/**
 * Module dependencies.
 */
var http = require('http');
const WebSocket = require('ws');
const { Base64 } = require('js-base64');
const { printTable } = require('console-table-printer');
var token = require('token');
const jsonwebtoken = require('jsonwebtoken');
var b64a = require('base64-arraybuffer');
var pdf = require('html-pdf');

/**
 * Custom Dependent Modules
 */
import app from "../app.js";
import ws_msg_income_obj from "../models/esm/keywordscopy.mjs";

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '18787');
app.set('port', port);


////////////////////////////
//const SocketServer = require('ws').Server;
//////////////////////////////////ws//////////////////////////////////////////
//app.myLibrary(ws_msg_income_obj);
//var server = http.createServer(app);

/**
 * Random Security Code Generation Calculation
 */
token.defaults.secret = process.env.token_defaults_secret;
token.defaults.timeStep = 5 * 60; //5min
async function verifyJWT(jwt) {
  if (!jwt) {
    return Promise.reject(new Error('No JWT'));
  }
  const decoded = jsonwebtoken.verify(jwt, process.env.token_defaults_secret);
  return decoded;
}

/**
 * Create HTTP server.
 */
//const server = http.createServer(app);

/**
 * Create WS server.
 */
//let wss = new WebSocket.Server({ clientTracking: true, noServer: true });
//({ server: server });




'use strict';

let WSServer = require('ws').Server;
let server = require('http').createServer();

// Create web socket server on top of a regular http server
let wss = new WSServer({

  server: server
});

// Also mount the app here
server.on('request', app);
/**
 * START ALL server.
 */
server.listen(port, function () {
  console.log(`amazing duo-server listening on 80`);
});

//and also mount the express app ... something like ..
//server.on('request', app); //.. something like that
///////////////////WS area////////////////////////////
//var ws_go = null;
//指定開啟的 port
//const PORT13030 = process.env.wsPORT || 13030;
/*app.myLibrary = {
  port: PORT13030,
  app: express(),
  after_the_goods_enter_the_warehouse_the_processing_modulefunction: function (ws_go_mjs) {
    ws_go = ws_go_mjs;
  }
};*/

//創建 express 的物件，並綁定及監聽 3000 port ，且設定開啟後在 console 中提示
//const server 
//app.myLibrary.app.listen(PORT13030, () => console.log(`WS Listening on ${PORT13030}`));

//將 express 交給 SocketServer 開啟 WebSocket 的服務
/*const wss = new SocketServer({ server ,
  verifyClient: (info, done) => {
    req.session.passport.user(info.req, {}, () => {
      done(info.req.session)
    })
  }});*/
//當 WebSocket 從外部連結時執行
wss.on('connection', ws => {

  //連結時執行此 console 提示
  console.log('Client connected')

  //對 message 設定監聽，接收從 Client 發送的訊息
  var ws_debug_220328 = false;
  function ws_debug_BruteForceTest(params) {
    if (ws_debug_220328) {
      //Create a table
      const err_msg = [
        { ws_debug_220328: String(params) }];

      //print
      printTable(err_msg);
    }
  }
  ws.on('message', data => {
    ws_debug_BruteForceTest(`ws.on('message', data => {`);
    if (data) {
      ws_debug_BruteForceTest(`if (data) {`);
      try {
        ws_debug_BruteForceTest(`try {`);
        //data 為 Client 發送的訊息，現在將訊息原封不動發送出去
        var dd = Base64.decode(data);
        ws_debug_BruteForceTest(dd);
        var try_catch_F_go = true;
        try {

          var sd = JSON.parse(dd);
        } catch (JSON_parse_error) {
          //Create a table
          const err_msg = [
            { mistake: '148@bin/wwwcopy.mjs', message: String(JSON_parse_error), handled_properly: "You don't need to worry about this error" }];

          //print
          printTable(err_msg);
          try_catch_F_go = false;
        } finally {
          if (try_catch_F_go) {
            ws_debug_BruteForceTest(sd);
            var tf = token.verify(sd.id + '|' + sd.role, sd.auth);
            ws_debug_BruteForceTest(tf);
            var ht = Base64.decode(sd.id);
            ws_debug_BruteForceTest(ht);
            var tm = Base64.decode(sd.role);
            ws_debug_BruteForceTest(tm);
            verifyJWT(tm)
              .then(decoded => {
                ws_debug_BruteForceTest(`verifyJWT(tm)            .then(decoded => {`);
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
                  ws_debug_BruteForceTest(decoded.stuff);
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
          } else {
            ws_debug_BruteForceTest('安全隔離');
          }
        }
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




//server.listen(port);

/**
 //////////////// Listen on provided port, on all network interfaces.
 */
server.on('error', onError);
//server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

/*function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}*/
