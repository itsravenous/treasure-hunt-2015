var React = require('react');
var Link = require('react-router').Link;
var chapters = require('../../data/chapters');
var switchClient = require('../../js/switch-client');

var switches = switchClient.getSwitches();

var Prayer = React.createClass({

	getInitialState: function () {
		return {};
	},

	lightsOut: function () {
		switches.then(function (switches) {
			// Dumbly flick first switch @todo check status first, make switch number configurable
			switchClient.off(switches[0].id);
		}, function (err) {
			console.error(err);
			throw new Error('Failed to get switches from API');
		});
	},

	render: function () {
		return <div className="prayer">
			<h1>True humility requires darkness.</h1>
			<button onClick={this.lightsOut}>Turn out the light</button>
		</div>;
	}
});

module.exports = Prayer;
