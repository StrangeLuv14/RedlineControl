'use strict';

var net = require('net');

var addrs = ['10.1.1.20', '10.1.1.21'];
var clients = [];
var results = [];

var commands = {
    on: [0x48, 0x07, 0x01, 0x03, 0xE8, 0x01, 0xFF],
    off: [0x48, 0x07, 0x02, 0x03, 0xE8, 0x02, 0xFF],
    status: [0x48, 0x07, 0x04, 0x00, 0x00, 0x00, 0xFF],
    config: [0x48, 0x07, 0x05, 0x00, 0x00, 0x01, 0xFF]
};

var hexToString = function hexToString(hexArr, delim) {
    var strArr = [];
    hexArr.forEach(function (hex) {
        var str = Number('0x' + hex);
        strArr.push(str);
    });
    return strArr.join(delim);
};

var hexToNum = function hexToNum(hexArr) {
    var num = 0;
    hexArr.forEach(function (hex) {
        num = Number('0x' + hex) + num * Math.pow(2, 8);
    });
    return num;
};

var getStatus = function getStatus(conn, res) {
    var pattern = new RegExp('[A-Za-z0-9]{2}', 'g');
    result = res.match(pattern);
    var operation = void 0;
    var status = void 0;
    if (result[0] === '48' && result[1] === '07') {
        if (result[2] === '01') {
            operation = 'Power on';
            if (result[5] == '21') {
                status = 'Succeed';
            } else if (result[5] === '11') {
                status = 'Failed';
            } else {
                return;
            }
        } else if (result[2] === '02') {
            operation = 'Power off';
            if (result[5] === '22') {
                status = 'Succeed';
            } else if (result[5] === '12') {
                status = 'Failed';
            } else {
                return;
            }
        } else if (result[2] === '03') {
            operation = 'Reset';
            if (result[5] == '24') {
                status = 'Succeed';
            } else if (result[5] === '13') {
                status = 'Failed';
            } else {
                return;
            }
        } else if (result[2] === '04') {
            operation = 'Status';
            if (result[5] == '00') {
                status = 'Off';
            } else if (result[5] === '01') {
                status = 'On';
            } else {
                return;
            }
        }
    } else if (result[0] === '55' && result[1] === 'aa') {
        operation = 'Config';
        var gateway = hexToString(result.slice(2, 6), '.');
        var mask = hexToString(result.slice(6, 10), '.');
        var localIP = hexToString(result.slice(10, 14), '.');
        var localPort = hexToNum(result.slice(14, 16));
        var targetIP = hexToString(result.slice(16, 20), '.');
        var targetPort = hexToNum(result.slice(20, 22));
        var macAddr = result.slice(22, 28).join(':');
        var mode = result[28] === '01' ? 'TCP Client' : 'TCP Server';
        status = {
            gateway: gateway,
            mask: mask,
            localIP: localIP,
            localPort: localPort,
            targetIP: targetIP,
            targetPort: targetPort,
            macAddr: macAddr,
            mode: mode
        };
        console.log('\n            Mode: ' + mode + '\n                Gateway: ' + gateway + '\n                Mask: ' + mask + '\n                LocalIP: ' + localIP + '\n                LocalPort: ' + localPort + '\n                MAC Addr: ' + macAddr);
    }

    return { operation: operation, status: status };
};

var writeToServer = function writeToServer(command, done) {
    return new Promise(function (resolve, reject) {
        addrs.forEach(function (addr) {
            console.log('Connect to ' + addr);
            var client = net.createConnection(1500, addr, function () {
                console.log('Connected to ' + addr + ':1500');
                client.setEncoding('hex');

                // write request
                client.write(Buffer.from(command), function () {
                    // console.log('Write data to server');
                });

                // handle response data
                client.on('data', function (data) {
                    console.log('Received data: ' + data);
                    result = getStatus(this, data);

                    // Push result into results array
                    if (result) {
                        console.log('Operation on ' + this.remoteAddress + ': ' + result.operation + ': ' + result.status);
                        results.push(result);
                    }

                    // return all results
                    if (results.length === addrs.length) {
                        resolve(results);
                        results = [];
                    }

                    // end connection
                    this.end();
                });
            });

            client.on('error', function (err) {
                if (err.code !== 'ECONNRESET') {
                    console.log('writeToServer reject');
                    reject('Connection on ' + this.remoteAddress + ' error: ' + err.code);
                }
            });

            client.on('end', function () {
                console.log('Disconnect from server');
            });
        });
    });
};

var powerOn = function powerOn() {
    return writeToServer(commands.on);
};

var powerOff = function powerOff() {
    return writeToServer(commands.off);
};

var getPowerStatus = function getPowerStatus() {
    return writeToServer(commands.status);
};

var getConfig = function getConfig() {
    return writeToServer(commands.config);
};

module.exports = {
    powerOn: powerOn,
    powerOff: powerOff,
    getPowerStatus: getPowerStatus,
    getConfig: getConfig
};