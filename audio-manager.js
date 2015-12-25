'use strict';
var spawn = require('child_process').spawn;
var fs = require('fs');
var path = require('path');
var util = require('util');

class AudioManager {
	constructor() {
		this.currentTrack = null;
		this.players = {};
		this.loadTracks();
	}

	loadTracks() {
		this.tracks = require('./audio/tracks');
	}

	getTrackById(id) {
		var matchingTracks = this.tracks.filter(function (track) {
			return track.id === id;
		});
		if (matchingTracks.length) {
			return matchingTracks[0];
		} else {
			return null;
		}
	}

	setCurrentTrack(id) {
		this.playTrack(this.getTrackById(id));
	}

	getTrackPlayer(track) {
		if (!this.players[track.id]) {
			var player = spawn('ogg123', [path.join(__dirname, track.file)]);
			player.stdout.on('data', (data) => {
				console.log(data.toString('utf-8'));
			});
			player.stderr.on('data', (data) => {
				console.error(data.toString('utf-8'));
			});
			player.on('close', (code, signal) => {
				console.log('player process exited', track.id, code, signal);
				delete this.players[track.id];
				console.log(this.players)
			});
			this.players[track.id] = player;
		}
		return this.players[track.id];
	}

	fadeOut(done) {
		for (var i = 0; i <= 10; i++) {
			(function (j) {
				setTimeout(() => {
					spawn('amixer', ['-D', 'pulse', 'sset', 'Master', (100 - j * 10) + '%']);
				}, j * 250);
			})(i);
		}
		if (done) setTimeout(done, 1000);
	}

	fadeIn(done) {
		for (var i = 0; i <= 10; i++) {
			(function (j) {
				setTimeout(() => {
					spawn('amixer', ['-D', 'pulse', 'sset', 'Master', (j * 10) + '%']);
				}, j * 250);
			})(i);
		}
		if (done) setTimeout(done, 1000);
	}

	stopTrack(track, done) {
		if (this.players[track.id]) {
			this.fadeOut(() => {
				this.players[track.id].kill('SIGTERM');
				if (done) done();
			});
		}
	}

	playTrack(track) {
		var play = () => {
			setTimeout(() => {
				var player = this.getTrackPlayer(track);
				this.currentTrack = track;
				this.fadeIn();
			}, 500);
		};
		if (this.currentTrack) {
			this.stopTrack(this.currentTrack, play);
		} else {
			play();
		}
	}
}

module.exports = new AudioManager();
