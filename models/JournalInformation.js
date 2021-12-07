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
        }
        callback(SearchResult);
    });
}