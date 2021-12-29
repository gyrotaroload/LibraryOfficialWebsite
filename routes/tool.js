var express = require('express');
var nckulib = require('nckulib');
const textToImage = require('text-to-image');
var text2png = require('text2png');
const fontList = require('font-list');
const sharp = require('sharp');
var router = express.Router();

router.post('/isbn2json', function (req, res, next) {
    nckulib.isbn_to_json(req.body.isbn, (ok) => {
        if (ok) {
            res.status(200).send(ok);
        } else {
            res.status(510).send("An error occurred in the communication with the general library, please contact the relevant technical staff to eliminate the error.");
        }
    });
});

router.get('/mosbjt', function (req, res, next) {//for fun not important
    res.render('mosbjt', {});
});

router.get('/t2i', function (req, res, next) {
    // using the asynchronous API with .then
    /*textToImage.generate('Lorem ipsum dolor sit amet', {
        debug: true,
        maxWidth: 720,
        fontSize: 18,
        fontFamily: 'Georgia, serif',
        lineHeight: 30,
        fontPath:"./helvetica.ttf",
        margin: 5,
        bgColor: 'blue',
        textColor: 'red',
      }).then(function (dataUri) {
        var data = dataUri;
        console.log(dataUri);
        var img = Buffer.from(data, 'base64');
*/
    /*fontList.getFonts()
        .then(fonts => {
            //console.log(fonts);
            var tf = "";
            var regExp = /[a-zA-Z]/g;
            if (fonts.includes('sans-serif')) {
                tf = 'sans-serif';
            } else {
                for (let index = 0; index < fonts.length; index++) {
                    const element = fonts[index];
                    if (element.includes('"')||/[^a-zA-Z]/.test(element)) {
//no thing
                    } else {
                        tf = element;
                    }
                }
            }
console.log(tf);*/
    var img = text2png(req.query.txt, {
        color: 'blue', font: '70px Montserrat',
        localFontPath: 'Montserrat-Bold.ttf',
        localFontName: 'Montserrat'
    });
    sharp(img)
        .resize({
            width: 200,
            height: 200,
            fit: sharp.fit.contain, background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .toFormat('png')
        .toBuffer()
        .then(data => {
            res.writeHead(200, {
                'Content-Type': 'image/png',
                'Content-Length': data.length,
            });
            res.end(data);
        });

    /* })
     .catch(err => {
         console.log(err)
     });*/

    /* });*/

});

module.exports = router;
