import { readSync } from 'to-vfile'
import { toString } from 'nlcst-to-string'
import { retext } from 'retext'
import retextPos from 'retext-pos'
import retextKeywords from 'retext-keywords'
var debug = require('debug')('libraryofficialwebsite:ws');
const translate = require('translate-google')
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
const SocketServer = require('ws').Server;
const { Base64 } = require('js-base64');
//add new module
var flash = require('connect-flash');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var token = require('token');
const jsonwebtoken = require('jsonwebtoken');
import { parse } from 'node-html-parser';
var b64a = require('base64-arraybuffer');
var pdf = require('html-pdf');
//////////////////////////////////ws//////////////////////////////////////////
/*TODO完成伺服器端優先訊
https://medium.com/enjoy-life-enjoy-coding/javascript-websocket-%E8%AE%93%E5%89%8D%E5%BE%8C%E7%AB%AF%E6%B2%92%E6%9C%89%E8%B7%9D%E9%9B%A2-34536c333e1b */
token.defaults.secret = process.env.token_defaults_secret;
token.defaults.timeStep = 5 * 60; //5min
async function verifyJWT(jwt) {
  if (!jwt) {
    return Promise.reject(new Error('No JWT'));
  }
  const decoded = jsonwebtoken.verify(jwt, process.env.token_defaults_secret);
  return decoded;
}

//指定開啟的 port
const PORT13030 = 13030

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
            console.log(decoded);
            if (tf && decoded.stuff === ht) {//TODO iat/exp

              ///////////////////////////////////////////////////////////pdf/////////////////////////////////////
              pdf.create(decoded.stuff).toBuffer(function (err, buffer) {
                console.log('This is a buffer:', b64a.encode(buffer));
                if (!err && Buffer.isBuffer(buffer)) {
                  ws.send(b64a.encode(buffer));
                } else {
                  console.log(err);
                  ws.send('pdf||');
                }
              });
              ////////////////////////////////////////////////////////////////////////////////////////////////

              var pt = parse(ht);
              translate(pt.text, { to: 'en' }).then(res => {
                debug(res);
                if (res) {

                  kw(res, ka => {
                    translate(ka, { to: 'zh-tw' }).then(restw => {
                      debug(restw);
                      var JSON_stringify_restw_items = restw.Keywords.concat(restw.Keyphrases);
                      debug(JSON_stringify_restw_items);
                      var JSON_stringify_restw_unique = [...new Set(JSON_stringify_restw_items)];
                      ws.send(JSON.stringify(JSON_stringify_restw_unique));

                    }).catch(errtw => {
                      console.log(errtw);
                      ws.send('解析失敗!');
                    })
                  })
                } else {
                  ws.send('解析失敗!');
                }
              }).catch(err => {
                console.log(err);
                ws.send('解析失敗!');
              })
            } else {
              ws.send('解析失敗!');
            }
          })
          .catch(() => {
            ws.send('解析失敗!');
          });
      } catch (error) {
        console.log(error);
        ws.send('解析失敗!');
      }
    } else { ws.send('解析失敗!'); }
  })

  //當 WebSocket 的連線關閉時執行
  ws.on('close', () => {
    console.log('Close connected')
  })
})
//////////////////////////////////ws//////////////////////////////////////////


function kw(txt, cb) {
  retext()
    .use(retextPos) // Make sure to use `retext-pos` before `retext-keywords`.
    .use(retextKeywords)
    .process(txt)
    .then((file) => {
      var ka = {};
      // console.log('Keywords:')
      ka.Keywords = [];
      file.data.keywords.forEach((keyword) => {
        ka.Keywords.push(toString(keyword.matches[0].node))
      })

      //console.log()
      //console.log('Key-phrases:')
      ka.Keyphrases = [];
      file.data.keyphrases.forEach((phrase) => {
        ka.Keyphrases.push(phrase.matches[0].nodes.map((d) => toString(d)).join(''))
      })
      cb(ka);
    })
}
export default { kw }