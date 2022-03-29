
const PATH = require('path');
const dirTree = require('directory-tree');
dirTree('.', {
    extensions: /\.(md|js|html|java|py|rb)$/
}, () => { console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n") }
    , (item, PATH, stats) => {
        console.log("🚀 ~ file: vid2hls.js ~ line 70 ~ vid2hls ~ tree ~ stats", stats)
        console.log("🚀 ~ file: vid2hls.js ~ line 70 ~ vid2hls ~ tree ~ PATH", PATH)
        console.log(item);
    });