const wol = require('node-wol');
const webSocketServer = require('./webSocketServer');


var config = {
	mac: ["18:31:bf:b9:6b:2e", "18:31:bf:b8:cd:0c"]
}

module.exports.wakeUp = function (done) {
	addresses = config.mac;
	addresses.forEach(function (address) {
		wol.wake(address, function(error) {
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
