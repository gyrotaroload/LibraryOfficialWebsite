var mongoose = require('mongoose');

var ghSchema = mongoose.Schema({
    dt: {//?
        type: Date
    },
    bts: {
        type: Array
    },
    docid: {
        type: String
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

    gh.find({}).sort({ dt: -1 }).limit(1).exec((err, SearchResult) => {
        if (err) {
            console.log(err);
        }
        console.log(SearchResult);console.log(SearchResult[0].id);console.log(SearchResult[0]._id);
        console.log(SearchResult[0].bts);console.log(SearchResult[0].docid);
        callback(
            {
                b: SearchResult[0].bts,
                d: SearchResult[0].docid
            });
    });
}

module.exports.SETinnerdocID = function (id, uri, callback) {
    console.log(id, uri);
    gh.findById(id, function (err, contact) {
        if (!err) {
            if (contact) {
                console.log(contact.bts);
                contact.docid = uri;
                contact.save(function (err) {
                    if (!err) {
                        console.log("contact " + contact.id + " created at " + contact.createdAt + " updated at " + contact.updatedAt);
                        callback("yes");
                    }
                    else {
                        console.log("Error: could not save contact " + contact.id + "#" + String(err));
                        callback("no");
                    }
                });
            } else { callback("no"); }
        }
    });
}