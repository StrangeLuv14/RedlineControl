'use strict';

var _projector = require('../config/projector');

var _projector2 = _interopRequireDefault(_projector);

var _pjlink = require('pjlink');

var _pjlink2 = _interopRequireDefault(_pjlink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Promisfy
var on = function on(projector) {
    return new Promise(function (resolve, reject) {
        projector.powerOn(function (err) {
            if (err) {
                reject();
            }
            resolve();
        });
    });
};

var off = function off(projector) {
    return new Promise(function (resolve, reject) {
        projector.powerOff(function (err) {
            if (err) {
                reject();
            }
            resolve();
        });
    });
};

var projectors = [];

_projector2.default.hosts.forEach(function (host) {
    projectors.push(new _pjlink2.default(host, _projector2.default.port, _projector2.default.password));
});

var powerOn = function powerOn() {
    var powerOnList = projectors.map(function (projector) {
        return on(projector);
    });
    return Promise.all(powerOnList);
};

var powerOff = function powerOff() {
    var powerOffList = projectors.map(function (projector) {
        return off(projector);
    });
    return Promise.all(powerOffList);
};

module.exports = {
    powerOn: powerOn,
    powerOff: powerOff
};