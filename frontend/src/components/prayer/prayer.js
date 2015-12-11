var React = require('react');
var Link = require('react-router').Link;
var chapters = require('../../data/chapters');
var switchClient = require('../../js/switch-client');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var switches = switchClient.getSwitches();
var MESSAGES = [
	'I see that you have come to pray.',
	'You must know:',
	'True humility requires true darkness.',
	false, // Signifies break for lightswitch
	'With total darkness comes total clarity.',
	'Seek a lone star',
	'He is waiting for you there'
];
var MESSAGES1 = 0;
var SWITCH_ON = 1;
var SWITCH_OFF = 2;
var MESSAGES2 = 3;

var Prayer = React.createClass({

	getInitialState: function () {
		return {
			stage: MESSAGES1,
			message: -1,
		};
	},

	componentDidMount: function () {
		this.startDialogue();
	},

	startDialogue: function () {
		setTimeout(this.nextDialogue, 100);
		this.interval = setInterval(this.nextDialogue, 6000);
	},

	nextDialogue: function () {
		var nextMessage = MESSAGES[this.state.message + 1];
		if (nextMessage) {
			this.setState({
				message: this.state.message + 1
			});
		} else if (this.state.stage !== MESSAGES2) {
			this.setState({
				message: this.state.message + 1
			});
			this.showSwitch();
			clearInterval(this.interval);
		} else {
			clearInterval(this.interval);
		}
	},

	showSwitch: function () {
		this.setState({
			stage: SWITCH_ON
		});
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
		if (this.state.stage === SWITCH_ON) {
			display = <button onClick={this.lightsOut} className="lightswitch" data-state="on">Turn out the light</button>;
		} else if (this.state.stage === SWITCH_OFF){
			display = <button onClick={this.lightsOut} className="lightswitch" data-state="off">Turn out the light</button>;
		} else if (this.state.message > -1 && (this.state.stage === MESSAGES1 || this.state.stage === MESSAGES2)) {
			display = <p className="dialogue" key={new Date().getTime()}>{MESSAGES[this.state.message]}</p>;
		}
		return <div className="prayer">
			<ReactCSSTransitionGroup transitionName="dialogue" transitionEnterTimeout={1500} transitionLeaveTimeout={1500}>
				{display}
			</ReactCSSTransitionGroup>
		</div>;
	}
});

module.exports = Prayer;
