$('#stk1').click(function () {
    try {
        var socket = io();
        if (socket) {
            socket.emit('callServer', 'come from client');
        }
    } catch (error) {
        console.log(error);
    }
});

$('#stk2').click(function () {
    var content = '';
    var currentLineCount = 0;
    try {
        var socket = io();
        if (socket) {
            socket.emit('s-readfile');
            socket.on('c-readfile', function (data, lineCount, byteCount) {
                content = content + data + '\r\n';
                $('#stk-content').text(content);
            })
            socket.on('c-readfile-watch', function (data) {
                content = content + data + '\r\n';
                $('#stk-content').text(content);
            });
        }
    } catch (error) {
        console.log(error);
    }
})