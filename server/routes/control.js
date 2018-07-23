var express = require('express');
var router = express.Router();

const mediaServer = require('../services/mediaServer');
const projector = require('../services/projector');

router.get('/getstatus', function(req, res) {
    mediaServer.getStatus(function(error, result) {
        if (error) {
            return res.status(400).send(error);
        }
        res.status(200).send(result);
    });
});

router.post('/poweron', function(req, res) {
    mediaServer.wakeUp(function(result) {
        res.status(200).send(result);
    });
});

router.post('/poweroff', function(req, res) {
    mediaServer.shutDown(function(result) {
        res.status(200).send(result);
    });
});

router.get('/status', function(req, res) {
    mediaServer.getStatus(function(result) {
        res.status(200).send(result);
    });
});

router.get('/config', function(req, res) {
    mediaServer.getConfig(function(result) {
        console.log('return config');
        res.status(200).send(result);
    });
});

router.post('/projectoron', function(req, res) {
    projector.powerOn((err) => {
        res.send('projector ON');
    });
});

router.post('/projectoroff', function(req, res) {
    projector.powerOff((err) => {
        res.send('projector OFF');
    });
});

router.post('/play', function(req, res) {
    var control = req.url.split('/')[1];
    mediaServer.play(control, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(400).send('Failed play movie')
        }
        res.send('media server play');
    });
});

router.post('/pause', function(req, res) {
    var control = req.url.split('/')[1];
    mediaServer.pause(control, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(400).send('Failed pause movie')
        }
        res.send('media server pause');
    });
});

router.post('/stop', function(req, res) {
    var control = req.url.split('/')[1];
    mediaServer.stop(control, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(400).send('Failed stop movie')
        }
        res.send('media server stop');
    });
});

module.exports = router;
