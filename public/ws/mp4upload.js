document.getElementById('checkvidinfo').addEventListener('click', () => {
    let ws = new WebSocket(`ws${(location.protocol !== 'https:') ? '' : 's'}://${window.location.hostname}${window.location.hostname === 'localhost' ? ':5000' : ''}/websocket`);
    //開啟後執行的動作，指定一個 function 會在連結 WebSocket 後執行
    ws.onopen = () => {
        console.log('open connection');
        ws.send({
            name: document.getElementById('This_is_a_well_crafted_film') ? document.getElementById('This_is_a_well_crafted_film') : 'n/a',
            info: document.getElementById('Let_users_know_more_about_the_content_of_the_video') ? document.getElementById('Let_users_know_more_about_the_content_of_the_video') : 'n/a'
        });
    }

    //關閉後執行的動作，指定一個 function 會在連結中斷後執行
    ws.onclose = () => {
        console.log('close connection');
    }

    //接收 Server 發送的訊息
    ws.onmessage = event => {
        console.log(event.data);
    }

    try {
        inp.onchange = async (evt) => {
            const stream = inp.files[0].stream();
            const reader = stream.getReader();
            while (true) {
                const { done, value } = await reader.read();
                if (done) { break; }
                handleChunk(value);
            }
            console.log("all done");
        };
    } catch (error) {
        console.log("This is a bug that doesn't need to be noticed");
        console.log(error);
    }


    function handleChunk(buf) {
        ws.send(buf);
        console.log("received a new buffer", buf.byteLength);
    }
    $('#showfilebton').show();
});

$('#uploadPB').css('width', 87+'%').attr('aria-valuenow', 87).text('87%');