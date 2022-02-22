/////////////////////////////////////重大瑕疵/////////////////////////////////////////////
// 這個檔案我猜應該沒人有用了
// 按:
// https://github.com/gyrotaroload/LibraryOfficialWebsite/search?q=submitBTON
// GitHub - gyrotaroload/LibraryOfficialWebsite: ncku math LibraryOfficialWebsite
// github.com
// 我不確定啦
/////////////////////////////////////////////////////////////////////////////////////////


function submitBTON(/*ns*/) {
    $.post('/main/agh',
        {
            gs: JSON.stringify(gs),
            //ns: ns
        },
        (r) => {
            console.log(r);
            if ($('#TheNextStep').text() === '1') {
                window.location.href = '/main/docx?ic=g&id=' + r;
            }
            else if ($('#TheNextStep').text() === '2') { 
                window.location.href = '/main/editmd?ic=g&id=' + r;
            }
            else if
                ($('#TheNextStep').text() === '3') { console.log(3); }
            else {
                console.log('內容->下一步::未定義');
            }
        })
}