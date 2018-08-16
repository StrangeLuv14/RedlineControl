'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _story = require('../models/story');

var _story2 = _interopRequireDefault(_story);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getStories = function getStories(req, res) {
    // exclude _id and __v and album fields
    return _story2.default.find({}).select('-_id -__v -album').then(function (stories) {
        return stories;
    }).catch(function (err) {
        return err;
    });
};

var getStoryById = function getStoryById(req, res) {
    var id = req.params.id;
    return _story2.default.findById(id).select('-_id -__v -album').then(function (story) {
        return story;
    }).catch(function (err) {
        return err;
    });
};

var getStoryByStoryId = function getStoryByStoryId(req, res) {
    var storyId = req.params.story_id;
    return _story2.default.findByStoryId(storyId).select('-_id -__v -album').then(function (story) {
        return story;
    }).catch(function (err) {
        return err;
    });
};

exports.default = { getStories: getStories, getStoryById: getStoryById, getStoryByStoryId: getStoryByStoryId };