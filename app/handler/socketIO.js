const logger = require('./logger.js')('socketIO');
const fileIO = require('./fileIO');

module.exports = class SocketIO {
    // create socketio
    constructor(http) {
        this.io = require('socket.io')(http);
    }
    // init
    initialize() {
        this.io.on('connection', function (socket) {
            logger.info(`${socket.id} is connection`);
            socket.on('disconnect', function () {
                logger.info(`${socket.id} is disconnected`);
            });

            socket.on('s-readfile', function (user) {
                // 验证用户
                // 读取文件
                fileIO.ioReadLine(__dirname + '/test.txt')
                    .on('line', (line, lineCount, byteCount) => {
                        socket.emit('c-readfile', line, lineCount, byteCount);
                    })
                    .on('end', () => {
                        console.log('file over');
                    })
                fileIO.change(__dirname + '/test.txt')
                    .on('change', (data) => {
                        socket.emit('c-readfile-watch', '\r\n' + data);
                    })

            });
        });
    }
};