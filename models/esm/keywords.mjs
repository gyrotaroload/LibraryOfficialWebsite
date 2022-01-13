import { readSync } from 'to-vfile'
import { toString } from 'nlcst-to-string'
import { retext } from 'retext'
import retextPos from 'retext-pos'
import retextKeywords from 'retext-keywords'
function a(callback) {
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
        callback('ok')
      })
    })
}
export default { a }