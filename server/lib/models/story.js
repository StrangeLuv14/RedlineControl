'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var storySchema = new Schema({
    story_id: Number,
    album: {
        type: Schema.Types.ObjectId,
        ref: 'album'
    },
    // sort_num: Number,
    chinese_title: String,
    english_title: String,
    description: String,
    big_image_url: String,
    small_image_url: String,
    duration: Number
});

storySchema.statics.findByStoryId = function (storyId) {
    return this.findOne({ story_id: storyId });
};

var Story = _mongoose2.default.model('story', storySchema);

exports.default = Story;