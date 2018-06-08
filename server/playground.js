const SerialPort= require('serialport');
var ports = [];

SerialPort.list().then((lists) => {
	lists.forEach((list) => {
		var comName = list.comName
		const port = new SerialPort(comName)
		ports.push(port);
	})
})

//const port = new SerialPort('/dev/ttyUSB0');



port.on('open', (err) => {
	if (err) {
		return console.log('Error opening port: ', err.message);
	}
	console.log('Port Open');
	if (process.env.PJTRPOWER == 'on') {
		ports.forEach((port) => {
			port.write('V00S0001\r', 'ascii');
			port.drain();
		})
		console.log('Power On');
	} else if (process.env.PJTRPOWER == 'off') {
		ports.forEach((port) => {
			port.write('V00S0002\r', 'ascii');
		})
		console.log('Power Off');
	}
});

port.on('data', (data) => {
	console.log('Data', data.toString());
});

port.on('error', (err) => {
	if(err) {
		return console.log('Error open port: ', err.message);
	}
});
