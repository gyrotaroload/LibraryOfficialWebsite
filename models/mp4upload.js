var mongoose = require('mongoose');

var mp4Schema = mongoose.Schema({
    dt: {
        type: Date
    },
    name: {
        type: String
    },
    ishead: {
        type: Boolean
    },
    isend: {
        type: Boolean
    },
    ism3u8ed: {
        type: Boolean
    },
    data: {
        type: Buffer
    }
    , hash: {
        type: String
    }, instructions: {
        type: String
    }
});

//export JournalInformation schema
var mp4in = module.exports = mongoose.model('mp4in', mp4Schema);

//function
module.exports.warehousing = function (newOBJ, callback) {
    newOBJ.save((e, r) => {
        if (e) {
            console.log(e);
            callback(null);
        } else {
            callback(r);
        }
    });
}

module.exports.getById = function (id, callback) {
    docs.findById(id, function (err, adventure) {
        if (err) {
            console.log(err);
            callback(null);
        } else {
            callback((adventure) ? adventure.html : null);
        }
    });

}

module.exports.isEditAble = function (id, callback) {
    docs.findById(id, function (err, adventure) {
        if (err) {
            console.log(err);
            callback(null);
        } else {
            callback((adventure) ? adventure.editable : null);
        }
    });

}

module.exports.EditTX = function (id, callback) {
    docs.findById({ $eq: id }, function (err, adventure) {
        if (err) {
            console.log(err);
            callback(null);
        } else {
            callback((adventure) ? adventure.edittext : null);
        }
    });

}
