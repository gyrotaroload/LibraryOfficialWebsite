document.getElementById('checkvidinfo').addEventListener('click', () => {
    let ws = new WebSocket(`ws${(location.protocol !== 'https:') ? '' : 's'}://${window.location.hostname}${window.location.hostname === 'localhost' ? ':5000' : ''}/websocket`);
    //開啟後執行的動作，指定一個 function 會在連結 WebSocket 後執行

    var head_obj_str = JSON.stringify({
        name: document.getElementById('This_is_a_well_crafted_film') ? document.getElementById('This_is_a_well_crafted_film').value : 'n/a',
        info: document.getElementById('Let_users_know_more_about_the_content_of_the_video') ? document.getElementById('Let_users_know_more_about_the_content_of_the_video').value : 'n/a'
    });
    console.log("🚀 ~ file: mp4upload.js ~ line 9 ~ document.getElementById ~ head_obj_str", head_obj_str)
    ws.onopen = () => {
        console.log('open connection');
        //ws.send(head_obj_str);
    }

    //關閉後執行的動作，指定一個 function 會在連結中斷後執行
    ws.onclose = () => {
        console.log('close connection');
    }

    var stream = null;
    var reader = null;
    var file_stream_index = 0;
    //var go_next_block = true;

    function Client_cargo_sequence_self_check(check_index) {
        if (check_index && !isNaN(parseInt(check_index, 10)) && parseInt(check_index, 10) === file_stream_index) {
            return true;
        } else { return false; }
    }

    //接收 Server 發送的訊息
    ws.onmessage = async (event) => {
        console.log(event.data);
        if (Client_cargo_sequence_self_check(event.data)) {

            var { done, value } = await reader.read();
            if (done) {
                console.log("all finish...");
                var tmp_end = JSON.stringify({
                    endindex: file_stream_index
                });

                ws.send(tmp_end);
            } else {
                file_stream_index++;
                handleChunk(value);
            }

        } else {
            console.log("sequence error...");
        }
    }

    try {
        stream = null;
        reader = null;
        file_stream_index = 0;
        go_next_block = true;
        inp.onchange = async (evt) => {
            stream = inp.files[0].stream();
            reader = stream.getReader();
            ws.send(head_obj_str);
            console.log("stream file start...");
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

$('#uploadPB').css('width', 87 + '%').attr('aria-valuenow', 87).text('87%');