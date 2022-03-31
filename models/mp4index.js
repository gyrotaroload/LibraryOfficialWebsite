var mongoose = require('mongoose');

var mp4indexSchema = mongoose.Schema({
    date_time: {
        type: Date
    }, cid: {
        type: String
    },
    name: {
        type: String
    },
    info: {
        type: String
    },
    mustbefinish: {
        type: Boolean
    },
    pub: {
        type: Boolean
    }
});

//export JournalInformation schema
var mp4index = module.exports = mongoose.model('mp4index', mp4indexSchema);

//function
module.exports.add = function (incomeJSON, callback) {
console.log("🚀 ~ file: mp4index.js ~ line 28 ~ incomeJSON", incomeJSON)
    var nobj = new mp4index({
        ...incomeJSON,
        pub: true,//TODO 這裡留了一個欄位可以選擇是否公開影片，並未實作此功能
        date_time: Date.now()
    });
    console.log("🚀 ~ file: mp4upload.js ~ line 43 ~ nobj", nobj)
    nobj.save((e, r) => {
        /**
         * if error occurs, will callback return err-msg, else (aka success) return null
         */
        if (!e) {
            callback(null);
        } else {
            callback(e);
        }
    });
}

module.exports.all = function (callback) {
    const filter = {};
    mp4index.find(filter).sort({ date_time: 'ascending' }).exec((err, SearchResult) => {
        console.log("🚀 ~ file: mp4index.js ~ line 49 ~ mp4index.find ~ SearchResult", SearchResult)
        if (err) {
            console.log(err);
        }
        callback(SearchResult);
    });
};

module.exports.delById = function (MODid, callback) {
console.log("🚀 ~ file: mp4index.js ~ line 59 ~ MODid", MODid)
    mp4index.findByIdAndDelete({ $eq: MODid }, callback);
};
