'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _albumController = require('../controllers/albumController');

var _albumController2 = _interopRequireDefault(_albumController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// Router for /albums

router.get('/', _albumController2.default.getAlbums);

router.get('/:id', _albumController2.default.getAlbumById);

router.get('/:album_id', _albumController2.default.getAlbumByAlbumId);

exports.default = router;