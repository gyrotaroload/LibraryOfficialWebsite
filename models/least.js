var mongoose = require('mongoose');

var leastSchema = mongoose.Schema({
    //Boolean
    new_date: {//?
        type: Date
    },
    YYYY: {
        type: Number
    },
    M: {
        type: Number
    },
    D: {
        type: Number
    },
    h: {
        type: Number
    },
    mm: {
        type: Number
    },
    tp: {
        type: String
    },
    ab: {
        type: String
    },
    lab: {
        type: Array
    },
    uri: {
        type: String
    }
});

//export JournalInformation schema
var least = module.exports = mongoose.model('least', leastSchema);

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
    least.countDocuments({}, function (err, count) {
        //console.log((count - count % 4) / 4);
        least.find({}).sort({ new_date: 'descending' }).exec((err, SearchResult) => {
            if (err) {
                console.log(err);
            }
            //console.log(SearchResult);
            callback(
                {
                    c: count < 4 ? 1 : 1 + (count - count % 4) / 4,
                    s: SearchResult
                });
        });
    });

}

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
            console.log(err);
            callback(null);
        } else {
            callback((adventure) ? adventure : null);
        }
    });
}