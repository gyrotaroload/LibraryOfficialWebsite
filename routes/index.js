var express = require('express');
var nckulib = require('nckulib');
var router = express.Router();

var excelDB = require('../models/excelDB');

/* GET home page. */
router.get('/', function (req, res, next) {
  excelDB.arrayAllClass('newbooksdb', (stuff1,stuff2) => {
    console.log(stuff1,stuff2);
    console.log('****************************')
  });
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

router.get(('/excel'), function (req, res, next) {
  res.render('excel', {
    title: 'excel'
  });
});

module.exports = router;
