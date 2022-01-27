var mongoose = require('mongoose');

var docsSchema = mongoose.Schema({
    //Boolean
    dt: {//?
        type: Date
    },
    html: {
        type: String
    }
});

//export JournalInformation schema
var docs = module.exports = mongoose.model('docs', docsSchema);

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
