var express = require('express');
var router = express.Router();

const mediaServer = require('../services/mediaServer')

import playbackController from '../controllers/playbackController'

router.post('/control', playbackController.control)

router.get('/control', playbackController.getPlaybackStatus)

router.post('/select', playbackController.select)

router.get('/select', playbackController.getStoryInfo)

export default router
