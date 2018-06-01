const wol = require('node-wol');
const webSocketServer = require('./webSocketServer');


var config = {
	mac: "3c:15:c2:d6:17:fc"
}

module.exports.wakeUp = function (done) {
	wol.wake(config.mac, function (error) {
		if (error) {
			return done(error)
		}
		done(undefined, 'Media server is up.');
	});
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
