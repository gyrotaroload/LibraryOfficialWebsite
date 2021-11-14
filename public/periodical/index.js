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
    INbookName=document.getElementById('bookName').value;
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
        bookName:INbookName,
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