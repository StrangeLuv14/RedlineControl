'use strict';

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _config = require('./config.json');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var env = process.env.NODE_ENV || 'development';

var envConfig = _config2.default[env];

Object.keys(envConfig).forEach(function (key) {
    process.env[key] = envConfig[key];
});

log('Environment:' + env);