'use strict';
var util = require('util');

class AudioManager {
	static loadTracks() {
		this.tracks = require('./audio/tracks');
	}

	static getTrackById(id) {
		var matchingTracks = this.tracks.filter(function (track) {
			return track.id === id;
		});
		if (matchingTracks.length) {
			return matchingTracks[0];
		} else {
			return null;
		}
	}

	static setCurrentTrack (id) {
		this.currentTrack = this.getTrackById(id);
	}

	playTrack() {

	}
}

module.exports = AudioManager;
