const config = require('../config/mediaServer');

const wol = require('node-wol');
const webSocketServer = require('./webSocketServer');

module.exports.wakeUp = function (done) {
	addresses = config.mac;
	addresses.forEach(function (address) {
		wol.wake(address, {address: '10.1.1.255'}, function(error) {
			if(error) {
				return done(error);
			}
		});
	});
	done(undefined, "Media server is up");
}

module.exports.shutDown = function (done) {
}

module.exports.send = function (control, done) {
	if (webSocketServer.clients.size === 0) {
		var err = 'No active clients'
		console.warn(err);
		return done(err);
	}
	webSocketServer.clients.forEach(function each(client) {
		client.send(control);
	});
	return done(undefined, 'command sent to mediaServer');
}
