//使用 WebSocket 的網址向 Server 開啟連結
let ws = new WebSocket(`ws://${window.location.hostname}:13030`);

//開啟後執行的動作，指定一個 function 會在連結 WebSocket 後執行
ws.onopen = () => {
    console.log('open connection');
    ws.send(document.getElementById('tkn').innerText);
}

//關閉後執行的動作，指定一個 function 會在連結中斷後執行
ws.onclose = () => {
    console.log('close connection');
}

//接收 Server 發送的訊息
ws.onmessage = event => {
    console.log(event.data)
    if (event.data === "解析失敗!") {
        if (document.getElementById('wslab')) {
            document.getElementById('wslab').innerHTML = `<div class="ui label"><a href="#">解析失敗!</a></div>`;
        }

        //}else if(){
        ////////////////
    } else {
        if (document.getElementById('wslab')) {
            document.getElementById('wslab').innerHTML = '';
            var JSON_parse_event_data = JSON.parse(event.data);
            for (var i = 0; i < JSON_parse_event_data.length; i++) {
                document.getElementById('wslab').innerHTML += `<div class="ui label"><a href="#">${JSON_parse_event_data[i]}</a></div>`;
            }
        }
    }

}

