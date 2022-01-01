var express = require('express');
var nckulib = require('nckulib');
var router = express.Router();
///////////////////////////////////////////////////////////////////////
const slugify = (...args) => import('@sindresorhus/slugify').then(({ default: slugify }) => slugify(...args));
var md = require('markdown-it')()
  .use(require('markdown-it-sub'))
  .use(require('markdown-it-sup'))
  .use(require('markdown-it-footnote'))
  .use(require('markdown-it-deflist'))
  .use(require('markdown-it-abbr'))
  .use(require('markdown-it-emoji'))
  .use(require('markdown-it-container'), 'spoiler', {
    //use example
    validate: function (params) {
      return params.trim().match(/^spoiler\s+(.*)$/);
    },

    render: function (tokens, idx) {
      var m = tokens[idx].info.trim().match(/^spoiler\s+(.*)$/);

      if (tokens[idx].nesting === 1) {
        // opening tag
        return '<details><summary>' + md.utils.escapeHtml(m[1]) + '</summary>\n';

      } else {
        // closing tag
        return '</details>\n';
      }
    }
  })
  .use(require('markdown-it-ins'))
  .use(require('markdown-it-mark'))
  .use(require('markdown-it-texmath'), {
    engine: require('katex'),
    delimiters: 'dollars',
    katexOptions: { macros: { "\\RR": "\\mathbb{R}" } }
  })
  .use(require('markdown-it-attrs'), {
    // optional, these are default options
    leftDelimiter: '{',
    rightDelimiter: '}',
    allowedAttributes: ['id', 'class', /^regex.*$/]
  })
  .use(require('markdown-it-anchor'), { slugify: s => slugify(s) })
  .use(require('markdown-it-task-lists'), { label: true, labelAfter: true });
var randomstring = require("randomstring");//use with markdown~~
var replaceall = require("replaceall");
///////////////////////////////////////////////

const numberArray = require('number-array');

var excelDB = require('../models/excelDB');
var ji = require('../models/JournalInformation');
var least = require('../models/least');
var docs = require('../models/docs');

/* GET home page. */
router.get('/', function (req, res, next) {
  least.frontend((stuff) => {
    //console.log(c);console.log(numberArray(c));
    res.render('index', {
      title: '成大數學系圖書館',
      functionButtonMainText1: '新書入庫',
      functionButtonMainText2: '期刊服務',
      functionButtonMainText3: '館際合作',
      functionButtonMainText4: '電子資源',
      browseHyperlinkedObjectsHorizontally1T: '成大首頁',
      browseHyperlinkedObjectsHorizontally2T: '數學系網站',
      browseHyperlinkedObjectsHorizontally3T: '成大總圖',
      browseHyperlinkedObjectsHorizontally1L: 'https://www.ncku.edu.tw/',
      browseHyperlinkedObjectsHorizontally2L: 'http://www.math.ncku.edu.tw/',
      browseHyperlinkedObjectsHorizontally3L: 'https://www.lib.ncku.edu.tw/',
      pc: numberArray(stuff.c),
      ps: req.query.page ? stuff.s.slice(parseInt(req.query.page) * 4, (parseInt(req.query.page) + 1) * 4) : stuff.s.slice(0 * 4, (0 + 1) * 4),
      margin: parseInt(req.query.page, 10) || 0
    });
  });
});

router.get('/editmd', function (req, res, next) {
  res.render('md', {
    title: '文字編輯',
    topic: '最新消息',
    topic_small: '新增'
  });
});

router.post('/editmd', function (req, res, next) {
  var result = md.render(req.body.usrinpt);
  res.render('mdRaw', {
    title: 'mdRaw-html',
    VARformdtest: replaceall("[object Promise]", String(randomstring.generate()), String(result))
  });
});

router.get('/journals', function (req, res, next) {
  res.render('dashboard', {
    title: '成大數學系圖書館',
    isUSER: 'yes',
    jjsonURL: (req.query.alpha) ? ("/jjson?alpha=" + req.query.alpha) : "/jjson",
    a2z: genCharArray('A', 'Z'),
    alpha: req.query.alpha || '0'
  });
});

router.get(('/newbooks'), function (req, res, next) {
  //////////////////////////這一段是從main.js copy來的/////////////////////////////////////
  excelDB.getMAXChansuNoJunban('newbooksdb', (VARcountClass) => {
    excelDB.arrayAllClass('newbooksdb', (listallid, listallname) => {
      var innerHTMLofLlistSTRING = "";
      if (listallid.length === listallname.length) {
        var LL = listallid.length;
        for (let index = 0; index < LL; index++) {
          var ELEid = listallid[index];
          var ELEname = listallname[index];
          innerHTMLofLlistSTRING = innerHTMLofLlistSTRING + `
<a class="item" id="${ELEid}" href="/newbooks?pageid=${ELEid}">${ELEname}</a>
`;
        }
      } else {
        innerHTMLofLlistSTRING = "<h1>[ERROR] DB Sequence length does not match!</h1>";
      }
      //這裡有一段是這裡新加的
      excelDB.getPayloadById('newbooksdb', req.query.pageid, (thistopic, HTMLpayload) => {
        res.render('excel', {
          title: 'newbooks',
          VARcountClassJade: parseInt(VARcountClass, 10) + 1,
          innerHTMLofLlist: innerHTMLofLlistSTRING,
          VARdbname: "this_is_a_user",
          isADMIN: false,
          PUGVARHTMLpayload: HTMLpayload,
          topicORwait2load: thistopic
        });
      });//在說你啦
    });
  });
  /////////////////////////////////////////////////////////////////////////////////
});

router.get('/jjson', function (req, res, next) {
  console.log(req.query.alpha);
  if (req.query.alpha) {

    ji.getByNameStartFormat(req.query.alpha, (d) => {
      ///////////區間複製起點
      res.status(200).json({
        "total": d.length,
        "totalNotFiltered": d.length,
        "rows": d
      });
      ///////////區間複製宗典
    });
  } else {
    ji.getAllFormat((d) => {/*
  
      var rowsDATA = [];
      d.forEach(element => {
        var tmpobj = {};
        tmpobj.placeNumber = element.frameNumber;
        tmpobj.issn = element.ISSN;
        tmpobj.mainName = element.bookName;
        tmpobj.stat = element.STAT;
        tmpobj.eSource = element.ES;
        tmpobj.pSource = element.PS;
        tmpobj.datas = element.Volume;
        tmpobj.someStuff = element.REMK;
        tmpobj.existTime = element.LIVstart;
        tmpobj.updateTime = element.new_date;
        rowsDATA.push(tmpobj);
  
      });*/

      res.status(200).json({
        "total": d.length,
        "totalNotFiltered": d.length,
        "rows": d/*rowsDATA*//*[
  
          {
            "placeNumber": "a",
            "issn": "b",
            "mainName": "c",
            "stat": "d",
            "eSource": "e",
            "pSource": "f",
            "datas": "g",
            "someStuff": "h",
            "updateTime": "i",
            "existTime": "j"
          },
          {
            "placeNumber": "a",
            "issn": "b",
            "mainName": "c",
            "stat": "d",
            "eSource": "e",
            "pSource": "f",
            "datas": "g",
            "someStuff": "h",
            "updateTime": "i",
            "existTime": "j"
          },
        ]*/
      });
    });
  }

});

router.get('/inner', function (req, res, next) {
  if (req.query.ic === 'l') {
    least.getById(req.query.pid, ro => {
      if (ro) {
        docs.getById(ro.uri, html => {
          if (html) {
            res.render('docx', {
              title: 'inner',
              infoClass: "最新消息",
              infoDT: String(ro.YYYY) + '年' + String(ro.M) + '月' + String(ro.D) + '日' + String(ro.h) + '時' + String(ro.mm) + '分',
              infoID: ro.uri + '@' + `/inner?id=${ro.uri}&pid=${ro.id}&ic=l`,//flex string copy from index.pug search in code "詳全文" 之href
              infoOther: ro.ab,//TODO標籤化
              urls: null,//TODO添加近期URL
              ttp: "最新消息",//公告
              tp: ro.tp,
              alpha: { txt: "回上一頁", uri: `/` },
              moment: require('moment'),
              dbhtml: html,
              ISuser: false,
              ProntEndBeautificationRendering: true
            });
          } else {
            res.status(404).send("404 not found");
          }
        }
        );
      } else {
        res.status(404).send("404 not found");
      }
    });
  } else {
    res.status(404).send("404 not found");
  }
  /*docs.getById(req.query.id, html => {
    if (html) {
      res.render('docx', {
        title: 'inner',
        infoClass: req.query.ic,
        infoDT: req.query.dt,
        infoID: req.query.pid,
        infoOther: req.query.ab,//TODO標籤化
        urls: null,//TODO添加近期URL
        ttp: req.query.ic,//公告
        tp: req.query.tp,
        alpha: { txt: "回上一頁", uri: `/${req.query.rt}` },
        moment: require('moment'),
        dbhtml: html
      });
    } else {
      res.status(404).send("404 not found");
    }
  }
  );*/
});


router.get('/interlibraryCooperation', function (req, res, next) {

  res.render('docx', {
    title: 'interlibraryCooperation',
    ExternalLargeButtonName: "外部連結",
    urls: null,//TODO添加近期URL
    ttp: "成大數學系圖書館",//公告
    tp: "館際合作服務",
    alpha: { txt: "回首頁", uri: `/` },
    moment: require('moment'),
    //dbhtml: html,
    ISuser: false,
    ProntEndBeautificationRendering: true
  });

});


module.exports = router;

function genCharArray(charA, charZ) {
  var a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
  for (; i <= j; ++i) {
    a.push(String.fromCharCode(i));
  }
  return a;
}
