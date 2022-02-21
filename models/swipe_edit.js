const { Binary } = require('mongodb');
var mongoose = require('mongoose');

var swipe_editSchema = mongoose.Schema({
    new_date: {
        type: Date
    },
    topic: {
        type: String
    },
    txt: {
        type: String
    },
    btons: {
        type: Array
    },
    pic: {
        type: String
    },
    ChansuNoJunban: {//排序
        type: Number
    }
});

//export JournalInformation schema
var swipe_edit = module.exports = mongoose.model('swipe_edit', swipe_editSchema);

//function
module.exports.addswipe_edit = function (newexcelData, callback) {//這只是一個別名，跟excel沒關係
    newexcelData.save(callback);
};

module.exports.getList = function (callback) {
    const filter = {};
    swipe_edit.find(filter).sort({ ChansuNoJunban: 'descending' }).exec((err, SearchResult) => {
        if (err) {
            console.log("======================");
            console.log(err);
            console.log("======================");
        }
        callback(SearchResult);
    });
};
