var React = require('react');
var Compass = require('../compass/compass');

var Sailing = React.createClass({

	getDisplayName: function () {
		return 'Sailing';
	},

	getInitialState: function () {
		return {
			heading: 0
		};
	},

	render: function () {
		return <div className="sailing">
			<Compass/>
		</div>;
	}
});

module.exports = Sailing;
