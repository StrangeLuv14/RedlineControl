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
	process.env.HOST = os.networkInterfaces().wlan0[0].address;
}
