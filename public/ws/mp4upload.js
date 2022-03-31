document.getElementById('checkvidinfo').addEventListener('click', () => {
    let ws = new WebSocket(`ws${(location.protocol !== 'https:') ? '' : 's'}://${window.location.hostname}${window.location.hostname === 'localhost' ? ':5000' : ''}/websocket`);
    //開啟後執行的動作，指定一個 function 會在連結 WebSocket 後執行

    var head_obj_str = {
        name: document.getElementById('This_is_a_well_crafted_film') ? document.getElementById('This_is_a_well_crafted_film').value : 'n/a',
        info: document.getElementById('Let_users_know_more_about_the_content_of_the_video') ? document.getElementById('Let_users_know_more_about_the_content_of_the_video').value : 'n/a'
    };
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
    var pro_bar = 0;
    var file_size = null;
    //var go_next_block = true;

    function Client_cargo_sequence_self_check(check_index) {
        if (check_index && !isNaN(parseInt(check_index, 10)) && parseInt(check_index, 10) === file_stream_index) {
            return true;
        } else { return false; }
    }

    function getFileNameWithExt(event) {

        if (!event || !event.target || !event.target.files || event.target.files.length === 0) {
            return;
        }

        const name = event.target.files[0].name;
        const lastDot = name.lastIndexOf('.');

        const fileName = name.substring(0, lastDot);
        const ext = name.substring(lastDot + 1);

        //outputfile.value = fileName;
        //extension.value = ext;
        console.log("🚀 ~ file: mp4upload.js ~ line 47 ~ getFileNameWithExt ~ ext", ext)
        return ext;
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
        go_next_block = true; pro_bar = 0; file_size = 0;
        inp.onchange = async (evt) => {
            file_size = inp.files[0].size;
            stream = inp.files[0].stream();
            reader = stream.getReader();
            ws.send(JSON.stringify({
                ...head_obj_str,
                file_extension: getFileNameWithExt(evt)
            }));
            console.log("stream file start...");
        };
    } catch (error) {
        console.log("This is a bug that doesn't need to be noticed");
        console.log(error);
    }


    function handleChunk(buf) {
        ws.send(buf);
        console.log("received a new buffer", buf.byteLength);
        file_size += buf.byteLength;
        $('#uploadPB').css('width', Math.round((file_size / file_size) * 100) + '%').attr('aria-valuenow', Math.round((file_size / file_size) * 100)).text(`${Math.round((file_size / file_size) * 100)}%`);
    }
    $('#showfilebton').show();
});

$('#uploadPB').css('width', 0 + '%').attr('aria-valuenow', 0).text('0%');