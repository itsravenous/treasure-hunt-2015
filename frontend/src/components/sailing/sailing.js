var React = require('react');
var Compass = require('../compass/compass');
var Dialogue = require('../dialogue/dialogue');
var ProceedButton = require('../proceed-button/proceed-button');
var Lock = require('../lock/lock');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var STAGE_INTRO = 0;
var STAGE_COMPASS = 1;
var STAGE_LOCK = 2;
var STAGE_EXITING = 3;
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
			stage: STAGE_INTRO
		};
	},

	goNext: function () {
		this.setState({
			stage: STAGE_EXITING
		});
		setTimeout(function () {
			window.location = '#/chapter/2';
		}, 1000);
	},

	render: function () {
		var display = null;
		var key = new Date().getTime();
		switch (this.state.stage) {
			case STAGE_INTRO:
				display = <Dialogue key={key} lines={DIALOGUE} onComplete={this.setState.bind(this, { stage: STAGE_COMPASS })}/>;
			break;
			case STAGE_COMPASS:
				display = <div>
					<Compass key={key}/>
					<ProceedButton onClick={this.setState.bind(this, { stage: STAGE_LOCK })}/>
				</div>;
			break;
			case STAGE_LOCK:
				display = <div>
					<Lock pattern="2 4 8 6" onUnlock={this.goNext}/>
				</div>;
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
