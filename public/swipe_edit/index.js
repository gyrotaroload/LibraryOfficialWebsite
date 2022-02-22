window.onload = function () {
    f0 = document.getElementById('f0');
    f1 = document.getElementById('f1');
    f2 = document.getElementById('f2');
    f3 = document.getElementById('f3');
    f4 = document.getElementById('f4');
    fn0 = document.getElementById('fn0');
    fn1 = document.getElementById('fn1');
    fn2 = document.getElementById('fn2');
    fn0.addEventListener('click', function (event) {
        event.preventDefault();
        var sobj = JSON.parse(f2.innerText.substring(1).substring(1).substring(1));
        sobj.push(fn1.value, fn2.value);
        f2.innerText = fn0.value.substring(1).substring(1) + ":" + JSON.stringify(sobj);
    });
    f4.addEventListener("click", (event) => {
        console.log("f4");
        $('#fileinput').click();
    });
    f0.addEventListener("click", (event) => {
        console.log("f0");
        $('#btnLoad').click();
    });
};

function dataURItoBlob_copy(dataURI) {
    var byteString = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
}

function reg_to_backend(pic_base64) {
    var blob_tmp = dataURItoBlob_copy(pic_base64);

    var form = $('form')[0]; // You need to use standard javascript object here
    var formData = new FormData(form);
    var topic = document.getElementById('f1').value;
    var txt = document.getElementById('f3').value;
    var btons = document.getElementById('f2').innerText.substring(1).substring(1).substring(1);
    formData.append('pic', blob_tmp);
    formData.append('topic', topic);
    formData.append('txt', txt);
    formData.append('btons', btons);
    formData.append('ChansuNoJunban', parseInt(document.getElementById('CJ').innerText, 10));

    $.ajax({
        url: "/upload/swipe_edit",
        data: formData,
        type: 'POST',
        contentType: false, // NEEDED, DON'T OMIT THIS (requires $ 1.6+)
        processData: false, // NEEDED, DON'T OMIT THIS
        accepts: {
            text: "text/html"
        },
        beforeSend: function (xhr) {
            //empty
        },
        success: function (xhr) {
            //empty
        },
        error: function (xhr) {
            console.log("alert('Ajax request 發生錯誤');");
        },
        complete: function (xhr) {
            var target_new_html = $.parseHTML(xhr.responseText);
            console.log(target_new_html);
            location.reload();
        },
    });
}

function handleFileSelect() {
    if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
        console.log('The File APIs are not fully supported in this browser.');
        return;
    }

    var input = document.getElementById('fileinput');
    if (!input) {
        console.log("Um, couldn't find the fileinput element.");
    } else if (!input.files) {
        console.log("This browser doesn't seem to support the `files` property of file inputs.");
    } else if (!input.files[0]) {
        console.log("Please select a file before clicking 'Load'");
    } else {
        var file = input.files[0];
        var fr = new FileReader();
        fr.onload = function (e) {
            document.getElementById('editor').innerText = fr.result;
            document.getElementById('editor_base64_fin').innerText = "1";
            reg_to_backend(document.getElementById('editor').innerText);
        };
        fr.readAsDataURL(file);
    }
}
