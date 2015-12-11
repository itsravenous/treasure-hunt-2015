var config = require('./config');

/**
* Client for the Orvibo switch API
*/
SwitchClient = function (uri) {
	/**
	* Entry point URI for the API
	* @type {String}
	*/
	this.uri = uri;
};

SwitchClient.prototype = {
	/**
	* Get all available switches
	* @return {Promise<Array<Object>>}
	*/
	getSwitches: function () {
		var request = new XMLHttpRequest();
		request.open('GET', this.uri, true);
		return new Promise(function(resolve, reject) {
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
				reject('Error connecting to switch API');
			};
			request.send();
		});
	},

	/**
	* Turn a switch off
	* @param {String} id Switch id
	* @return {Promise<Object>}
	*/
	off: function (id) {
		return this.set(id, 0);
	},

	/**
	* Turn a switch on
	* @param {String} id Switch id
	* @return {Promise<Object>}
	*/
	on: function (id) {
		return this.set(id, 1);
	},

	/**
	* Set a switch's state
	* @param {String} id Switch id
	* @param {Number} state On (1) or off (0)
	* @return {Promise<Object>}
	*/
	set: function (id, state) {
		return new Promise(function(resolve, reject) {
			this.getSwitches().then(function (switches) {
				var sw = switches.filter(function (sw) {
					return sw.id === id;
				})[0];
				if (sw) {
					var uri = sw._links.filter(function (link) {
						return link.rel == 'self';
					})[0].href;
					var request = new XMLHttpRequest();
					request.open('PUT', uri, true);
					request.setRequestHeader('Content-Type', 'application/json');
					return new Promise(function(resolve, reject) {
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
							reject('Error connecting to switch API');
						};
						request.send(JSON.stringify({
							state: state
						}));
					});
				} else {
					reject(util.format('No switch with id %s exists', id)); // @todo don't be lazy - switch might have been added to network after we first got list
				}
			}.bind(this), reject);
		}.bind(this));
	}
};

// Export singleton
module.exports = new SwitchClient(config.switchUri);
