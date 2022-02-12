var mongoose = require('mongoose');
/*sn: '123',
  osn: '123',
  provider: '1',
  c: '清單',
  Textafterexternallinkother: '1',
  yPublished_External: '1',
  mPublished_External: '1',
  dPublished_External: '1',
  Remarks_External: '1',
  urle: 'http://aqwertyuikl.345678.com',
  submit2: '送出
  
   {
  no: '23',
  name: '123qwe',
  url: 'https://github.com/andythebreaker/2020arduino.git',
  submit: '送出'
}

*/
var e2Schema = mongoose.Schema({
    new_date: {
        type: Date
    },
    sn: {
        type: Number
    },
    osn: {
        type: String
    },
    provider: {
        type: String
    },
    c: {
        type: String
    },
    Textafterexternallinkother: {
        type: String
    },
    yPublished_External: {
        type: String
    },
    mPublished_External: {
        type: String
    },
    dPublished_External: {
        type: String
    },
    Remarks_External: {
        type: String
    },
    urle: {
        type: String
    },
});

//export JournalInformation schema
var e2 = module.exports = mongoose.model('e2', e2Schema);

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
    e2.find({}).sort({ sn: 1 }).exec((err, SearchResult) => {
        if (err) {
            console.log(err);
        }
        callback(SearchResult);
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