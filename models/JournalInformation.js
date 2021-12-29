var mongoose = require('mongoose');

var JournalInformationSchema = mongoose.Schema({
    //Boolean
    new_date: {//?
        type: Date
    },
    frameNumber: {
        type: String
    },
    ISSN: {
        type: String
    }, bookName: {
        type: String
    },
    STAT: {
        type: String
    },
    ES: {
        type: String
    },
    PS: {
        type: String
    },
    Volume: {
        type: String
    },
    REMK: {
        type: String
    },
    eissn: {
        type: String
    },
    LIVstart: {
        type: Number
    },
    LIVend: {
        type: Number
    },
    LIVx: {
        type: Array
    },
    history: {
        type: Array
    },
    LIrange: {
        type: Array
    }
});

//export JournalInformation schema
var JournalInformation = module.exports = mongoose.model('JournalInformation', JournalInformationSchema);

//function
module.exports.addJournal = function (newPersonal, callback) {
    newPersonal.save(callback);
}

module.exports.getAll = function (callback) {
    var ft = {};
    JournalInformation.find(ft).sort({ frameNumber: 'descending' }).exec((err, SearchResult) => {
        if (err) {
            console.log(err);

        }//TODO:error handle
        callback(SearchResult);
    });
}

module.exports.getByNameStart = function (headALPHA, callback) {
    var ft = null;
    if (headALPHA === "1") {//現勘
        ft = { STAT: { $eq: '現刊' } };
    } else if (headALPHA === "2") {//電子
        ft = { ES: { $ne: '無' } };
    } else if (headALPHA === "3") {//紙本
        ft = { PS: { $ne: '無' } };
    } else {
        ft = { bookName: { $regex: "^" + headALPHA, $options: 'i' } };
    }
    JournalInformation.find(ft).sort({ frameNumber: 'descending' }).exec((err, SearchResult) => {
        if (err) {
            console.log(err);

        }//TODO:error handle
        callback(SearchResult);
    });
}

module.exports.getAllFormat = function (callback) {
    JournalInformation.getAll((d) => {
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
            tmpobj.existTime = `起始:${element.LIVstart};終止:${element.LIVend};停定年分(負面表列):${element.LIVx};`;
            tmpobj.updateTime = element.new_date;
            tmpobj.eissn = element.eissn;
            rowsDATA.push(tmpobj);
        });
        callback(rowsDATA);
    });
}

module.exports.getByYear = function (callback) {


}

module.exports.getByNameStartFormat = function (headALPHA, callback) {
    JournalInformation.getByNameStart(headALPHA, (d) => {
        ///////////////////////////////////////copy start/////////////////////////
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
            tmpobj.existTime = `起始:${element.LIVstart};終止:${element.LIVend};停定年分(負面表列):${element.LIVx};`;
            tmpobj.updateTime = element.new_date;
            tmpobj.eissn = element.eissn;
            rowsDATA.push(tmpobj);
        });
        callback(rowsDATA);
        ///////////////end of copy//////////////////////
    });

}