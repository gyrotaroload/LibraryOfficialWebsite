//TODOindx要設定可以搜尋
var express = require('express');
var router = express.Router();
var generator = require('character-generator');
const { Base64 } = require('js-base64');

var mammoth = require("mammoth");//main
var multer = require('multer');
const storage = multer.memoryStorage();
var upload = multer({ storage: storage, limits: { /*fields: 1, */fileSize: 52428800/*50M我猜 */, files: 1/*, parts: 2 */ } });

var DEF_DEBUG = true;

var JournalInformation = require('../models/JournalInformation');
var excelDB = require('../models/excelDB');
var swipe_edit = require('../models/swipe_edit');
var least = require('../models/least');
var docs = require('../models/docs');


router.get('/', ensureAuthenticated, function (req, res, next) {
    //Person.getPersonal(req.user.username, function (err, Personget) {
    //if (err) throw err;
    //PostTmp.getPostTmp(req.user.username, function (err2, PostTmpget) {
    //if (err2) throw err2;
    //Medal.getEXP(glob_user_obj.username, function (err3, goal) {
    //Middatatmp.getMiddatatmp(req.user.username, function (err3, Middatatmpget) {
    //if (err3) throw err3;
    //res.status(200).send(String(goal));
    //console.log("------------------------------------------------>>>>>>>>>>>>>>>" + PostTmpget);
    res.render('main', {
        title: 'old_friends',
        var_jade_user_info_name: `${req.user.name}`,
        var_jade_user_info_username: `${req.user.username}`,
        var_jade_user_info_profileimage: `${req.user.profileimage}`,
        //var_jade_user_info_choosedanimal: `${(!Personget) ? '-1' : Personget.animal}`,
        var_use_old_jquery: true,
        //var_app_PostTmp_get_pooptmmp: `${PostTmpget.post_tmp}`,
        //var_app_PostTmp_get_poop_img_sel_tmmp: `${PostTmpget.post_img_select_tmp}`,
        var_jade_err_msg_show: false,
        var_jade_error_msg_gui_text_1: "X",
        var_jade_error_msg_gui_text_2: "X",
        //var_jade_onsleep_stat: `${(!Personget) ? "-1" : (Personget.is_sleep) ? "yes" : "no"}`,
        //var_jade_user_exp_css: (!Middatatmpget) ? "width: calc(var(--var_vw)*25*0/100);" : (!Middatatmpget.tmp_to_set) ? "width: calc(var(--var_vw)*25*0/100);" : `width: calc(var(--var_vw)*25*${JSON.parse(Middatatmpget.tmp_to_set).exp_data_tmp}/100);`,
        //var_jade_user_lv_txt: `LV${(!Middatatmpget) ? "0" : (!Middatatmpget.tmp_to_set) ? "0" : JSON.parse(Middatatmpget.tmp_to_set).goal_data_4_tmp}`
    });
});
//});
//});
//});

router.get('/add_periodical', ensureAuthenticated, function (req, res, next) {
    res.render('add_periodical', {
        title: 'add_periodical',
        var_jade_user_info_name: `${req.user.name}`,
        var_jade_user_info_username: `${req.user.username}`,
        var_jade_user_info_profileimage: `${req.user.profileimage}`,
        var_use_old_jquery: true,
        var_jade_err_msg_show: false,
        var_jade_error_msg_gui_text_1: "X",
        var_jade_error_msg_gui_text_2: "X",
        EDITframeNumber: (req.query.EDITframeNumber) ? Base64.decode(req.query.EDITframeNumber) : "",
        EDITISSN: (req.query.EDITISSN) ? Base64.decode(req.query.EDITISSN) : "",
        EDITbookName: (req.query.EDITbookName) ? Base64.decode(req.query.EDITbookName) : "",
        EDITeissn: (req.query.EDITeissn) ? Base64.decode(req.query.EDITeissn) : "",
        EDITSTAT: (req.query.EDITSTAT) ? Base64.decode(req.query.EDITSTAT) : "",
        EDITES: (req.query.EDITES) ? Base64.decode(req.query.EDITES) : "",
        EDITPS: (req.query.EDITPS) ? Base64.decode(req.query.EDITPS) : "",
        EDITREMK: (req.query.EDITREMK) ? Base64.decode(req.query.EDITREMK) : "",
        EDITLIVstart: (req.query.EDITLIVstart) ? Base64.decode(req.query.EDITLIVstart) : "",
        EDITLIVend: (req.query.EDITLIVend) ? Base64.decode(req.query.EDITLIVend) : "",
        EDITLIVx: (req.query.EDITLIVx) ? Base64.decode(req.query.EDITLIVx) : ""
        , id: req.query.id || "", modeAE: (req.query.id) ? "編輯" : "新增"
    });
});

router.post('/add_periodical', ensureAuthenticated, function (req, res, next) {
    var INframeNumber = req.body.frameNumber;
    var INISSN = req.body.ISSN;
    var INbookName = req.body.bookName;
    var INSTAT = req.body.STAT;
    var INES = req.body.ES;
    var INPS = req.body.PS;
    var INVolume = req.body.Volume;
    var INREMK = req.body.REMK;
    var INLIVstart = req.body.LIVstart;
    var INLIVend = req.body.LIVend;
    var INLIVx = req.body.LIVx;
    var INeissn = req.body.eissn;
    var INhistory = [];
    console.log("dats->");
    console.log(INframeNumber);
    console.log(INISSN);
    console.log(INSTAT);
    console.log(INES);
    console.log(INPS);
    console.log(INVolume);
    console.log(INREMK);
    console.log(INLIVstart);
    console.log(INLIVend);
    console.log(INLIVx);

    /*var DEFAULTframeNumber = 'Z99999';
    var DEFAULTISSN = '12345-678910';
    var DEFAULTSTAT = '現刊';
    var DEFAULTES = 'WTF...';
    var DEFAULTPS = 'WTF...';
    var DEFAULTVolume = 'WTF...';
    var DEFAULTREMK = '沒有備註';
    var DEFAULTLIVstart = 1997;
    var DEFAULTLIVend = 2020;
    var DEFAULTLIVx = [2001, 2002];
    var DEFAULThistory = [];*/
    var INLIVxARRAY;
    var INLIVxARRAYfailed = false;
    try {
        INLIVxARRAY = JSON.parse('[' + INLIVx + ']');
    } catch (error) {
        INLIVxARRAYfailed = true;
    }

    var LIrangeNext = false;
    if (typeof DEFAULTLIVstart == 'number') {
        LIrangeNext = true;
    } else {
        console.log('[400 error] DEFAULTLIVstart is not a number');
    }
    if (typeof DEFAULTLIVend == 'number') {
        LIrangeNext = true;
    } else {
        console.log('[400 error] DEFAULTLIVend is not a number');
    }
    var LIrange = [];
    if (LIrangeNext) {
        LIrange = range(DEFAULTLIVstart, DEFAULTLIVend, 1);
        array.forEach((element, ind) => {

        });
    } else {
        LIrange = [];
    }

    JournalInformation.gethis(req.body.id, (stuff) => {

        JournalInformation.del(req.body.id, (stuff2) => {

            var newJournalInformation = new JournalInformation({
                new_date: Date.now(),
                frameNumber: INframeNumber,
                ISSN: INISSN,
                bookName: INbookName,
                STAT: INSTAT,
                ES: INES,
                PS: INPS,
                Volume: INVolume,
                REMK: INREMK,
                LIVstart: /*parseInt(*/INLIVstart/*, 10)*/,
                LIVend: /*parseInt(*/INLIVend/*, 10)*/,
                LIVx: INLIVxARRAY,
                eissn: INeissn,
                history: stuff || INhistory
            });
            JournalInformation.addJournal(newJournalInformation, function (err) {
                if (err) {
                    console.log(err);
                    res.status(404).send("fail");
                } else if (INLIVxARRAYfailed) {
                    res.status(404).send("fail");
                } else {
                    res.status(200).send("success");
                }
            });

        });

    });



});

router.post('/excel', ensureAuthenticated, function (req, res, next) {
    var INexcelHTML = req.body.excelHTML;
    var INbatabaseClass = req.body.batabaseClass;
    var INtopic = req.body.topic;
    var INChansuNoJunban = req.body.ChansuNoJunban;

    var newexcelDB = new excelDB({
        new_date: Date.now(),
        batabaseClass: INbatabaseClass,
        topic: INtopic,
        payload: INexcelHTML,
        ipaddress: req.ip,
        ChansuNoJunban: INChansuNoJunban
    });
    excelDB.addexcelData(newexcelDB, function (err) {
        if (err) {
            console.log(err);
            res.status(500).send("fail - database save error");
        } else {
            res.status(200).send("success");
        }
    });
});

router.get(('/addNewBooks'), ensureAuthenticated, function (req, res, next) {
    excelDB.getMAXChansuNoJunban('newbooksdb', (VARcountClass) => {
        excelDB.arrayAllClass('newbooksdb', (listallid, listallname) => {
            var innerHTMLofLlistSTRING = "";
            if (listallid.length === listallname.length) {
                var LL = listallid.length;
                for (let index = 0; index < LL; index++) {
                    var ELEid = listallid[index];
                    var ELEname = listallname[index];
                    innerHTMLofLlistSTRING = innerHTMLofLlistSTRING + `
    <a class="item" id="${ELEid}">
    <button class="circular ui icon button" onclick="$.post('/main/excelTransferOrder', { targetID: '${ELEid}', PLUSorMINSorDEL: 2 }, (res) => { if (res==='F5') {location.reload();}else{$('.ui.basic.modal').modal('show');/*錯誤宣告*/} });">
    <i class="icon arrow up"></i></button><!--備註:上升箭號在index是下降，反之亦然，logic do it in onclick js-->
    <button class="circular ui icon button" onclick="$.post('/main/excelTransferOrder', { targetID: '${ELEid}', PLUSorMINSorDEL: 1 }, (res) => { if (res==='F5') {location.reload();}else{$('.ui.basic.modal').modal('show');/*錯誤宣告*/} });">
    <i class="icon arrow down"></i></button>
    <button class="circular ui icon button" onclick="$.post('/main/excelTransferOrder', { targetID: '${ELEid}', PLUSorMINSorDEL: 3 }, (res) => { if (res==='F5') {location.reload();}else{$('.ui.basic.modal').modal('show');/*錯誤宣告*/} });">
    <i class="icon trash alternate"></i></button>
    <h6 class="ui block header" onclick=" window.open('/newbooks?pageid=${ELEid}', '_blank');">${ELEname}</h6></a>
    `;
                }
            } else {
                innerHTMLofLlistSTRING = "<h1>[ERROR] DB Sequence length does not match!</h1>";
            }
            res.render('excel', {
                title: 'excel',
                VARcountClassJade: parseInt(VARcountClass, 10) + 1,
                innerHTMLofLlist: innerHTMLofLlistSTRING,
                VARdbname: "newbooksdb",
                isADMIN: true,
            });
        });
    });
});

router.post('/excelTransferOrder', ensureAuthenticated, function (req, res, next) {
    var TID = req.body.targetID;
    var PMDwtf = req.body.PLUSorMINSorDEL;//1or2or3
    var PMD = parseInt(PMDwtf, 10);//他進來竟然是字串，傻眼
    if (PMD === 1) {
        excelDB.MODFup(TID, () => { res.status(202).send("F5"); });
    } else if (PMD === 2) {
        excelDB.MODFdn(TID, () => { res.status(202).send("F5"); });
    } else if (PMD === 3) {
        excelDB.delById(TID, () => { res.status(202).send("F5"); });
    } else {
        res.status(400).send("Illegal data manipulation!");
    }
});


router.get('/swipeEDIT', ensureAuthenticated, function (req, res, next) {
    res.render('swipeEDIT', {
        title: 'swipeEDIT'
    });
});

router.get('/journals', ensureAuthenticated, function (req, res, next) {
    res.render('dashboard', {
        title: '成大數學系圖書館',
        isUSER: 'no',
        jjsonURL: "/jjson",
        a2z: generator('@', ['A-Z']),
        alpha: '0'
    });
});

router.get('/delJ', ensureAuthenticated, function (req, res, next) {
    JournalInformation.del(req.query.id, (stuff) => {
        res.status(200).send(stuff);
        //TODO[對使用者不友善]如過錯了不會有提醒
    });
});

router.get('/infoJ', ensureAuthenticated, function (req, res, next) {
    JournalInformation.gethis(req.query.id, (stuff) => {
        res.status(200).send(stuff);
    });
});
router.get('/docxUpload', ensureAuthenticated, function (req, res, next) {
    res.render('docx_upload', {
        title: 'docx upload 2',
        moment: require('moment')
    });
});

router.post('/addleast', ensureAuthenticated, function (req, res, next) {
    //console.log(req.body);
    var newobj = new least({
        new_date: Date.now(),
        YYYY: req.body.YYYY,
        M: req.body.M,
        D: req.body.D,
        h: req.body.h,
        mm: req.body.mm,
        tp: req.body.tp,
        ab: req.body.ab,
        lab: JSON.parse(req.body.labels).label,
        uri: req.body.uri
    });
    least.add(newobj, function (r) {
        if (r) {
            res.status(200).send(r.id);
        } else {
            //console.log(err);
            res.status(404).send("fail");
        }
    });

});

router.post('/docx', ensureAuthenticated, upload.single('docxPayload'), function (req, res, next) {
    //console.log(typeof (req.body.docxPayload));
    /*
    說明
    這裡跟img一點關西都沒有
    概念:
    前端上傳doc檔案至後台
    後台傳html回給前台
    */
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
            //console.log(html);
            // console.log(messages);
            return { sol_html: html, sol_messages: messages };
        })
        .done((sol) => {
            var no = new docs({
                dt: Date.now(),
                html: sol.sol_html
            });
            docs.add(no, function (r) {
                if (r) {
                    sol.id = r.id;
                    res.status(200).send(sol);
                } else {
                    sol.id = null;
                    //console.log(err);
                    res.status(404).send(sol);
                }
            });
        });
});

router.get('/docx', ensureAuthenticated, function (req, res, next) {
    res.render('docx', {
        title: 'docx upload',
        infoClass: req.query.ic,
        infoDT: Date.now(),
        infoID: req.query.id,
        infoOther: "編輯模式",
        labSW: "點我!",
        urls: null,
        ttp: "編輯",//公告
        tp: "按下右側「上傳」按鈕以上傳docx檔案",
        alpha: { txt: "提交", uri: `/main/link?lid=${req.query.id}&` },
        moment: require('moment')
    });
});

router.get('/link', ensureAuthenticated, function (req, res, next) {
    least.SETuri(req.query.lid, req.query.docid, r => {
        if (r === 'yes') {
            res.status(200).send("success");
        }
        else {
            res.status(404).send("failed");
        }
    })
});

router.get('/interlibraryCooperation', ensureAuthenticated, function (req, res, next) {
    res.render('EDITinterlibraryCooperation', {
        title: 'EDITinterlibraryCooperation',
        var_jade_user_info_name: `${req.user.name}`,
        var_jade_user_info_username: `${req.user.username}`,
        var_jade_user_info_profileimage: `${req.user.profileimage}`,
        var_use_old_jquery: true,
        var_jade_err_msg_show: false,
        var_jade_error_msg_gui_text_1: "X",
        var_jade_error_msg_gui_text_2: "X",
    });
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        console.error("@routes/main.js Authenticated faild")
        res.redirect('/users/login');
    }
}

module.exports = router;

// functions...
var range = function (start, end, step) {
    var range = [];
    var typeofStart = typeof start;
    var typeofEnd = typeof end;

    if (step === 0) {
        throw TypeError("Step cannot be zero.");
    }

    if (typeofStart == "undefined" || typeofEnd == "undefined") {
        throw TypeError("Must pass start and end arguments.");
    } else if (typeofStart != typeofEnd) {
        throw TypeError("Start and end arguments must be of same type.");
    }

    typeof step == "undefined" && (step = 1);

    if (end < start) {
        step = -step;
    }

    if (typeofStart == "number") {

        while (step > 0 ? end >= start : end <= start) {
            range.push(start);
            start += step;
        }

    } else if (typeofStart == "string") {

        if (start.length != 1 || end.length != 1) {
            throw TypeError("Only strings with one character are supported.");
        }

        start = start.charCodeAt(0);
        end = end.charCodeAt(0);

        while (step > 0 ? end >= start : end <= start) {
            range.push(String.fromCharCode(start));
            start += step;
        }

    } else {
        throw TypeError("Only string and number types are supported");
    }

    return range;

}
