var mongoose = require('mongoose');

var JournalInformationSchema = mongoose.Schema({
    //Boolean
    new_date: {//?
        type: Date
    },
    frameNumber: {
        type: String
    },
    ISSN: {
        type: String
    },
    STAT: {
        type: String
    },
    ES: {
        type: String
    },
    PS: {
        type: String
    },
    Volume: {
        type: String
    },
    REMK: {
        type: String
    },
    LIVstart: {
        type: Number
    },
    LIVend: {
        type: Number
    },
    LIVx: {
        type: Array
    },
    history: {
        type: Array
    }
});

//export JournalInformation schema
var JournalInformation = module.exports = mongoose.model('JournalInformation', JournalInformationSchema);

//function
module.exports.addJournal = function (newPersonal, callback) {
    newPersonal.save(callback);
}

/*module.exports.setPersonalgetup_time = function (user_name, getup_time, callback) {
    console.log("------->setPersonal");
    var query = { user_name: { $eq: user_name } };
    Personal.findOne(query, function (err, Personget) {
        Personget.getup_time = getup_time;
        Personget.save()
    })
    callback()
}
module.exports.setPersonalsleep_time = function (user_name, sleep_time, callback) {
    console.log("------->setPersonalsleep_time");
    var query = { user_name: { $eq: user_name } };
    Personal.findOne(query, function (err, Personget) {
        Personget.sleep_time = sleep_time;
        Personget.save()
    })
    callback()
}

module.exports.setPersonalis_sleep = function (user_name, is_sleep, callback) {
    console.log("------->setPersonalis_sleep");
    var query = { user_name: { $eq: user_name } };
    Personal.findOne(query, function (err, Personget) {
        Personget.is_sleep = is_sleep;
        Personget.save()
    })
    callback()
}

module.exports.getPersonal = function (user_name, callback) {
    console.log("------->getPersonal");
    var query = { user_name: { $eq: user_name } };
    Personal.findOne(query, callback)
}

module.exports.deletePersonal = function (user_name, callback) {
    console.log("------->deletePersonal");
    var query = { user_name: { $eq: user_name } };
    Personal.deleteOne(query, callback);
}*/