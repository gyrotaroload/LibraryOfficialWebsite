var mongoose = require('mongoose');

var ghSchema = mongoose.Schema({
    dt: {//?
        type: Date
    },
    bts: {
        type: Array
    },
    docid: {
        type: Number
    }
});

//export JournalInformation schema
var gh = module.exports = mongoose.model('gh', ghSchema);

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

module.exports.getConvenient = function (callback) {

    gh.find({}).sort({ dt: 'descending' }).exec((err, SearchResult) => {
        if (err) {
            console.log(err);
        }
        callback(
            {
                b: SearchResult.bts,
                d: SearchResult.docid
            });
    });


}

module.exports.SETinnerdocID = function (id, uri, callback) {
    gh.findById(id, function (err, contact) {
        if (!err) {
            if (contact) {
                console.log(contact.tp);
                contact.docid = uri;
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