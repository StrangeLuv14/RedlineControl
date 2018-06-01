
var config = {
	host: process.env.HOST || 'localhost',
	port: 8000
}

const WebSocket = require('ws');
const webSocketServer = new WebSocket.Server({ host: config.host, port: config.port });

webSocketServer.on('connection', function connection(client, req) {
    console.log('Websocket connected');
	client.on('pong', heartbeat);
});

webSocketServer.on('error', function (error) {
	console.error('Websocket Error: ' + error.code);
});

function noop() {}

function heartbeat() {
  this.pong(noop);
  this.isAlive = true;
}

const interval = setInterval(function ping() {
  webSocketServer.clients.forEach(function each(client) {
    if (client.isAlive === false) {
		return client.terminate();
	}
    client.isAlive = false;
    client.ping(noop);
  });
}, 5000);


module.exports = webSocketServer;
