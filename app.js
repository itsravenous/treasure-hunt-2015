var util = require('util');
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var audioManager = require('./audio-manager');

app = express();
app.use(bodyParser.json());
app.use(function (req, res, next) {
	console.log(req.method, req.path);
	next();
});

app.use(express.static('frontend/dist'));

app.get('/treasure', function (req, res, next) {
	res.send('treasure!');
});

// Music API
app.get('/tracks', function (req, res, next) {
	res.send(audioManager.tracks);
});
app.put('/current-track', function (req, res, next) {
	var id = req.body.id;
	var track = audioManager.getTrackById(id);
	if (track) {
		audioManager.setCurrentTrack(id);
		res.send(track);
	} else {
		next(new Error(util.format('No track with id %s found', id)));
	}
});

server = http.createServer(app);
server.listen(8080);
