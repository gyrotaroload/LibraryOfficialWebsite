var INframeNumber;
var INISSN;
var INbookName;
var INSTAT;
var INES;
var INPS;
var INVolume;
var INREMK;
var INLIVstart;
var INLIVend;
var INLIVx;

document.getElementById('submit').addEventListener('click', function () {
    INframeNumber = document.getElementById('frameNumber').value;
    INISSN = document.getElementById('ISSN').value;
    INbookName = document.getElementById('bookName').value;
    INSTAT = document.getElementById('STAT').value;
    INES = document.getElementById('ES').value;
    INPS = document.getElementById('PS').value;
    INVolume = document.getElementById('Volume').value;
    INREMK = document.getElementById('REMK').value;
    INLIVstart = document.getElementById('LIVstart').value;
    INLIVend = document.getElementById('LIVend').value;
    INLIVx = document.getElementById('LIVx').value;
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
    console.log("<-dats");
    $.post("/main/add_periodical", {
        frameNumber: INframeNumber,
        ISSN: INISSN,
        bookName: INbookName,
        STAT: INSTAT,
        ES: INES,
        PS: INPS,
        Volume: INVolume,
        REMK: INREMK,
        LIVstart: INLIVstart,
        LIVend: INLIVend,
        LIVx: INLIVx
    }, (res) => {
        //empty
    });
});

function DOCE(e) {
    //console.log(e.srcElement.value);
    var selectvalue = e.srcElement.value;
    if (selectvalue) {
        var selindex = parseInt(selectvalue);
        var ops = e.target.getElementsByTagName('option');
        for (let index = 0; index < ops.length; index++) {
            const element = ops[index];
            if (element.value === String(selindex)) {
                document.getElementById('STAT').value = element.innerText;
            }
        }
        //document.getElementById('STAT').value = e.target.getElementsByTagName('option')[parseInt(selectvalue)].innerText;
    }
}

document.getElementById('isbnjson').addEventListener('click', function () {
    console.log("isbnjson");
    $.post("/tool/isbn2json", {
        //TODO:沒有做例外處理
        isbn: document.getElementById('ISSN').value
    }, (res) => {
        if (res) {
            if (res.book_name) {
                document.getElementById('bookName').value = res.book_name;
            } else {
                console.log("無法取得書名");
            }
            if (res.book_info_s) {
                var book_info_s = res.book_info_s;
                for (let index = 0; index < book_info_s.length; index++) {
                    const element = book_info_s[index];
                    if (element.stor_loc) {
                        if (element.stor_loc.includes("總圖")) {
                            document.getElementById('Volume').value = element.stor_loc + '&#8227;' + element.stor_s;
                        } else if (element.stor_loc.includes("數學系")) {
                            document.getElementById('PS').value = element.stor_loc + '&#8227;' + element.stor_s;
                        } else {
                            console.log(`${element.stor_loc}館藏地不屬數學系或總圖`);
                        }
                    }
                }
            } else {
                console.log("無法取得書籍資料");
            }
        } else {
            console.error("與總圖書館通聯時發生錯誤!");
        }
    });
});

