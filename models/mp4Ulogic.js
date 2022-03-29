var isBuffer = require('isbuffer');
const { printTable } = require('console-table-printer');
var isempty = require('is-empty');
const fs = require('fs');
let FFmpeg = require('fluent-ffmpeg');

var mp4wsobj = {
    name: 'n/a',
    info: 'n/a',
    index: 0,
    fsLoc: null, tempy: null, tempy_esm_include: function (stuff) {
        this.tempy = stuff;
    },
    input: function (data, callback) {
        if (!this.tempy && typeof this.tempy != "undefined" && this.tempy != 0) {
            callback('[ERROR] tempy is not defined, You need to call modern mods to use this feature. More info @ https://www.npmjs.com/package/tempy');
        } else {
            //Create a table
            //const isBuffer_msg = [
            //    { isBuffer: String(isBuffer(data)) }];
            //print
            //printTable(isBuffer_msg);
            if (isBuffer(data)) {
                this.index++;
                var Parent_object_child_object_connection = this.index;
                fs.appendFile(this.fsLoc, data, function (err) {
                    if (err) {
                        callback('[ERROR] Data table header declared empty, the request is forbidden');
                    }
                    console.log("The file was saved!");

                    console.log("🚀 ~ file: mp4Ulogic.js ~ line 22 ~ this.fsLoc", this.fsLoc)
                    callback(Parent_object_child_object_connection);
                });
            } else {
                try {
                    var dadaP = JSON.parse(data);
                    if (dadaP && dadaP.info && dadaP.name && !dadaP.endindex) {
                        if (dadaP.info === 'n/a' && dadaP.name === 'n/a') {
                            callback('[ERROR] Data table header declared empty, the request is forbidden');
                        } else {
                            if (!isempty(dadaP.info) && !isempty(dadaP.info)) {
                                this.index = 0;
                                this.fsLoc = this.tempy.file({ extension: 'mp4' });
                                console.log("🚀 ~ file: mp4Ulogic.js ~ line 40 ~ this.fsLoc", this.fsLoc)
                                var Parent_object_child_object_connection = this.index;
                                fs.open(this.fsLoc, "wx", function (err1, fd) {
                                    // handle error
                                    if (err1) callback(String(err1));
                                    fs.close(fd, function (err2) {
                                        // handle error
                                        if (err2) { callback(String(err2)); } else {
                                            callback(Parent_object_child_object_connection);

                                        }
                                    });
                                });
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
                    callback(String(error));
                }
            }
        }
    }
}

var mp4in = module.exports = mp4wsobj;