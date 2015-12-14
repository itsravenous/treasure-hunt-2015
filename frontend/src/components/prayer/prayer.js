var React = require('react');
var Link = require('react-router').Link;
var Dialogue = require('../dialogue/dialogue');
var chapters = require('../../data/chapters');
var switchClient = require('../../js/switch-client');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var switches = switchClient.getSwitches();
var MESSAGES = [
	[
		'I see that you have come to pray.',
		'You must know:',
		'True humility requires true darkness.',
	],
	[
		'With total darkness comes total clarity.',
		'Seek a lone star',
		'He is waiting for you there'
	]
];
var MESSAGES1 = 0;
var SWITCH_ON = 1;
var SWITCH_OFF = 2;
var MESSAGES2 = 3;

var Prayer = React.createClass({

	getInitialState: function () {
		return {
			stage: MESSAGES1
		};
	},

	lightsOut: function () {
		this.setState({
			stage: SWITCH_OFF
		});
		setTimeout(function () {
			this.setState({
				stage: MESSAGES2
			});
			this.startDialogue();
		}.bind(this), 1500);
		switches.then(function (switches) {
			// Dumbly flick first switch @todo check status first, make switch number configurable
			switchClient.off(switches[0].id);
		}, function (err) {
			console.error(err);
			throw new Error('Failed to get switches from API');
		});
	},

	render: function () {
		var display = null;
		switch(this.state.stage) {
			case SWITCH_ON:
				display = <button onTouchStart={this.lightsOut} className="lightswitch" data-state="on">Turn out the light</button>;
			break;
			case SWITCH_OFF:
				display = <button className="lightswitch" data-state="off">Turn out the light</button>;
			break;
			case MESSAGES1:
				display = <Dialogue key={new Date().getTime()} lines={MESSAGES[0]} onComplete={this.setState.bind(this, { stage: SWITCH_ON })}/>;
			break;
			case MESSAGES2:
				display = <Dialogue key={new Date().getTime()} lines={MESSAGES[1]}/>;
			break;
		}
		return <div className="prayer">
			<ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={1500} transitionLeaveTimeout={1500}>
				{display}
			</ReactCSSTransitionGroup>
		</div>;
	}
});

module.exports = Prayer;
