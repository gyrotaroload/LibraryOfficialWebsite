var isBuffer = require('isbuffer');
const { printTable } = require('console-table-printer');
var isempty = require('is-empty');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
ffmpeg.setFfmpegPath(ffmpegInstaller.path);
const PATH = require('path');
const dirTree = require('directory-tree');
const pretty = require('prettysize');
var fileExtension = require('file-extension');
var basename = require('basename');
const del = require('del');
var beep = require('beepbeep')


class vid2hls {
    constructor(tempy, custom_video_id, custom_video_extension, callback) {
        this.tempy = tempy;
        this.custom_video_extension = custom_video_extension;
        this.fsLoc = this.tempy.file({ extension: custom_video_extension });
        this.fsDir = this.tempy.directory();
        this.custom_video_id = custom_video_id;
        fs.open(this.fsLoc, "wx", function (err1, fd) {
            // handle error
            if (err1) callback(`[ERROR] unable to create server-side temporary video file, at start-up @ ${err1}`);
            fs.close(fd, function (err2) {
                // handle error
                if (err2) { callback(`[ERROR] unable to create server-side temporary video file, at end-stage @ ${err2}`); } else {
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

    warehouse(idx, fileList, finish, warehousing, relay_this_warehouse,
        relay_this_fsLoc, relay_this_custom_video_extension, relay_this_custom_video_id) {
        console.log("🚀 ~ file: vid2hls.js ~ line 41 ~ vid2hls ~ warehouse ~ idx", idx)
        if (idx < fileList.children.length) {
            fs.readFile(fileList.children[idx].path, function (err, data) {
                if (err) {
                    throw err;//TODO EH
                }

                var toW = {
                    date_time: Date.now(),
                    file_name: fileList.children[idx].name,
                    file_extension: fileExtension(fileList.children[idx].name),
                    file_dir: fileList.name,
                    custom_video_title: basename(relay_this_fsLoc),
                    custom_video_info: relay_this_custom_video_extension,
                    custom_video_id: relay_this_custom_video_id
                    , support_resolution: ['TBD', 'TBD', 'TBD'],
                    file_size: Buffer.byteLength(data)
                    , data: data, file_size_pretty: pretty(Buffer.byteLength(data))
                };
                console.log("🚀 ~ file: vid2hls.js ~ line 64 ~ vid2hls ~ toW", toW)
                warehousing(toW
                    , (tf) => {
                        if (tf) {
                            relay_this_warehouse(idx + 1, fileList, finish, warehousing, relay_this_warehouse,
                                relay_this_fsLoc, relay_this_custom_video_extension, relay_this_custom_video_id);
                        } else {
                            console.log("[ERROR] Custom data processing return value display error")//TODO EH
                        }
                    });
            });
        } else {
            del([fileList.children[idx-1]?fileList.children[idx-1].name:'']).then(() => {
                finish(null);
            });
        }
    }

    multi_resolution_synthesis(warehousing, finish) { // do something when encoding is done 
        var FWD_fsDir = this.fsDir;
        var relay_this_warehouse = this.warehouse;
        var relay_this_fsLoc = this.fsLoc;
        var relay_this_custom_video_extension = this.custom_video_extension;
        var relay_this_custom_video_id = this.custom_video_id;
        fs.writeFile(`${this.fsDir}/index.m3u8`, '#EXTM3U\n#EXT-X-VERSION:3\n#EXT-X-STREAM-INF:BANDWIDTH=800000,RESOLUTION=640x360\n360p.m3u8\n#EXT-X-STREAM-INF:BANDWIDTH=1400000,RESOLUTION=842x480\n480p.m3u8\n#EXT-X-STREAM-INF:BANDWIDTH=2800000,RESOLUTION=1280x720\n720p.m3u8', function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("The file was saved!");
            // Loop through all the files in the temp directory
            dirTree(FWD_fsDir, {
                extensions: /\.(ts|m3u8)$/
            }, () => {
                // Create a table
                //const dir_tree = [
                //    { dir_tree: 'MID~~' }];
                //print
                //printTable(dir_tree);

            }, (item, PATH, stats) => {
                //console.log(item);
                relay_this_warehouse(0, item, finish, warehousing, relay_this_warehouse,
                    relay_this_fsLoc, relay_this_custom_video_extension, relay_this_custom_video_id);
            });

        })
    }

    end_trans(pt1, pt2) {
        var relay_this_fsDir = this.fsDir;
        ffmpeg(this.fsLoc).addOptions([ //360
            '-profile:v main',
            '-vf pad=(iw/2)*2:(ih/2)*2:0:0,scale=trunc(oh/a/2)*2:360',
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

            console.log("ffmpeg stdout:\n" + stdout);
            console.log("ffmpeg stderr:\n" + stderr);
        }).on('error', function (err, stdout, stderr) {
            beep(3, 1000)

            console.log("ffmpeg stdout:\n" + stdout);
            console.log("ffmpeg stderr:\n" + stderr);
        }).run()

        ffmpeg(this.fsLoc).addOptions([ //480
            '-profile:v main',
            '-vf pad=(iw/2)*2:(ih/2)*2:0:0,scale=trunc(oh/a/2)*2:480',
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

            console.log("ffmpeg stdout:\n" + stdout);
            console.log("ffmpeg stderr:\n" + stderr);
        }).on('error', function (err, stdout, stderr) {beep(3, 1000)

            console.log("ffmpeg stdout:\n" + stdout);
            console.log("ffmpeg stderr:\n" + stderr);
        }).run()

        ffmpeg(this.fsLoc).addOptions([ //720
            '-profile:v main',
            '-vf pad=(iw/2)*2:(ih/2)*2:0:0,scale=trunc(oh/a/2)*2:720',
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
        ]).output(this.fsDir + '/720p.m3u8').on('end', () => {
            this.multi_resolution_synthesis(pt1, pt2);
            del([relay_this_fsDir]).then(() => {
                console.log('OK')    //TODO tell user that it is ok
            });
        }).on('error', function (err, stdout, stderr) {
            beep(3, 1000)

            console.log("ffmpeg stdout:\n" + stdout);
            console.log("ffmpeg stderr:\n" + stderr);
        }).run()

    }
}

var v2h = module.exports = vid2hls;