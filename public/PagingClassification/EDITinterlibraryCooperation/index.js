$.post('/main/addleast',
    {
        YYYY: $('#YYYY').val(),
        M: $('#M').val(),
        D: $('#D').val(),
        h: $('#h').val(),
        mm: $('#mm').val(),
        tp: $('#tp').val(),
        ab: $('#ab').val(),
        labels: $('#labels').text(),
        uri: '$(__#uri__).val()'
    },
    (r) => {
        console.log(r);
        if ($('#TheNextStep').text() === '1') {
            window.location.href = '/main/docx?ic=l&id=' + r;
        }
        else if ($('#TheNextStep').text() === '2') { console.log(2); }
        else if
            ($('#TheNextStep').text() === '3') { console.log(3); }
        else {
            console.log('內容->下一步::未定義');
        }
    })