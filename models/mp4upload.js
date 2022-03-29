var mongoose = require('mongoose');

var mp4Schema = mongoose.Schema({
    date_time: {
        type: Date
    },
    file_name: {
        type: String
    },
    file_extension: {
        type: String
    },
    file_dir: {
        type: String
    },
    custom_video_title: {
        type: String
    },
    custom_video_info: {
        type: String
    },
    custom_video_id: {
        type: String
    }
    , support_resolution: {
        type: Array
    }, file_size: {
        type: Number
    }
    , data: {
        type: Buffer
    }, file_size_pretty: { type: String }
});

//export JournalInformation schema
var mp4in = module.exports = mongoose.model('mp4in', mp4Schema);

//function
module.exports.warehousing = function (incomeJSON, callback) {
    var nobj = new mp4in({
        incomeJSON
    });
    console.log("🚀 ~ file: mp4upload.js ~ line 43 ~ nobj", nobj)
    nobj.save((e, r) => {
        if (e) {
            console.log(e);
            callback(null);
        } else {
            callback(r);
        }
    });
}


module.exports.delall = function (cb) { mp4in.deleteMany({}, callback) }
