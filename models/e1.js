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

module.exports.getMaxIndex = function (callback) {
    e1.find({}).sort({ no: -1 }).exec((err, SearchResult) => {
        if (err) {
            console.log(err);
        }
        //console.log(SearchResult[0].no);
        //console.log(SearchResult.length > 0);
        //console.log((SearchResult.length > 0) ? SearchResult[0].no : -1);
        callback((SearchResult.length > 0) ? SearchResult[0].no+1 : -1);
    });
}