var isBuffer = require('isbuffer');
const { printTable } = require('console-table-printer');
var isempty = require('is-empty');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
ffmpeg.setFfmpegPath(ffmpegInstaller.path);

class vid2hls {
    constructor(tempy, callback) {
        this.tempy = tempy;
        this.fsLoc = this.tempy.file({ extension: 'mp4' });
        this.fsDir = this.tempy.directory();
        fs.open(this.fsLoc, "wx", function (err1, fd) {
            // handle error
            if (err1) callback(err1);
            fs.close(fd, function (err2) {
                // handle error
                if (err2) { callback(err2); } else {
                    callback(null);
                }
            });
        });
    }

    app_buff(buf, callback) {
        fs.appendFile(this.fsLoc, buf, function (err) {
            if (err) {
                callback('[ERROR] Data table header declared empty, the request is forbidden');
            }
            console.log("The file was saved!");
            callback(null);
        });
    }

     multi_resolution_synthesis() { // do something when encoding is done 
         fs.writeFile(`${this.fsDir}/index.m3u8`, '#EXTM3U\n#EXT-X-VERSION:3\n#EXT-X-STREAM-INF:BANDWIDTH=800000,RESOLUTION=640x360\n360p.m3u8\n#EXT-X-STREAM-INF:BANDWIDTH=1400000,RESOLUTION=842x480\n480p.m3u8\n#EXT-X-STREAM-INF:BANDWIDTH=2800000,RESOLUTION=1280x720\n720p.m3u8', function (err) {
             if (err) {
                 return console.log(err);
             }
             console.log("The file was saved!");
         })
     }
    
    end_trans() {
        ffmpeg(this.fsLoc).addOptions([ //360
            '-profile:v main',
            '-vf scale=w=640:h=360:force_original_aspect_ratio=decrease',
            '-c:a aac',
            '-ar 48000',
            '-b:a 96k',
            '-c:v h264',
            '-crf 20',
            '-g 48',
            '-keyint_min 48',
            '-sc_threshold 0',
            '-b:v 800k',
            '-maxrate 856k',
            '-bufsize 1200k',
            '-hls_time 10',
            `-hls_segment_filename ${this.fsDir}/360p_%05d.ts`,
            '-hls_playlist_type vod',
            '-f hls'
        ]).output(this.fsDir + '/360p.m3u8').on('error', function (err, stdout, stderr) {
            console.log("🚀 ~ file: vid2hls.js ~ line 106 ~ vid2hls ~ ]).output ~ err", err)
            console.log("ffmpeg stdout:\n" + stdout);
            console.log("ffmpeg stderr:\n" + stderr);
        }).run()

        ffmpeg(this.fsLoc).addOptions([ //480
            '-profile:v main',
            '-vf scale=w=842:h=480:force_original_aspect_ratio=decrease',
            '-c:a aac',
            '-ar 48000',
            '-b:a 128k',
            '-c:v h264',
            '-crf 20',
            '-g 48',
            '-keyint_min 48',
            '-sc_threshold 0',
            '-b:v 1400k',
            '-maxrate 1498k',
            '-bufsize 2100k',
            '-hls_time 10',
            `-hls_segment_filename ${this.fsDir}/480p_%05d.ts`,
            '-hls_playlist_type vod',
            '-f hls'
        ]).output(this.fsDir + '/480p.m3u8').on('error', function (err, stdout, stderr) {
            console.log("🚀 ~ file: vid2hls.js ~ line 106 ~ vid2hls ~ ]).output ~ err", err)
            console.log("ffmpeg stdout:\n" + stdout);
            console.log("ffmpeg stderr:\n" + stderr);
        }).run()

        ffmpeg(this.fsLoc).addOptions([ //720
            '-profile:v main',
            '-vf scale=w=1280:h=720:force_original_aspect_ratio=decrease',
            '-c:a aac',
            '-ar 48000',
            '-b:a 128k',
            '-c:v h264',
            '-crf 20',
            '-g 48',
            '-keyint_min 48',
            '-sc_threshold 0',
            '-b:v 2800k',
            '-maxrate 2996k',
            '-bufsize 4200k',
            '-hls_time 10',
            `-hls_segment_filename ${this.fsDir}/720p_%05d.ts`,
            '-hls_playlist_type vod',
            '-f hls'
        ]).output(this.fsDir + '/720p.m3u8').on('end', ()=>{this.multi_resolution_synthesis()}).on('error', function (err, stdout, stderr) {
            console.log("🚀 ~ file: vid2hls.js ~ line 106 ~ vid2hls ~ ]).output ~ err", err)
            console.log("ffmpeg stdout:\n" + stdout);
            console.log("ffmpeg stderr:\n" + stderr);
        }).run()
        console.log("🚀 ~ file: vid2hls.js ~ line 106 ~ vid2hls ~ end_trans ~ this.fsDir", this.fsDir)
    }
}

var v2h = module.exports = vid2hls;