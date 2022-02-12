var express = require('express');
var nckulib = require('nckulib');
var debug = require('debug')('libraryofficialwebsite:router');
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
var jwt = require('jsonwebtoken');
const EXPIRES_IN = 5 * 60 * 1000; // 5*60 sec
const { Base64 } = require('js-base64');
var token = require('token');
///debug(process.env.token_defaults_secret);這裡還沒撙備好
token.defaults.timeStep = 5 * 60; //5min
///////////////////////////////////////////////
const { SitemapStream, streamToPromise } = require('sitemap');
const { createGzip } = require('zlib');
const { Readable } = require('stream');
let sitemap;

const numberArray = require('number-array');
const queryString = require('query-string');

var excelDB = require('../models/excelDB');
var ji = require('../models/JournalInformation');
var least = require('../models/least');
var docs = require('../models/docs');
var gh = require('../models/gh');
var e3 = require('../models/OnCampusElectronicResourceFiles');
var e2 = require('../models/e2');
var e1 = require('../models/e1');


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
  //debug('a');
  var give404 = false;
  var res_render_docx = {};
  var tokenM = randomstring.generate();
  //debug(process.env.token_defaults_secret);
  ///////////////////////////////////////
  function cb() {
    if (give404) {
      res.render('docx', {
        title: '錯誤',
        infoClass: '',
        infoDT: '',
        infoID: '',
        infoOther: '',
        urls: null,
        ttp: "頁面不存在",//公告
        tp: "404 error",
        alpha: { txt: "回首頁", uri: `/` },
        moment: require('moment'),
        dbhtml: '',
        ISuser: false,
        ProntEndBeautificationRendering: true
      });
    } else {
      //res.cookie('token', token, { maxAge: EXPIRES_IN, httpOnly: false });
      var ht = Base64.encode(res_render_docx.dbhtml);
      var tm = Base64.encode(tokenM);
      token.defaults.secret = process.env.token_defaults_secret;
      res_render_docx.tkn = Base64.encode(JSON.stringify({ id: ht, role: tm, auth: token.generate(`${ht}|${tm}`) }));
      res.render('docx', res_render_docx);
    }
  }
  ///////////////////end of res////////////////////////
  if (req.query.ic === 'l') {//這一組if-else(每區)做完要叫cb
    //debug('b');
    least.getById(req.query.pid, ro => {
      if (ro) {
        docs.getById(ro.uri, html => {
          if (html) {
            res_render_docx = {
              // res.render('docx', {//neighbor pairing
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
            }//);//neighbor pairing
            tokenM = jwt.sign({ stuff: html/*aka上方的dbhtml*/ }, process.env.token_defaults_secret, { expiresIn: EXPIRES_IN });
          } else {
            give404 = true;
          }
          //.then(() => { cb(); })
          cb();
        }
        );
      } else {
        give404 = true; cb();
      }
    });
  } else if (req.query.ic === 'g') {
    gh.getConvenient(ro => {
      if (ro) {
        docs.getById(ro.d, html => {
          console.log(ro.d);
          if (html) {
            res_render_docx = {
              //  res.render('docx', {//neighbor pairing
              title: 'interlibraryCooperation',
              ExternalLargeButtonName: "外部連結",
              urls: null,//TODO添加近期URL
              ttp: "成大數學系圖書館",//公告
              tp: "館際合作服務",
              alpha: { txt: "回首頁", uri: `/` },
              moment: require('moment'),
              dbhtml: html,
              ISuser: false,
              ProntEndBeautificationRendering: true,
              External_connection_button_array: ro.b
            }//);//neighbor pairing
            tokenM = jwt.sign({ stuff: html/*aka上方的dbhtml*/ }, process.env.token_defaults_secret, { expiresIn: EXPIRES_IN });
          } else {
            give404 = true;
          }
          //.then(() => { cb(); })
          cb();
        }
        );
      } else {
        give404 = true; cb();
      }
    });
  } else if (req.query.ic === 'es') {
    e2.getById(req.query.pid, ro => {
      var regexes = /\/.+\?/gm;
      var stres = ro.urle;
      var substes = `?`;

      // The substituted value will be contained in the result variable
      var resultes = stres.replace(regexes, substes);

      //console.log('Substitution result: ', result);
      var rq = queryString.parse(resultes);
      var cr = rq.id;
      if (ro && cr === req.query.id) {
        docs.getById(cr, html => {
          if (html) {
            res_render_docx = {
              // res.render('docx', {//neighbor pairing
              title: 'inner',
              infoClass: "電子資源-外部資源清單",
              infoDT: String(ro.yPublished_External) + '年' + String(ro.mPublished_External) + '月' + String(ro.dPublished_External) + '日',
              infoID: cr + '@' + `/inner?id=${cr}&pid=${ro.id}&ic=es`,//flex string copy from index.pug search in code "詳全文" 之href
              infoOther: '由 ' + ro.provider + ' 提供',
              urls: null,//TODO添加近期URL
              ttp: "電子資源-外部資源清單",//公告
              tp: ro.osn,
              alpha: { txt: "回上一頁", uri: `/electronic-resources?tab=1` },
              moment: require('moment'),
              dbhtml: html,
              ISuser: false,
              ProntEndBeautificationRendering: true
            }//);//neighbor pairing
            tokenM = jwt.sign({ stuff: html/*aka上方的dbhtml*/ }, process.env.token_defaults_secret, { expiresIn: EXPIRES_IN });
          } else {
            give404 = true;
          }
          //.then(() => { cb(); })
          cb();
        }
        );
      } else {
        give404 = true; cb();
      }
    });
  } else {
    give404 = true;
    //.then(() => { cb(); })
    cb();
  }
  ////////////////////end of logic///////////////////////

  /*docs.getById(req.query.id, html => {
    if (html) {
      res.render('docx', {
        title: 'inner',
        infoClass: req.query.ic,
        infoDT: req.query.dt,
        infoID: req.query.pid,
        infoOther: req.query.ab,//TOXDO標籤化
        urls: null,//TOXDO添加近期URL
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

router.get('/electronic-resources', function (req, res, next) {
  if (req.query.tab === '1') {
    e2.frontend(r => {
      res.render('https___technext_github_io_product_admin_index_html', {
        title: '電子資源',
        e2: r.s,
        emt: 'tab1',
        ly: r.r
      });
    });
  } else if (req.query.tab === '2') {
    e1.frontend(r => {
      res.render('https___technext_github_io_product_admin_index_html', {
        title: '電子資源',
        e1: r.s,
        emt: 'tab2',
        ly: r.r
      });
    });
  } else {
    e3.frontend(r => {
      res.render('https___technext_github_io_product_admin_index_html', {
        title: '電子資源',
        e3: r.s,
        emt: 'tab0',
        ly: r.r
      });
    });
  }
});

router.get('/sitemap.xml', function (req, res) {
  res.header('Content-Type', 'application/xml');
  res.header('Content-Encoding', 'gzip');
  // if we have a cached entry send it
  if (sitemap) {
    res.send(sitemap)
    return
  }

  try {
    const smStream = new SitemapStream({ hostname: 'https://library-official-website.herokuapp.com' });//TODO change hostname
    const pipeline = smStream.pipe(createGzip())

    // pipe your entries or directly write them.
    //smStream.write({ url: '/page-1/',  changefreq: 'daily', priority: 0.3 })
    //smStream.write({ url: '/page-2/',  changefreq: 'monthly',  priority: 0.7 })
    //smStream.write({ url: '/page-3/'})    // changefreq: 'weekly',  priority: 0.5
    //smStream.write({ url: '/page-4/',   img: "http://urlTest.com" })
    /* or use
    Readable.from([{url: '/page-1'}...]).pipe(smStream)
    if you are looking to avoid writing your own loop.
    */
    smStream.write({ url: '/', changefreq: 'monthly', priority: 1.00 }); smStream.write({ url: '/inner?id=$(__', changefreq: 'monthly', priority: 0.80 }); smStream.write({ url: '/inner?id=61cdf503b346ec72f289aa09&amp;pid=61cdf3d7f75eb35714a35b45&amp;ic=l', changefreq: 'monthly', priority: 0.80 }); smStream.write({ url: '/inner?id=61cdf035f75eb35714a35b30&amp;pid=61cdf00bf75eb35714a35b2c&amp;ic=l', changefreq: 'monthly', priority: 0.80 }); smStream.write({ url: '/inner?id=61cdd3d52245725619503d1d&amp;pid=61cdd3a92245725619503d19&amp;ic=l', changefreq: 'monthly', priority: 0.80 }); smStream.write({ url: '/?page=0', changefreq: 'monthly', priority: 0.80 }); smStream.write({ url: '/?page=1', changefreq: 'monthly', priority: 0.80 }); smStream.write({ url: '/?page=2', changefreq: 'monthly', priority: 0.80 }); smStream.write({ url: '/users/login', changefreq: 'monthly', priority: 0.80 }); smStream.write({ url: '/?page=3', changefreq: 'monthly', priority: 0.64 }); smStream.write({ url: '/?page=4', changefreq: 'monthly', priority: 0.64 }); smStream.write({ url: '/?page=5', changefreq: 'monthly', priority: 0.51 }); smStream.write({ url: '/?page=6', changefreq: 'monthly', priority: 0.51 }); smStream.write({ url: '/?page=7', changefreq: 'monthly', priority: 0.41 }); smStream.write({ url: '/inner?id=undefined&amp;pid=61cce38d2f81b86f4f8381c6&amp;ic=l', changefreq: 'monthly', priority: 0.33 }); smStream.write({ url: '/inner?id=undefined&amp;pid=61cce2e1b19a78ec95b0229c&amp;ic=l', changefreq: 'monthly', priority: 0.33 }); smStream.write({ url: '/inner?id=61cdd3d52245725619503d1d&amp;pid=61cce2861052c1467ce136e5&amp;ic=l', changefreq: 'monthly', priority: 0.33 });

    // cache the response
    streamToPromise(pipeline).then(sm => sitemap = sm)
    // make sure to attach a write stream such as streamToPromise before ending
    smStream.end()
    // stream write the response
    pipeline.pipe(res).on('error', (e) => { throw e })
  } catch (e) {
    console.error(e)
    res.status(500).end()
  }
})

module.exports = router;

function genCharArray(charA, charZ) {
  var a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
  for (; i <= j; ++i) {
    a.push(String.fromCharCode(i));
  }
  return a;
}
