document.getElementById('submit').addEventListener('click', function () {
    $.post("/main/add_periodical", {
        a: 123
    }, (res) => {
        //empty
    });
});

function DOCE(e) {
    //console.log(e.srcElement.value);
    var selectvalue = e.srcElement.value;
    if (selectvalue) {
        var selindex = parseInt(selectvalue);
        var ops = e.target.getElementsByTagName('option');
        for (let index = 0; index < ops.length; index++) {
            const element = ops[index];
            if (element.value === String(selindex)) {
                document.getElementById('STAT').value = element.innerText;
            }
        }
        //document.getElementById('STAT').value = e.target.getElementsByTagName('option')[parseInt(selectvalue)].innerText;
    }
}