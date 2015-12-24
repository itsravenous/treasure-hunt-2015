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
				console.log('close', code, signal);
				delete this.players[track.id];
			});
			this.players[track.id] = player;
		}
		return this.players[track.id];
	}

	stopTrack(track) {
		var player = this.getTrackPlayer(track);
		console.log('stop', track, player.kill.toString());
		console.log('kill', player.kill('SIGTERM'));
	}

	playTrack(track) {
		var player = this.getTrackPlayer(track);
		if (this.currentTrack) this.stopTrack(this.currentTrack);
		this.currentTrack = track;
	}
}

module.exports = new AudioManager();
