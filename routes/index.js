var express = require('express');
var nckulib = require('nckulib');
var router = express.Router();
var MarkdownIt = require('markdown-it');

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
  var md = new MarkdownIt();
  var result = md.render(req.body.usrinpt);
  res.status(200).send(result);
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

module.exports = router;
