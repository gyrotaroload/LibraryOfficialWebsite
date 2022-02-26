const { Binary } = require('mongodb');
var mongoose = require('mongoose');

var swipe_editSchema = mongoose.Schema({
    new_date: {
        type: Date
    },
    topic: {
        type: String
    },
    txt: {
        type: String
    },
    btons: {
        type: Array
    },
    pic: {
        type: String
    },
    ChansuNoJunban: {//排序
        type: Number
    }
});

//export JournalInformation schema
var swipe_edit = module.exports = mongoose.model('swipe_edit', swipe_editSchema);

//function
module.exports.addswipe_edit = function (newexcelData, callback) {//這只是一個別名，跟excel沒關係
    newexcelData.save(callback);
};

module.exports.getList = function (callback) {
    const filter = {};
    swipe_edit.find(filter).sort({ ChansuNoJunban: 'descending' }).exec((err, SearchResult) => {
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

module.exports.MODFdn = function (MODid, callback) {//L側板下降
    if (MODid) {
        //console.log(1);
        var ChansuNoJunban_tmp = -1;
        //console.log(2);
        swipe_edit.findById(MODid, function (err, stuff) {
            //console.log(3);
            if (err) {
                console.log(err);
            }
            ChansuNoJunban_tmp = stuff.ChansuNoJunban;
            //console.log(4);
            //logic:
            if (ChansuNoJunban_tmp - 1 >= 0) {
                //console.log(5);
                const filter = { ChansuNoJunban: { $lt: ChansuNoJunban_tmp } };
                //console.log(6);
                swipe_edit.find(filter).sort({ ChansuNoJunban: 'descending' }).exec((err2, SearchResult) => {
                    //console.log(7);
                    if (err2) {
                        console.log(err2);
                    }
                    //console.log(8);
                    if (SearchResult.length > 0) {
                        //console.log(9);
                        ChansuNoJunban_tmp = SearchResult[0].ChansuNoJunban;
                        //console.log(10);
                        swipe_edit.findByIdAndUpdate(SearchResult[0].id, { $set: { ChansuNoJunban: stuff.ChansuNoJunban } }, {}, () => {
                            //console.log(11);
                            swipe_edit.findByIdAndUpdate(MODid, { $set: { ChansuNoJunban: ChansuNoJunban_tmp } }, {}, callback);
                            //console.log(12);
                        });
                    }
                });
            } else { callback(); }
        });
    }
    else {
        //console.log(13);
        callback();
    }
};

module.exports.MODFup = function (MODid, callback) {//L側板上升
    if (MODid) {
        //console.log(14);
        var ChansuNoJunban_tmp = -1;
        swipe_edit.findById(MODid, function (err, stuff) {
            //console.log(15);
            if (err) {
                console.log(err);
            }
            //console.log(16);
            ChansuNoJunban_tmp = stuff.ChansuNoJunban;
            //console.log(17);
            //logic:
            //if (ChansuNoJunban_tmp - 1 >= 0) {
            const filter = { ChansuNoJunban: { $gt: ChansuNoJunban_tmp } };
            //console.log(18);
            swipe_edit.find(filter).sort({ ChansuNoJunban: 'ascending' }).exec((err2, SearchResult) => {
                //console.log(19);
                if (err2) {
                    console.log(err2);
                }
                //console.log(20);
                if (SearchResult.length > 0) {
                    //console.log(21);
                    ChansuNoJunban_tmp = SearchResult[0].ChansuNoJunban;
                    //console.log(22);
                    swipe_edit.findByIdAndUpdate(SearchResult[0].id, { $set: { ChansuNoJunban: stuff.ChansuNoJunban } }, {}, () => {
                        //console.log(23);
                        swipe_edit.findByIdAndUpdate(MODid, { $set: { ChansuNoJunban: ChansuNoJunban_tmp } }, {}, callback);
                        //console.log(24);
                    });
                } else { callback(); }
            });
            //}
        });
    } else {
        //console.log(25);
        callback();
    }
};