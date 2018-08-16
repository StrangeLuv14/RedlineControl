'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _projector = require('../services/projector');

var _projector2 = _interopRequireDefault(_projector);

var _ethernetPowerControl = require('../services/ethernetPowerControl');

var _ethernetPowerControl2 = _interopRequireDefault(_ethernetPowerControl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mediaServerControl = function mediaServerControl(req, res) {
    res.json({ server: 'on' });
};

var projectorControl = function projectorControl(req, res) {
    res.json({ projector: 'on' });
};

exports.default = { mediaServerControl: mediaServerControl, projectorControl: projectorControl };