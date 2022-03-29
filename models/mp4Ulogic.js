var isBuffer = require('isbuffer');
const { printTable } = require('console-table-printer');
var isempty = require('is-empty');
const fs = require('fs');
let FFmpeg = require('fluent-ffmpeg');
let bufferStream = new stream.PassThrough();

// Read the passthrough stream
const buffers = [];
bufferStream.on('data', function (buf) {
  buffers.push(buf);
});
bufferStream.on('end', function () {
  const outputBuffer = Buffer.concat(buffers);
  // use outputBuffer
});

var mp4wsobj = {
    name: 'n/a',
    info: 'n/a',
    index: 0,
    input: function (data, callback) {
        //Create a table
        //const isBuffer_msg = [
        //    { isBuffer: String(isBuffer(data)) }];
        //print
        //printTable(isBuffer_msg);
        if (isBuffer(data)) {
            this.index++;
            callback(this.index);
        } else {
            try {
                var dadaP = JSON.parse(data);
                if (dadaP && dadaP.info && dadaP.name && !dadaP.endindex) {
                    if (dadaP.info === 'n/a' && dadaP.name === 'n/a') {
                        callback('[ERROR] Data table header declared empty, the request is forbidden');
                    } else {
                        if (!isempty(dadaP.info) && !isempty(dadaP.info)) {
                            this.index = 0;
                            callback(this.index);
                        } else {
                            callback('[ERROR] Data table header declared empty, the request is forbidden');
                        }
                    }
                } else if (dadaP && dadaP.endindex && !dadaP.name && !dadaP.info) {
                    if (dadaP.endindex === 'n/a') {
                        callback('[ERROR] Data table end declared empty, the request is forbidden');
                    } else {

                        if (!isempty(dadaP.endindex) && !isNaN(parseInt(dadaP.endindex, 10)) && parseInt(dadaP.endindex, 10) === this.index) {
                            // Create a table
                            const ffmpeg_msg = [
                                { ffmpeg_msg: 'trans. success' }];
                            //print
                            printTable(ffmpeg_msg);
                        } else {
                            callback('[ERROR] Data table end declared empty, the request is forbidden');
                        }
                    }
                } else {
                    callback('[ERROR] The incoming profile has no valid data, the request is forbidden');
                }
            } catch (error) {
                callback(error);
            }
        }
    }
}

var mp4in = module.exports = mp4wsobj;