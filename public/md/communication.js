document.getElementById('sendmd').addEventListener('click', (event) => {
    event.preventDefault();
    console.log('com...');
    $.post("/editmd", {
        usrinpt: document.getElementsByTagName('textarea')[0].value
    }, (res) => {
        console.log(res);
    });
});