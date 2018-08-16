'use strict';

var _mediaServer = require('../services/mediaServer');

var _mediaServer2 = _interopRequireDefault(_mediaServer);

var _projector = require('../services/projector');

var _projector2 = _interopRequireDefault(_projector);

var _deviceController = require('../controllers/deviceController');

var _deviceController2 = _interopRequireDefault(_deviceController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var router = express.Router();

// Route handler for media server power control
// router.post('/poweron', function(req, res) {
//     mediaServer.wakeUp().then(result => res.send(result)).catch(err => res.status(400).send(err))
// });
//
// router.post('/poweroff', function(req, res) {
//     mediaServer.shutDown().then(result => res.send(result)).catch(err => res.status(400).send(err))
// });

// router.post('/mediaserver', (req, res) => {
// const command = req.body.control
// if (command === 'on') {
//     console.log(command);
//     mediaServer.wakeUp().then(result => {
//         console.log(result);
//         res.json({server: 'on'})
//     }).catch(err => {
//         console.log(err);
//         res.json({error: err})
//     })
// } else if (command === 'off') {
//     mediaServer.shutDown().then(result => {
//         res.json({server: 'on'})
//     }).catch(err => {
//         res.json({error: err})
//     })
// } else {
//     res.json({error: 'post data error'})
// }
// })

router.post('/mediaserver', _deviceController2.default.mediaServerControl);

// router.get('/status', function(req, res) {
//     mediaServer.getStatus().then(result => res.send(result)).catch(err => res.status(400).send(err))
// });
//
// router.get('/config', function(req, res) {
//     mediaServer.getConfig().then(result => res.send(result)).catch(err => res.status(400).send(err))
// });

// Route handler for projector power control
// router.post('/projectoron', function(req, res) {
//     projector.powerOn((err) => {
//         res.send('projector ON');
//     });
// });
//
// router.post('/projectoroff', function(req, res) {
//     projector.powerOff((err) => {
//         res.send('projector OFF');
//     });
// });

// router.post('/projector', (req, res) => {
//     res.json({projector: 'on'})
// const command = req.body.control
// if (command === 'on') {
//     projector.powerOn().then(result => res.json({projector: 'on'})).catch(err => res.status(400).json({error: err}))
// } else if (command === 'off') {
//     projector.powerOff().then(result => res.json({projector: 'on'})).catch(err => res.status(400).json({error: err}))
// } else {
//     res.status(400).json({error: err})
// }
// })

router.post('/projector', _deviceController2.default.projectorControl);

// Route handler for media server transport control
// router.post('/play', function(req, res) {
//     var command = req.url.split('/')[1];
//     mediaServer.sendCommand(command).then(result => res.send(result)).catch(err => res.status(400).send(err))
// });
//
// router.post('/pause', function(req, res) {
//     var command = req.url.split('/')[1];
//     mediaServer.sendCommand(command).then(result => res.send(result)).catch(err => res.status(400).send(err))
// });
//
// router.post('/stop', function(req, res) {
//     var command = req.url.split('/')[1];
//     mediaServer.sendCommand(command).then(result => res.send(result)).catch(err => res.status(400).send(err))
// });

module.exports = router;