var util = require('util');
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var AudioManager = require('./audio-manager');

app = express();
app.use(bodyParser.json());

app.use(express.static('frontend/dist'));

app.get('/treasure', function (req, res, next) {
	res.send('treasure!');
});

// Music API
AudioManager.loadTracks();
app.get('/tracks', function (req, res, next) {
	res.send(AudioManager.tracks);
});
app.put('/current-track', function (req, res, next) {
	var id = req.body.id;
	var track = AudioManager.getTrackById(id);
	if (track) {
		res.send(track);
	} else {
		next(new Error(util.format('No track with id %s found', id)));
	}
});

server = http.createServer(app);
server.listen(8080);
