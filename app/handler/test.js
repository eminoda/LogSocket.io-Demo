const fio = require('./fileIO.js');
const fs = require('fs');
// fio.change('./test.txt');
const util = require('util');
const EventEmitter = require('events');

fio.change('test.txt').on('change', function (data) {
    console.log(data);
})