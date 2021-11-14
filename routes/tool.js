var express = require('express');
var nckulib = require('nckulib');
var router = express.Router();

router.post('/isbn2json', function (req, res, next) {
    nckulib.isbn_to_json(req.body.isbn,(ok) => {
        if(ok){
        res.status(200).send(ok);}else{
            res.status(510).send("An error occurred in the communication with the general library, please contact the relevant technical staff to eliminate the error.");
        }
    });
});

module.exports = router;
