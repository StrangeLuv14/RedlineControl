'use strict';

var _projector = require('../config/projector');

var _projector2 = _interopRequireDefault(_projector);

var _pjlink = require('pjlink');

var _pjlink2 = _interopRequireDefault(_pjlink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Promisfy
_pjlink2.default.prototype.on = function () {
    var _this = this;

    return new Promise(function (resolve, reject) {
        _this.powerOn(function (err) {
            if (err) {
                reject();
            }
            resolve();
        });
    });
};

_pjlink2.default.prototype.off = function () {
    var _this2 = this;

    return new Promise(function (resolve, reject) {
        _this2.powerOff(function (err) {
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
        return projector.on;
    });
    return Promise.all(powerOnList);
};

var powerOff = function powerOff() {
    var powerOffList = projectors.map(function (projector) {
        return projector.off;
    });
    return Promise.all(powerOffList);
};

// const powerOn = function(done) {
//     projectors.forEach(projector => projector.powerOn((err) => {
//         if (err) {
//             return done(err);
//         }
//     }));
//     return done(undefined, "Projectors are on");
// }
//
// const powerOff = function(done) {
//     projectors.forEach(projector => projector.powerOff((err) => {
//         if (err) {
//             return done(err);
//         }
//
//     }));
//     return done(undefined, "Projectors are off");
// }

module.exports = {
    powerOn: powerOn,
    powerOff: powerOff
};