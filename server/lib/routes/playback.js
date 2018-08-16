'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _playbackController = require('../controllers/playbackController');

var _playbackController2 = _interopRequireDefault(_playbackController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var router = express.Router();

var mediaServer = require('../services/mediaServer');

router.post('/control', _playbackController2.default.control);

router.get('/control', _playbackController2.default.getPlaybackStatus);

router.post('/select', _playbackController2.default.select);

router.get('/select', _playbackController2.default.getStoryInfo);

router.post('/volume', _playbackController2.default.volume);

exports.default = router;