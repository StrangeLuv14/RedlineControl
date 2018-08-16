'use strict';

var SerialPort = require('serialport');

var ports = [];

SerialPort.list().then(function (lists) {
    lists.forEach(function (list) {
        var comName = list.comName;
        console.log(comName);
        var port = new SerialPort(comName);
        ports.push(port);
    });
});

var powerOn = function powerOn(done) {
    ports.forEach(function (port) {
        port.write('V99S0001\r');
        port.write('V99S0001\r');
        port.write('V99S0001\r');
    });
    return done(undefined, 'projector are on');
};

var powerOff = function powerOff(done) {
    ports.forEach(function (port) {
        port.write('V99S0002\r');
        port.write('V99S0002\r');
        port.write('V99S0002\r');
    });
    return done(undefined, 'projector are off');
};

module.exports = {
    powerOn: powerOn,
    powerOff: powerOff
};