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
module.exports.addswipe_edit = function (newexcelData, callback) {
    newexcelData.save(callback);
};

