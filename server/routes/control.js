var express = require('express');
var router = express.Router();

const mediaServer = require('../services/mediaServer');
const projector = require('../services/projector');

router.post('/poweron', function(req, res) {
	console.log(req.url);
	mediaServer.wakeUp(function(error, result) {
		if (error) {
			console.error("Failed wake on lan: " + error.code);
			return res.status(400).send(error);
		}
		res.send(result);
	});
});

router.post('/projectoron', function(req, res) {
	projector.powerOn( function(error) {
		if (error) {
			console.error("Failed Power on projector: " + error.code);
		}
		res.json(req.body);
	});
});

router.post('/projectoroff', function(req, res) {
    console.log('receive message from browser: %s', control);
	projector.powerOff( function(error) {
		if (error) {
			console.error("Failed Power off projector: " + error.code);
		}
		res.json(req.body);
	});
});

router.use(function(req, res) {
	var control = req.url.split('/')[1];
	console.log('Control: ', control);
	mediaServer.send(control, function(error, result) {
		if (error) {
			console.error(error);
			return res.status(400).send(error);
		}
		res.send(result);
	});
});

module.exports = router;
