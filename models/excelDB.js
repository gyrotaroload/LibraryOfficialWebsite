var mongoose = require('mongoose');

var excelSchema = mongoose.Schema({
    new_date: {
        type: Date
    },
    batabaseClass: {
        type: String
    },
    topic: {
        type: String
    },
    payload: {
        type: String
    },
    ipaddress: {
        type: String
    },
    ChansuNoJunban: {//排序
        type: Number
    }
});

//export JournalInformation schema
var excelData = module.exports = mongoose.model('excelData', excelSchema);

//function
module.exports.addexcelData = function (newexcelData, callback) {
    newexcelData.save(callback);
};

module.exports.countClass = function (excelclass, callback) {
    var stuf2return = -1;
    const filter = { user_name: { $eq: excelclass } };
    excelData.count(filter, (err, SearchResult) => {
        if (err) {
            console.log(err);
        }
        //stuf2return = SearchResult.length;
        callback(SearchResult);
    });
};

module.exports.arrayAllClass = function (excelclass, callback) {
    const filter = { user_name: { $eq: excelclass } };
    excelData.find(filter).sort({ ChansuNoJunban: 'ascending' }).exec((err, SearchResult) => {
        if (err) {
            console.log(err);
        }
        var RTname = [];
        var RTid = [];
        for (let index = 0; index < SearchResult.length; index++) {
            //TODO如果資料量太大是不是會爆掉
            const element = SearchResult[index];
            RTname.push(element.topic || "[ERROR] DB item is NULL");
            RTid.push(element.id || "[ERROR] DB item is NULL");
        }
        callback(RTid, RTname);
    });
};

module.exports.MODFdn = function (MODid, callback) {
    var ChansuNoJunban_tmp = -1;
    excelData.findById(MODid, function (err, stuff) {
        if (err) {
            console.log(err);
        }
        ChansuNoJunban_tmp = stuff.ChansuNoJunban;
        //logic:
        if (ChansuNoJunban_tmp - 1 >= 0) {
            ChansuNoJunban_tmp = ChansuNoJunban_tmp - 1;
        } else {
            ChansuNoJunban_tmp = 0;
        }
        excelData.findByIdAndUpdate(MODid, { $set: { ChansuNoJunban: ChansuNoJunban_tmp } }, {}, callback);
    });
};
