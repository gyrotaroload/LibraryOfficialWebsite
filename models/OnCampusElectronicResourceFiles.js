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

/*
module.exports.SETuri = function (id, uri, callback) {
    least.findById(id, function (err, contact) {
        if (!err) {
            if (contact) {
                console.log(contact.tp);
                contact.uri = uri;
                contact.save(function (err) {
                    if (!err) {
                        console.log("contact " + contact.id + " created at " + contact.createdAt + " updated at " + contact.updatedAt);
                        callback("yes");
                    }
                    else {
                        console.log("Error: could not save contact " + contact.id);
                        callback("no");
                    }
                });
            } else { callback("no"); }
        }
    });
}

module.exports.getById = function (id, callback) {
    least.findById(id, function (err, adventure) {
        if (err) {
            console.log("可忽略的警告");
            console.log(err);
            callback(null);
        } else {
            callback((adventure) ? adventure : null);
        }
    });
}*/