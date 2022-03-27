#!/usr/bin/env node
'use strict';

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
const { Base64 } = require('js-base64');
const { printTable } = require('console-table-printer');
var token = require('token');
const jsonwebtoken = require('jsonwebtoken');


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
* Express and WebSocket listening on the same port
* https://stackoverflow.com/questions/34808925/express-and-websocket-listening-on-the-same-port/34838031#34838031
*/
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
  //Create a table
  const success_MSG = [
    { success_MSG: `http/ws start success on port ${port}` }];

  //print
  printTable(success_MSG);
});


//當 WebSocket 從外部連結時執行
wss.on('connection', ws => {

  //連結時執行此 console 提示
  console.log('Client connected')

  //對 message 設定監聽，接收從 Client 發送的訊息
  var ws_debug_220328 = true;
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
        ws_debug_BruteForceTest(`var dd = Base64.decode(data);`);
        var try_catch_F_go = true;
        var sd = null;
        try {
          sd = JSON.parse(dd);
        } catch (JSON_parse_error) {
          //Create a table
          const err_msg = [
            { mistake: '148@bin/wwwcopy.mjs', message: String(JSON_parse_error), handled_properly: "You don't need to worry about this error" }];

          //print
          printTable(err_msg);
          try_catch_F_go = false;
        } finally {
          if (try_catch_F_go) {
            ws_debug_BruteForceTest(`sd`);
            var tf = token.verify(sd.id + '|' + sd.role, sd.auth);
            ws_debug_BruteForceTest(`tf`);
            var ht = Base64.decode(sd.id);
            ws_debug_BruteForceTest(`ht`);
            var tm = Base64.decode(sd.role);
            ws_debug_BruteForceTest(`tm`);
            verifyJWT(tm)
              .then(decoded => {
                ws_debug_BruteForceTest(`verifyJWT(tm)            .then(decoded => {`);
                if (tf && decoded.stuff === ht) {
                  ws_debug_BruteForceTest(`decoded.stuff`);
                  try {
                    ws_msg_income_obj.ws_msg_income_obj(decoded.stuff, (the_return_object_of_the_module_that_actually_handles_the_WS) => {
                      ws.send(the_return_object_of_the_module_that_actually_handles_the_WS);
                    });
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
  });

  //當 WebSocket 的連線關閉時執行
  ws.on('close', () => {
    console.log('Close connected');
  });
});


server.on('error', onError);

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
