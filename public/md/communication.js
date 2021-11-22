document.getElementById('sendmd').addEventListener('click', (event) => {
    event.preventDefault();
    console.log('com...');
    $.post("/editmd", {
        usrinpt: document.getElementsByTagName('textarea')[0].value
    }, (res) => {
        console.log(res);
        var oMyBlob = new Blob([res], { type: 'text/html' }); // the blob
        var MYobjectURL = URL.createObjectURL(oMyBlob);
        window.open(MYobjectURL, "_blank");
    });
});