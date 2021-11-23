$(function () {//start
    function sendstuff(stuff) {
        var formData = new FormData();
        formData.append('docxPayload', stuff);//stuff is a blob
        console.log(typeof (stuff));
        console.log(formData);
        $.ajax({
            url: "/docx",
            data: formData,//do not Place the file directly here!
            type: 'POST',
            contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
            processData: false, // NEEDED, DON'T OMIT THIS
            accepts: {
                text: "text/html"
            },
            //http://blog.twbryce.com/jquery-ajax-callback-method/
            beforeSend: function (xhr) {
                console.log("beforeSend");
            },
            success: function (xhr) {
                console.log("success");
            },
            error: function (xhr) {
                document.getElementById("sol_html").innerText = "資料傳輸錯誤";
            },
            complete: function (xhr) {
                console.log(xhr.responseJSON.sol_html);
                document.getElementById("sol_html").innerHTML = xhr.responseJSON.sol_html;
            },
        });
    }
    var input = document.querySelector('input[type=file]');
    var textarea = document.querySelector('textarea');

    /*function readFile(event) {
        var fileASbuffer = event.target.result;
        console.log(typeof(fileASbuffer));
        sendstuff(fileASbuffer);
    }*/

    ///////////////////////Programming memo///////////////////////////
    //  The block annotations above and below this memo show a technical error
    //  Since the file is a specialized instance of blob
    //  So we don’t have to read the file as an object first, and then insert it into the form
    //  Just give the file to the form
    /////////////////////////end of memo/////////////////////////////

    function changeFile() {
        var file = input.files[0];
        /*var reader = new FileReader();
        reader.addEventListener('load', readFile);
        var wtf = reader.readAsArrayBuffer(file);
        console.log(wtf);*/
        sendstuff(file);
    }

    input.addEventListener('change', changeFile);
});//end