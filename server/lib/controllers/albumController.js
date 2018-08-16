'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _album = require('../models/album');

var _album2 = _interopRequireDefault(_album);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getAlbums = function getAlbums(req, res) {
    // exclude _id and __v fields
    return _album2.default.find({}).select('-_id -__v').populate('stories', '-_id -__v').then(function (albums) {
        res.json(albums);
    }).catch(function (err) {
        return res.status(400).json(err);
    });
};

var getAlbumById = function getAlbumById(req, res) {
    var id = req.params.id;
    return _album2.default.findById(id).select('-_id -__v').populate('stories', '-_id -__v').then(function (album) {
        return album;
    }).catch(function (err) {
        return err;
    });
};

var getAlbumByAlbumId = function getAlbumByAlbumId(req, res) {
    var albumId = req.params.album_id;
    return _album2.default.findByAlbumId(album_id).select('-_id -__v').populate('stories', '-_id -__v').then(function (album) {
        return album;
    }).catch(function (err) {
        return err;
    });
};

exports.default = { getAlbums: getAlbums, getAlbumById: getAlbumById, getAlbumByAlbumId: getAlbumByAlbumId };