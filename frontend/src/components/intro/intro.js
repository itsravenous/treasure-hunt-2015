var React = require('react');
var Dialogue = require('../dialogue/dialogue');
var ProceedButton = require('../proceed-button/proceed-button');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var HIDDEN = {
	opacity: 0,
	pointerEvents: 'none'
};
var INTRO = 0;
var BUTTON = 1;
var DIALOGUE = [
	'Good evening',
	'My name is',
	'my name is unimportant.',
	'I know who you are, though.',
	'Oh yes.',
	'Now that we\'ve been introduced',
	'I require your help.',
	'Located in this house are some artifacts of great worth',
	'I can guide you to them',
	'but, trapped as I am in this infernal device,',
	'I cannot retrieve them myself.',
	'If you can bring me to them, I will make it worth your while.'
];

var Intro = React.createClass({
	getInitialState: function () {
		return {
			stage: INTRO
		};
	},

	render: function () {
		var buttonStyle = this.state.stage === BUTTON ? {} : HIDDEN;
		button = <ProceedButton to="/chapter/1" style={buttonStyle}/>;
		return <div className="intro">
			<Dialogue lines={DIALOGUE} onComplete={this.setState.bind(this, { stage: BUTTON })}/>
			<ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={1500} transitionLeaveTimeout={1500}>
				{button}
			</ReactCSSTransitionGroup>
		</div>;
	}
});

module.exports = Intro;
