const PJLink = require('pjlink');

var config = {
	host: "10.0.0.10",
	port: 4352,
	password: "redline123"
};

module.exports = new PJLink(config.host, config.port, config.password);
