var FullTilt = require('../../../bower_components/fulltilt/dist/fulltilt');


var CompassListener = function () {
	// Obtain a new *world-oriented* Full Tilt JS DeviceOrientation Promise
	var promise = FULLTILT.getDeviceOrientation({ 'type': 'world' });

	// Wait for Promise result
	promise.then(function(deviceOrientation) { // Device Orientation Events are supported

		// Register a callback to run every time a new
		// deviceorientation event is fired by the browser.
		deviceOrientation.listen(function() {

			// Get the current *screen-adjusted* device orientation angles
			var currentOrientation = deviceOrientation.getScreenAdjustedEuler();

			// Calculate the current compass heading that the user is 'looking at' (in degrees)
			var compassHeading = 360 - currentOrientation.alpha;

			console.log('listener got', compassHeading);
			this.subscribers.forEach(function (subscriber) {
				subscriber(compassHeading);
			});
		}.bind(this));

	}.bind(this)).catch(function(errorMessage) { // Device Orientation Events are not supported

		console.log(errorMessage);

		// Implement some fallback controls here...

	});
};

CompassListener.prototype = {
	subscribe: function (subscriber) {
		if (!this.subscribers) this.subscribers = [];
		this.subscribers.push(subscriber);
	}
};

module.exports = CompassListener;
