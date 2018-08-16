'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mediaServer = require('../services/mediaServer');

var _mediaServer2 = _interopRequireDefault(_mediaServer);

var _story = require('../models/story');

var _story2 = _interopRequireDefault(_story);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// State management
var currentStoryId = 0;
var playbackStatus = 'waiting';

var control = function control(req, res) {
    var command = req.body.playback;

    // set playback status
    if (command === 'play') {
        playbackStatus = 'playing';
    } else {
        playbackStatus = command;
    }

    _mediaServer2.default.sendOSC('/playback', [{
        type: 's',
        value: command
    }]).then(function (result) {
        log(result);
        res.json({ playback: result });
    }).catch(function (err) {
        res.json({ error: err });
    });
};

var getPlaybackStatus = function getPlaybackStatus(req, res) {
    if (currentStoryId === 0) {
        // set playback status
        playbackStatus = 'waiting';

        res.json({ "playback_status": playbackStatus });
    } else {
        _story2.default.findByStoryId(current_story_id).then(function (story) {
            res.json({ playback_status: playbackStatus, current_story: story });
        }).catch(function (err) {
            error: err;
        });
    }
};

var select = function select(req, res) {
    var command = req.body.story_id;

    _mediaServer2.default.sendOSC('/select', [{
        type: 'i',
        value: command
    }]).then(function (result) {
        res.json({ select: 'OK' });
    }).catch(function (err) {
        res.json({ error: err });
    });
};

var getStoryInfo = function getStoryInfo(req, res) {
    var storyId = req.body.story_id;
    _story2.default.findByStoryId(storyId).then(function (story) {
        current_story_id = story.story_id;
        res.json(story);
    }).catch(function (err) {
        res.json({ error: err });
    });
};

var volume = function volume(req, res) {

    var command = req.body.volume;
    _mediaServer2.default.sendOSC('/volume', [{
        type: 'i',
        value: command
    }]).then(function (result) {
        res.json({ volume: result });
    }).catch(function (err) {
        res.json({ error: err });
    });
};

exports.default = { control: control, getPlaybackStatus: getPlaybackStatus, select: select, getStoryInfo: getStoryInfo, volume: volume };