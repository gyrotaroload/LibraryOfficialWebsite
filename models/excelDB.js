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
    }
});

//export JournalInformation schema
var excelData = module.exports = mongoose.model('excelData', excelSchema);

//function
module.exports.addexcelData = function (newexcelData, callback) {
    newexcelData.save(callback);
}
