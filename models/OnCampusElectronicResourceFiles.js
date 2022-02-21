var mongoose = require('mongoose');
var e3Schema = mongoose.Schema({
    new_date: {
        type: Date
    },
    sn2: {
        type: Number
    },
    osn2: {
        type: String
    },
    provider2: {
        type: String
    },
    c2: {
        type: String
    },
    Textafterexternallinkother2: {
        type: String
    },
    yPublished_External2: {
        type: String
    },
    mPublished_External2: {
        type: String
    },
    dPublished_External2: {
        type: String
    },
    Remarks_External2: {
        type: String
    }, file: {
        type: Buffer
    }, sub: {
        type: String
    }
});

//export JournalInformation schema
var e3 = module.exports = mongoose.model('e3', e3Schema);

//function
module.exports.add = function (newOBJ, callback) {
    newOBJ.save((e, r) => {
        if (e) {
            console.log(e);
            callback(null);
        } else {
            callback(r);
        }
    });
}

module.exports.frontend = function (callback) {
    e3.lastTime(r => {

        e3.find({}).sort({ sn2: 1 }).exec((err, SearchResult) => {
            if (err) {
                console.log(err);
            }
            callback({ s: SearchResult, r: r });
        });
    });
}

module.exports.lastTime = function (callback) {
    e3.find({}).sort({ new_date: -1 }).exec((err, SearchResult) => {
        if (err) {
            console.log(err);
        }
        callback((SearchResult.length > 0) ? SearchResult[0].new_date.getFullYear() : 1997);
    });
}

module.exports.getMaxIndex = function (callback) {
    e3.find({}).sort({ sn: -1 }).exec((err, SearchResult) => {
        if (err) {
            console.log(err);
        }
        callback((SearchResult.length > 0) ? SearchResult[0].sn2 : -1);
    });
}