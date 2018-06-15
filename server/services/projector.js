const config = require('../config/projector');

const PJLink = require('pjlink');

const projectors = []

config.hosts.forEach((host) => {
	projectors.push(new PJLink(host, config.port, config.password));
});

module.exports.powerOn = function (done) {
	projectors.forEach(projector => projector.powerOn((err) => {
		if (err) {
			return done(err);
		}
	}));
	return done(undefined, "Projectors are on");
}

module.exports.powerOff = function (done) {
	projectors.forEach(projector => projector.powerOff((err) => {
		if (err) {
			return done(err);
		}

	}));
	return done(undefined, "Projectors are off");
}
