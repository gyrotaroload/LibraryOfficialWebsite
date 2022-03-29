const fs = require('fs');
const data = fs.readFileSync('F:/download/def7b965c071b4b7.mp4', { encoding: 'base64' });
//console.log("🚀 ~ file: f.js ~ line 3 ~ data", data)
const stream = require('stream');
//const socket = require('socket.io');
let FFmpeg = require('fluent-ffmpeg');
let bufferStream = new stream.PassThrough();
new FFmpeg({
    // Create a Readable stream from the base64 data
    source: stream.Readable.from([new Buffer.from(data, 'base64')], { objectMode: false })
})
    .on('error', function (err) {
        console.log('ffmpeg-error');
        console.log('ffmpeg : сообщение ошибки: ');
        console.log(err.message);
    })
    .on('progress', function (progress) {
        console.log('ffmpeg-output')
        console.log("🚀 ~ file: f.js ~ line 19 ~ Math.round(progress.percent)", Math.round(progress.percent))
        console.log("progress")
    })
    .on('end', function () {
        console.log('Formating finished!');
        console.log("after");
    })
    .writeToStream(bufferStream);

// Read the passthrough stream
const buffers = [];
bufferStream.on('data', function (buf) {
    buffers.push(buf);
});
bufferStream.on('end', function () {
    const outputBuffer = Buffer.concat(buffers);
    console.log("🚀 ~ file: f.js ~ line 35 ~ outputBuffer", outputBuffer)
});