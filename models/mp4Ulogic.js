var isBuffer = require('isbuffer');
const { printTable } = require('console-table-printer');
var isempty = require('is-empty');
const vid2hls = require('./vid2hls');

var mp4wsobj = {
    name: 'n/a',
    info: 'n/a',
    index: 0, v2h: null,
    fsLoc: null, tempy: null, tempy_esm_include: function (stuff) {
        /**
         * you need to call in www.mjs   ;
         * import tempy from 'tempy';
         * mp4Ulogic.tempy_esm_include(tempy);
         */
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
                this.v2h.app_buff(data, (errv2h) => {
                    if (errv2h) {
                        callback(String(errv2h));
                    } else {
                        callback(Parent_object_child_object_connection);
                    }
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
                                var tmp_i = this.index;
                                ///////////////////////////////////////////////////////////////////////////
                                this.v2h = new vid2hls(this.tempy, (tf) => {
                                    if (!tf) {
                                        callback(tmp_i);
                                    } else {
                                        callback(String(tf));
                                    }
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
                                this.v2h.end_trans();
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