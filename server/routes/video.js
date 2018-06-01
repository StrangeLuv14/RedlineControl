const express = require('express');
const router = express.Router();

const mediaServer = require('../services/mediaServer');

router.post('/:id', function (req, res) {
	var id = req.params.id;
	console.log('Video: ', id);
	mediaServer.send('video ' + id, function(error, result) {
		if (error) {
			console.error(error);
			return res.status(400).send(error);
		}
		res.send(result);
	});
})

module.exports = router;
