'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

var _album = require('../models/album');

var _album2 = _interopRequireDefault(_album);

var _story = require('../models/story');

var _story2 = _interopRequireDefault(_story);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ObjectId = _mongoose2.default.Types.ObjectId;

var saveData = function saveData(JSONFile) {
    var dataObj = JSON.parse(JSONFile);
    var albums = [];
    var stories = [];

    dataObj.forEach(function (album) {
        var _id = new ObjectId();
        var album_id = album.album_id;
        var chinese_name = album.chinese_name;
        var english_name = album.english_name;
        var big_image_url = album.big_image_url;
        var small_image_url = album.small_image_url;
        var description = album.description;

        // Create new album
        var newAlbum = new _album2.default({
            _id: _id,
            album_id: album_id,
            chinese_name: chinese_name,
            english_name: english_name,
            big_image_url: big_image_url,
            small_image_url: small_image_url,
            description: description,
            stories: []
        });

        // Create new stories
        album.stories.forEach(function (story) {
            var _id = new ObjectId();
            var story_id = story.story_id;
            var album = _id;
            var sort_num = story.sort_num;
            var chinese_title = story.chinese_title;
            var english_title = story.english_title;
            var big_image_url = story.big_image_url;
            var small_image_url = story.small_image_url;
            var description = story.description;
            var duration = story.duration;

            newAlbum.stories.push(_id);

            var newStory = new _story2.default({
                _id: _id,
                story_id: story_id,
                album: album,
                sort_num: sort_num,
                chinese_title: chinese_title,
                english_title: english_title,
                big_image_url: big_image_url,
                small_image_url: small_image_url,
                description: description,
                duration: duration
            });
            stories.push(newStory);
        });

        // save new album
        albums.push(newAlbum);
    });

    return { albums: albums, stories: stories };
};

var buildFromFile = function buildFromFile() {
    return new Promise(function (resolve, reject) {
        _fs2.default.readFile('./data.json', function (err, data) {
            var _saveData = saveData(data),
                albums = _saveData.albums,
                stories = _saveData.stories;

            Promise.all([_album2.default.create(albums), _story2.default.create(stories)]).then(function (results) {
                return resolve();
            }).catch(function (err) {
                return reject();
            });
        });
    });
};

var loadDatabase = function loadDatabase(db) {
    _fs2.default.readdir('./public/media', function (err, files) {
        if (err) {
            console.log('Read media folder failed: ' + err.message);
            console.log('Create media folder');
            _fs2.default.mkdir('./public/media', function (err) {
                if (err) {
                    console.log('Create media folder failed: ' + err.message);
                }
            });
        }
        if (!files || files.length === 0) {
            console.log('Media folder is empty, download files');
            var bucket = new _mongodb2.default.GridFSBucket(db);

            // get gridFS file collections
            var File = db.collection('fs.files');
            File.find({}).toArray().then(function (files) {
                files.forEach(function (file) {
                    try {
                        _fs2.default.mkdirSync('./public/media/' + file.filename.split('/')[0]);
                    } catch (e) {}
                    var filepath = _path2.default.join(__dirname, '../public/media/', file.filename);
                    bucket.openDownloadStream(file._id).pipe(_fs2.default.createWriteStream(filepath)).on('error', function (err) {
                        log('Error download: ' + err.message);
                    }).on('end', function () {
                        console.log('' + filepath);
                    });
                });
            }).catch(function (err) {
                console.log(err);
            });
        }
    });
};

exports.default = { loadDatabase: loadDatabase };