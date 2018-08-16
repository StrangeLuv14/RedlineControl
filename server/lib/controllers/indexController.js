'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _child_process = require('child_process');

var _utils = require('../models/utils');

var _utils2 = _interopRequireDefault(_utils);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mediaServer = require('../services/mediaServer');

var _mediaServer2 = _interopRequireDefault(_mediaServer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reset = function reset(req, res) {
    //delete media folder
    (0, _child_process.exec)('rm -rf ./public/media', function (err, stdout, stderr) {});
    _mediaServer2.default.sendOSC('/reset', [{
        type: 'i',
        value: 1
    }]).then(function (result) {
        _utils2.default.loadDatabase(_mongoose2.default.connection.db);
        res.json({ reset: true });
    }).catch(function (err) {
        res.json({ error: err });
    });
};

exports.default = { reset: reset };