var React = require('react');
var CompassListener = require('./compass-listener');

// Create compass listener
var compassListener = new CompassListener();

var Compass = React.createClass({

	getDisplayName: function () {
		return 'Compass';
	},

	getInitialState: function () {
		return {
			heading: 0
		};
	},

	componentDidMount: function () {
		compassListener.subscribe(function (heading) {
			console.log('subscriber got', heading);
			this.setState({
				heading: heading
			});
		}.bind(this));
	},

	render: function () {
		var rot = {
			transform: 'rotate('+(this.state.heading * -1)+'deg)'
		};
		return <div className="compass" style={rot}>
			<div className="north">N</div>
		</div>;
	}
});

module.exports = Compass;
