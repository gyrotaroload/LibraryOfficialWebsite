import { readSync } from 'to-vfile';
import { toString } from 'nlcst-to-string';
import { retext } from 'retext';
import retextPos from 'retext-pos';
import retextKeywords from 'retext-keywords';
import { parse } from 'node-html-parser';
var debug = require('debug')('libraryofficialwebsite:ws');
const translate = require('translate-google');
var b64a = require('base64-arraybuffer');
var pdf = require('html-pdf');
const { Base64 } = require('js-base64');
const { printTable } = require('console-table-printer');

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

var ws_msg_income_obj = function ws_msg_income(ws_msg, callback) {
  ws_debug_BruteForceTest(`models/esm/keywordscopy.mjs`);
  console.log(ws_msg);
  pdf.create(ws_msg).toBuffer(function (err, buffer) {
    ws_debug_BruteForceTest(`err`);
    ws_debug_BruteForceTest(`buffer`);
    if (!err && Buffer.isBuffer(buffer)) {
      ws_debug_BruteForceTest(`if (!err && Buffer.isBuffer(buffer)) {`);
      try {
        ws_debug_BruteForceTest(`callback (b64a.encode(buffer));`);
        callback (b64a.encode(buffer));
      } catch (error_of_ws) {
        console.log(error_of_ws);
      }
    } else {
      ws_debug_BruteForceTest(`39@@@} else {`);
      try {
        ws_debug_BruteForceTest(`callback ('pdf||');`);
        callback ('pdf||');
      } catch (error_of_ws) {
        console.log(error_of_ws);
      }
      console.log(err);
    }
    ws_debug_BruteForceTest(`50`);
  });

  ws_debug_BruteForceTest(`var pt = parse(ws_msg);`);
  var pt = parse(ws_msg);
  ws_debug_BruteForceTest(`55`);
  console.log(pt);
  translate(pt.text, { to: 'en' }).then(res => {//TODO 翻譯功能要換掉 https://github.com/shikar/NODE_GOOGLE_TRANSLATE/issues/7
    //TypeError: Cannot read property '1' of null
    //Url: https://translate.google.com/_/TranslateWebserverUi/data/batchexecute?rpcids=MkEWBc&f.sid=9118077551142346777&bl=boq_translate-webserver_20220206.16_p0&hl=en-US&soc-app=1&soc-platform=1&soc-device=1&_reqid=4040&rt=c
    //at D:~/code\LibraryOfficialWebsiteNew\LibraryOfficialWebsite\node_modules\translate-google\index.js:179:15
    //at processTicksAndRejections (internal/process/task_queues.js:93:5) {
    //code: 'BAD_NETWORK'
    //}
    ws_debug_BruteForceTest(`debug(res);`);
    debug(res);
    if (res) {
      ws_debug_BruteForceTest(`if (res) {`);
      kw(res, ka => {
        ws_debug_BruteForceTest(`kw(res, ka => {`);
        translate(ka, { to: 'zh-tw' }).then(restw => {
          debug(restw);
          ws_debug_BruteForceTest(`debug(restw);`);
          var JSON_stringify_restw_items = restw.Keywords.concat(restw.Keyphrases);
          debug(JSON_stringify_restw_items);
          console.log("🚀 ~ file: keywordscopy.mjs ~ line 75 ~ translate ~ JSON_stringify_restw_items", JSON_stringify_restw_items)
          var JSON_stringify_restw_unique = [...new Set(JSON_stringify_restw_items)];
          console.log("🚀 ~ file: keywordscopy.mjs ~ line 77 ~ translate ~ JSON_stringify_restw_unique", JSON_stringify_restw_unique)
          try {
            console.log("🚀 ~ file: keywordscopy.mjs ~ line 80 ~ translate ~ JSON.stringify(JSON_stringify_restw_unique)", JSON.stringify(JSON_stringify_restw_unique))
            callback (JSON.stringify(JSON_stringify_restw_unique));
          } catch (error_of_ws) {
            console.log("🚀 ~ file: keywordscopy.mjs ~ line 83 ~ translate ~ error_of_ws", error_of_ws)
            console.log(error_of_ws);
          }

        }).catch(errtw => {
          console.log("🚀 ~ file: keywordscopy.mjs ~ line 88 ~ translate ~ errtw", errtw)
          console.log(errtw);
          try {
            console.log("🚀 ~ file: keywordscopy.mjs ~ line 91 ~ translate ~ '解析失敗!'", '解析失敗!')
            callback ('解析失敗!');
          } catch (error_of_ws) {
            console.log("🚀 ~ file: keywordscopy.mjs ~ line 93 ~ translate ~ error_of_ws", error_of_ws)
            console.log(error_of_ws);
          }
        })
      })
    } else {
      try {
        console.log("🚀 ~ file: keywordscopy.mjs ~ line 101 ~ translate ~ '解析失敗!'", '解析失敗!')
        callback ('解析失敗!');
      } catch (error_of_ws) {
        console.log("🚀 ~ file: keywordscopy.mjs ~ line 103 ~ translate ~ error_of_ws", error_of_ws)
        console.log(error_of_ws);
      }
    }
  }).catch(err => {
    console.log(err);
    console.log("🚀 ~ file: keywordscopy.mjs ~ line 109 ~ translate ~ err", err)
    try {
      console.log("🚀 ~ file: keywordscopy.mjs ~ line 112 ~ translate ~ '解析失敗!'", '解析失敗!')
      callback ('解析失敗!');
    } catch (error_of_ws) {
      console.log("🚀 ~ file: keywordscopy.mjs ~ line 114 ~ translate ~ error_of_ws", error_of_ws)
      console.log(error_of_ws);
    }
  })
}

function kw(txt, cb) {
  console.log("🚀 ~ file: keywordscopy.mjs ~ line 143 ~ kw ~ txt", txt)
  console.log("🚀 ~ file: keywordscopy.mjs ~ line 121 ~ kw ~ cb", cb)
  retext()
    .use(retextPos) // Make sure to use `retext-pos` before `retext-keywords`.
    .use(retextKeywords)
    .process(txt)
    .then((file) => {
      console.log("🚀 ~ file: keywordscopy.mjs ~ line 128 ~ .then ~ file", file)
      var ka = {};
      // console.log('Keywords:')
      console.log("🚀 ~ file: keywordscopy.mjs ~ line 131 ~ .then ~ ka", ka)
      ka.Keywords = [];
      console.log("🚀 ~ file: keywordscopy.mjs ~ line 133 ~ .then ~ ka.Keywords", ka.Keywords)
      file.data.keywords.forEach((keyword) => {
        console.log("🚀 ~ file: keywordscopy.mjs ~ line 137 ~ file.data.keywords.forEach ~ keyword", keyword)
        ka.Keywords.push(toString(keyword.matches[0].node))
      })

      //console.log()
      //console.log('Key-phrases:')
      ka.Keyphrases = [];
      console.log("🚀 ~ file: keywordscopy.mjs ~ line 142 ~ .then ~ ka.Keyphrases", ka.Keyphrases)
      file.data.keyphrases.forEach((phrase) => {
        console.log("🚀 ~ file: keywordscopy.mjs ~ line 146 ~ file.data.keyphrases.forEach ~ phrase", phrase)
        ka.Keyphrases.push(phrase.matches[0].nodes.map((d) => toString(d)).join(''))
      })
      cb(ka);
      console.log("🚀 ~ file: keywordscopy.mjs ~ line 148 ~ .then ~ ka", ka)
    })
}
export default { ws_msg_income_obj }
