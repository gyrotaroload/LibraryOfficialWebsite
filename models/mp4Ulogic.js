var isBuffer = require('isbuffer');
const { printTable } = require('console-table-printer');

var mp4wsobj = {
    name: 'n/a',
    info: 'n/a',
    index: 0,
    input: function (data, callback) {
        //Create a table
        const isBuffer_msg = [
            { isBuffer: String(isBuffer(data)) }];

        //print
        printTable(isBuffer_msg);
    }
}

var mp4in = module.exports = mp4wsobj;