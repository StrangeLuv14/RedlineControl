var express = require('express');
var router = express.Router();

import mediaServer from '../services/mediaServer'
import projector from '../services/projector'

import deviceController from '../controllers/deviceController'

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

router.post('/mediaserver', deviceController.mediaServerControl)

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

router.post('/projector', deviceController.projectorControl)

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
