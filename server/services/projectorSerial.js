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

module.exports.powerOn = function (done) {
	ports.forEach((port) => {
		port.write('V99S0001\r');
		port.write('V99S0001\r');
		port.write('V99S0001\r');
	});
	return done(undefined, 'projector are on');
};

module.exports.powerOff = function (done) {
	ports.forEach((port) => {
		port.write('V99S0002\r');
		port.write('V99S0002\r');
		port.write('V99S0002\r');
	});
	return done(undefined, 'projector are off');
};
