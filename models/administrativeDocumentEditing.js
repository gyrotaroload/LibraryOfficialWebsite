var mongoose = require('mongoose');

var administrativeDocumentEditingSchema = mongoose.Schema({
    new_date: {
        type: Date
    },
    name: {
        type: String
    },
    doclink: {
        type: String
    },
    uri: {
        type: String
    },
    no: {
        type: Number
    }
});

//export JournalInformation schema
var administrativeDocumentEditing = module.exports = mongoose.model('administrativeDocumentEditing', administrativeDocumentEditingSchema);

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

module.exports.getAll = function (callback) {
    administrativeDocumentEditing.find({}).sort({ no: 1 }).exec((err, SearchResult) => {
        if (err) {
            console.log(err);
        }
        callback({ r: SearchResult, e: err });
    });
}

module.exports.delById = function (MODid, callback) {
    administrativeDocumentEditing.findByIdAndDelete(MODid,(err,doc)=>callback(err,doc));
};