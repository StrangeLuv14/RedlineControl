'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _osc = require('osc');

var _osc2 = _interopRequireDefault(_osc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var udpPort = new _osc2.default.UDPPort({ localAddress: '0.0.0.0', localPort: 57121, metadata: true, broadcast: true });

// udpPort.on('bundle', (oscBundle, timeTag, info) => {
//     console.log(`Receive OSC bundle(${timeTag}): ${oscBundle}`);
// })

udpPort.open();

udpPort.on('ready', function () {
    log('OSC port ready');
});

//relay received message back to sendOSC function
udpPort.on('message', function (msg) {
    this.emit('received', msg);
});

var sendOSC = function sendOSC(address, args) {
    log('Send OSC message to ' + address);
    udpPort.send({
        address: address,
        args: args
    }, 'localhost', 7000);

    return new Promise(function (resolve, reject) {
        udpPort.once('received', function (msg) {
            var address = msg.address;
            var status = msg.args[0].value;
            log('Receive OSC message from address ' + address + ': ' + status);
            resolve(status);
        });
    });
};

exports.default = { sendOSC: sendOSC };