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
var e1Schema = mongoose.Schema({
    //Boolean
    new_date: {
        type: Date
    },
    no: {
        type: Number
    },
    name: {
        type: String
    },
    url: {
        type: String
    }
});

//export JournalInformation schema
var e1 = module.exports = mongoose.model('e1', e1Schema);

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
    e1.lastTime(r => {
        e1.find({}).sort({ no: 1 }).exec((err, SearchResult) => {
            if (err) {
                console.log(err);
            }
            callback({ s: SearchResult, r: r });
        });
    });
}
module.exports.lastTime = function (callback) {
    e1.find({}).sort({ new_date: -1 }).exec((err, SearchResult) => {
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