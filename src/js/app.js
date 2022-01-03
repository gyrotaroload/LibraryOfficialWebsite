/*//const translate = require('translate-google')
//var pdf = require('html-pdf');
const streamToBlob = require('stream-to-blob');
var moment = require('moment');
//const { jsPDF } = require("jspdf"); // will automatically load the node version
const linkCheck = require('link-check');


function saveData(blob, filename) {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    var url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
};
var commercialFileName = document.title + ((typeof moment !== 'undefined') ? (`${moment().format('MMMM-Do-YYYY-h-mm-ss-a')}`) : 'could_not_load_current_moment') + '.pdf';
var pdfutils = document.getElementsByClassName("pdfutils");
for (var i = 0; i < pdfutils.length; i++) {
    pdfutils[i].addEventListener('click', async (e) => {
        /////////////////////////VVVVVVVVVVVVVVVVVVVVVVvv
        pdf.create(document.documentElement.outerHTML).toStream(async function (err, stream) {
            const blob = await streamToBlob(stream);
            saveData(blob, commercialFileName);
        });
        var pdf = new jsPDF('p', 'pt', 'a4');
        pdf.addHTML(document.body, function () {
            saveData(pdf.output('Blob'), commercialFileName);
        });

        translate('I speak Chinese', { to: 'zh-cn' }).then(res => {
            console.log(res)
        }).catch(err => {
            console.error(err)
        })
        ////////////////^^^^^^^^^^^^^^^^^^^^^^^^
        linkCheck('http://example.com', function (err, result) {
    if (err) {
        console.error(err);
        return;
    }
    console.log(`${result.link} is ${result.status}`);
});
    });
}
*/


const toString = (...args) => import('nlcst-to-string').then(({ default: toString }) => toString(...args));
const retext = (...args) => import('retext').then(({ default: retext }) => retext(...args));
const retextPos = (...args) => import('retext-pos').then(({ default: retextPos }) => retextPos(...args));
const retextKeywords = (...args) => import('retext-keywords').then(({ default: retextKeywords }) => retextKeywords(...args));


retext()
  .use(retextPos) // Make sure to use `retext-pos` before `retext-keywords`.
  .use(retextKeywords)
  .process(`Interlibrary cooperation

  Books and periodicals not collected in this room can be entrusted to the librarian in this room or transferred from the National Document Delivery Service System (NDDS) by the National Cheng Kung University Graphic and Western Periodicals Team to obtain the required information. Application materials for other libraries should be sent to the main library first, and then to the periodical section of the main library to obtain interlibrary loan books and photocopy materials. (Interlibrary cooperation service is a paid service method that provides resource sharing between libraries. It provides readers with books and periodicals borrowing and photocopying services to exchange availability and effectively maximize the value of the limited resources of each library).
  
  Application Form-Department of Mathematics Library-Agency interlibrary cooperation
  
  Department of Mathematics image to apply for paper and electronic journals, e-books on behalf of the library service
  
  How to get: The application materials should arrive at the library, and the applicant will be notified by email or phone to get the mathematics drawing.
  
  Free service: Academia Sinica inter-library loan, data photocopying
  
  Paid service: Except for the interlibrary loan and material photocopying outside the Academia Sinica, the fees are subject to interlibrary cooperation regulations.`)
  .then((file) => {
    console.log('Keywords:')
    file.data.keywords.forEach((keyword) => {
      console.log(toString(keyword.matches[0].node))
    })

    console.log()
    console.log('Key-phrases:')
    file.data.keyphrases.forEach((phrase) => {
      console.log(phrase.matches[0].nodes.map((d) => toString(d)).join(''))
    })
  })