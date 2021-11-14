document.getElementById('submit').addEventListener('click', function () {
    $.post("/main/add_periodical", {
        a: 123
    }, (res) => {
        //empty
    });
});