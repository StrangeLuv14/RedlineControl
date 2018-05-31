var express = require('express');
var router = express.Router();

/// WOL
const mediaServerConfig = require('../config/mediaServer')
var mediaServer = require('node-wol');

// PJ-link
const PJLink = require('pjlink');
const projectorConfig = require('../config/projector')
const projector = new PJLink(projectorConfig.host, projectorConfig.port, projectorConfig.password);

// Websocket
const webSocketConfig = require('../config/webSocket');
const WebSocket = require('ws');
console.log("ws:" + webSocketConfig.host + ':' + webSocketConfig.port);
const webSocketServer = new WebSocket.Server({ host: webSocketConfig.host, port: webSocketConfig.port });

webSocketServer.on('connection', function connection(client, req) {
    console.log('Websocket connected');
	client.on('pong', heartbeat);
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

webSocketServer.on('error', function (error) {
	console.error('Websocket Error: ' + error.code)
});


// index router
router.get('/load', function(req, res) {
  webSocketServer.clients.forEach(function each(client) {
	  console.log('ReadyState: ', client.readyState);
	  if (client.readyState === WebSocket.OPEN) {

		 client.send("reload")
		 client.onmessage = function(event) {
			 console.log('Response from TouchDesigner:', event.data);
			 res.send(event.data)
		 }
	 } else {
		 res.send();
	 }
  });
});

router.post('/', function(req, res) {

    var control = req.body.control;
    console.log('receive message from browser: %s', control);

    if (control === 'powerOn') {
        mediaServer.wake(mediaServerConfig.address, function(error) {
            if (error) {
                console.error("Failed wake on lan: " + error.code);
            }
			res.json(req.body);

        })
    } else if (control === 'powerOff') {
		var serverAddressReversed = mediaServerConfig.address.split(':').reverse().join()
		mediaServer.wake(serverAddressReversed, function(error) {
            if (error) {
                console.error("Failed wake on lan: " + error.code);
            }
			res.json(req.body);
        })
    } else if (control === 'projectorOn') {
        projector.powerOn( function(error) {
            if (error) {
                console.error("Failed Power on projector: " + error.code);
            }
			res.json(req.body);
        })
    } else if (control === 'projectorOff\n') {
        projector.powerOff( function(error) {
            if (error) {
                console.error("Failed Power off projector: " + error.code)
            }
			res.json(req.body);
        })
    } else {
		webSocketServer.clients.forEach(function each(client) {
			console.log("Client ReadyState: " + client.readyState)
            if (client.readyState === WebSocket.OPEN) {
                client.send(control);
            }
        });
		res.json(req.body);
	}

})

module.exports = router;
