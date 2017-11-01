const fs = require('fs');
const util = require('util');
const EventEmitter = require('events');
const readline = require('linebyline');

// 文件读取
function FileIO() {
}

FileIO.prototype.ioReadLine = function (filePath) {
    return readline(filePath);
};

FileIO.prototype.change = (filePath) => {
    let fileChangeEventEmitter = new EventEmitter();
    fs.watchFile(filePath, () => {
        fileChangeEventEmitter.emit('change', 123);
    });
    return fileChangeEventEmitter;
}
exports = module.exports = new FileIO();