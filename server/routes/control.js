var express = require('express');
var router = express.Router();

const mediaServer = require('../services/mediaServer');
const projector = require('../services/projector');

const SerialPort = require('serialport');
var ports = [];
SerialPort.list().then((lists) => {
	lists.forEach((list) => {
		var comName = list.comName;
		console.log(comName);
		const port =  new SerialPort(comName);
		ports.push(port);
	});
});



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
	ports.forEach((port) => {
		console.log(port.path);
		port.write('V99S0001\r');
		port.write('V99S0001\r');
		port.write('V99S0001\r');
	});
	res.send('projector on');
});

router.post('/projectoroff', function(req, res) {
	ports.forEach((port) => {
		console.log(port.path);
		port.write('V99S0002\r');
		port.write('V99S0002\r');
		port.write('V00S0002\r');
	});
	res.send('projector off');
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
