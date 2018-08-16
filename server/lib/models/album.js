'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var albumSchema = new Schema({
    album_id: Number,
    // sort_num: Number,
    chinese_name: String,
    english_name: String,
    description: String,
    big_image_url: String,
    small_image_url: String,
    stories: [{
        type: Schema.Types.ObjectId,
        ref: 'story'
    }]
});

albumSchema.statics.findByAlbumId = function (albumId) {
    return this.findOne({ album_id: albumId });
};

var Album = _mongoose2.default.model('album', albumSchema);

exports.default = Album;