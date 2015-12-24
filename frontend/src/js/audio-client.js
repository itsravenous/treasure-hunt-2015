/**
* Client for the treaure hunt audio API
*/
AudioClient = function (uri) {

};

AudioClient.prototype = {
	setTrack: function (id) {
		var request = new XMLHttpRequest();
		request.open('PUT', '/current-track', true);
		return new Promise(function(resolve, reject) {
			request.setRequestHeader('Content-Type', 'application/json');
			request.onload = function() {
				if (this.status >= 200 && this.status < 400) {
					// Success!
					console.log(this.response);
					resolve(JSON.parse(this.response));
				} else {
					// We reached our target server, but it returned an error
					reject(this.response);
				}
			};
			request.onerror = function() {
				// There was a connection error of some sort
				reject('Error connecting to audio API');
			};
			request.send(JSON.stringify({
				id: id
			}));
		});
	}
};

// Export singleton
module.exports = new AudioClient();
