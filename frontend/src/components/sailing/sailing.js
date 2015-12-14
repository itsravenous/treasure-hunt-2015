var React = require('react');
var Compass = require('../compass/compass');
var Dialogue = require('../dialogue/dialogue');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var INTRO = 0;
var COMPASS = 1;
var DIALOGUE = [
	'A young boy sits in a lifeboat, set adrift.',
	'He is alone, and it is starting to rain.',
	'Soon the fogs will come.',
	'I am reminded of the story',
	'of an aged sailor who shot an albatross',
	'yet I cannot now remember',
	'in which direction he sailed.',
	'Perhaps he will tell you, if you ask.',
];

var Sailing = React.createClass({

	getDisplayName: function () {
		return 'Sailing';
	},

	getInitialState: function () {
		return {
			stage: INTRO
		};
	},

	render: function () {
		var display = null;
		var key = new Date().getTime();
		switch (this.state.stage) {
			case INTRO:
				display = <Dialogue key={key} lines={DIALOGUE} onComplete={this.setState.bind(this, { stage: COMPASS })}/>;
			break;
			case COMPASS:
				display = <Compass key={key}/>;
			break;
		}
		return <div className="sailing">
			<ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={1500} transitionLeaveTimeout={1500}>
				{display}
			</ReactCSSTransitionGroup>
		</div>;
	}
});

module.exports = Sailing;
