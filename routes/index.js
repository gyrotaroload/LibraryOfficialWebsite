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
var mammoth = require("mammoth");//main
var multer = require('multer');
const storage = multer.memoryStorage();
var upload = multer({ storage: storage, limits: { /*fields: 1, */fileSize: 6000000, files: 1/*, parts: 2 */ } });

var excelDB = require('../models/excelDB');

/* GET home page. */
router.get('/', function (req, res, next) {
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

router.post('/docx'/*, ensureAuthenticated*/, upload.single('docxPayload'), function (req, res, next) {
  console.log(typeof (req.body.docxPayload));
  var content = req.file.buffer;
  mammoth.convertToHtml({ buffer: content }, {
    convertImage: mammoth.images.imgElement(function (image) {
      return image.read("base64").then(function (imageBuffer) {
        return {
          src: "data:" + image.contentType + ";base64," + imageBuffer
        };
      });
    }),
  })
    .then(function (result) {
      var html = result.value; // The generated HTML
      var messages = result.messages; // Any messages, such as warnings during conversion
      console.log(html);
      console.log(messages);
    })
    .done();
});

router.get('/docx', function (req, res, next) {
  res.render('docx', {
    title: 'docx upload'
  });
});

module.exports = router;
