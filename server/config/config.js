var os = require('os');
var env = process.env.NODE_ENV || 'development';



var config = require('./config.json');
var envConfig = config[env];

Object.keys(envConfig).forEach((key) => {
	process.env[key] = envConfig[key];
});

console.log('env******', env);

if (env === 'development' || env === 'test') {
	process.env.HOST = os.networkInterfaces().en0[1].address;
} else if (env === 'production') {
	if (os.platform() == 'darwin') {
		if (os.networkInterfaces().en0) {
			process.env.HOST = os.networkInterfaces().en0[1].address;
		} else {
			process.env.HOST = os.networkInterfaces().lo0[1].address;
		}
	} else if (os.platfomr == 'linux') {
		if (os.networkInterfaces().eth0) {
			process.env.HOST = os.networkInterfaces().eth0[0].address;
		} else {
			process.env.HOST = os.networkInterfaces().lo0[0].address;
		}
	}
}
