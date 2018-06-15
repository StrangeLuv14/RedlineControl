var express = require('express');
var router = express.Router();

const webSocketServer = require('../services/webSocketServer');


// index router
router.get('/load', function(req, res) {
  webSocketServer.clients.forEach(function each(client) {
	  client.send("reload")
	  client.onmessage = function(event) {
		  console.log('Response from TouchDesigner:', event.data);
		  res.send(event.data)
	  }
  });
});


module.exports = router;
