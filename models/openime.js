const { Binary } = require('mongodb');
var mongoose = require('mongoose');

var opentimeSchema = mongoose.Schema({
    new_date: {
        type: Date
    },
    todayONOFF: {
        type: Boolean
    },
    //1
    s1h: {
        type: Number
    },
    s1m: {
        type: Number
    },
    e1h: {
        type: Number
    },
    e1m: {
        type: Number
    },
    p1: {
        type: Boolean
    }
    ,//2
    s2h: {
        type: Number
    },
    s2m: {
        type: Number
    },
    e2h: {
        type: Number
    },
    e2m: {
        type: Number
    },
    p2: {
        type: Boolean
    }
    ,//3
    s3h: {
        type: Number
    },
    s3m: {
        type: Number
    },
    e3h: {
        type: Number
    },
    e3m: {
        type: Number
    },
    p3: {
        type: Boolean
    }
    ,//4
    s4h: {
        type: Number
    },
    s4m: {
        type: Number
    },
    e4h: {
        type: Number
    },
    e4m: {
        type: Number
    },
    p4: {
        type: Boolean
    }
    ,//5
    s5h: {
        type: Number
    },
    s5m: {
        type: Number
    },
    e5h: {
        type: Number
    },
    e5m: {
        type: Number
    },
    p5: {
        type: Boolean
    }
    ,//6
    s6h: {
        type: Number
    },
    s6m: {
        type: Number
    },
    e6h: {
        type: Number
    },
    e6m: {
        type: Number
    },
    p6: {
        type: Boolean
    }
    ,//7
    s7h: {
        type: Number
    },
    s7m: {
        type: Number
    },
    e7h: {
        type: Number
    },
    e7m: {
        type: Number
    },
    p7: {
        type: Boolean
    }
});

//export JournalInformation schema
var opentime = module.exports = mongoose.model('opentime', opentimeSchema);

//function
module.exports.renew = function (tmp, callback) {//這只是一個別名，跟excel沒關係
    tmp.save(callback);
};

module.exports.getList = function (callback) {
    const filter = {};
    opentime.find(filter).sort({ new_date: 'descending' }).exec((err, SearchResult) => {
        if (err) {
            console.log("======================");
            console.log(err);
            console.log("======================");
        }
        callback(SearchResult);
    });
};

module.exports.delById = function (MODid, callback) {//L側板上升
    swipe_edit.findByIdAndDelete(MODid, callback);
};

