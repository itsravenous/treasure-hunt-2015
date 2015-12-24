var React = require('react');
var Dialogue = require('../dialogue/dialogue');
var ProceedButton = require('../proceed-button/proceed-button');
var Lock = require('../lock/lock');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
// Import PSV here when it supports commonJS loading

var STAGE_INTRO = 0;
var STAGE_BUTTON = 1;
var STAGE_PSV = 2;
var STAGE_LOCK = 3;
var STAGE_EXITING = 4;
var DIALOGUE = [
	'Things are not always as they seem.',
	'Find my magic glasses',
	'and place me inside',
	'to see what can\'t be seen.',
	'Once you know where you must go',
	'touch the looking glass to show the lock.'
];

var MagicGoggles = React.createClass({
	getDisplayName: function () {
		return 'MagicGoggles';
	},

	getInitialState: function () {
		return {
			stage: STAGE_INTRO
		};
	},

	componentDidUpdate: function () {
		if (this.state.stage === STAGE_PSV) {
			this.psv = new PhotoSphereViewer({
					panorama: 'http://tassedecafe.org/wp-content/uploads/2013/01/parc-saint-pierre-amiens.jpg',
					container: this.refs.psv,
					navbar: true,
					navbar_style: {
						backgroundColor: 'rgba(58, 67, 77, 0.7)'
					},
					onready: () => {
						this.psv.toggleStereo();
					}
				});
			} else {
				if (this.psv) delete this.psv;
			}
	},

	handlePsvClick: function () {
		this.setState({
			stage: STAGE_LOCK
		});
	},

	goNext: function () {
		this.setState({
			stage: STAGE_EXITING
		});
		setTimeout(function () {
			window.location = '#/chapter/5';
		}, 1000);
	},

	render: function () {
		var display;
		var dialogue;
		switch (this.state.stage) {
			case STAGE_INTRO:
				dialogue = <Dialogue lines={DIALOGUE} onComplete={this.setState.bind(this, { stage: STAGE_BUTTON })}/>;
			break;
			case STAGE_BUTTON:
				dialogue = <Dialogue lines={DIALOGUE} onComplete={this.setState.bind(this, { stage: STAGE_BUTTON })}/>;
				display = <ProceedButton onClick={this.setState.bind(this, { stage: STAGE_PSV })}/>;
			break;
			case STAGE_PSV:
				display = <div ref="psv" className="psv" onClick={this.handlePsvClick}/>;
			break;
			case STAGE_LOCK:
				display = <Lock pattern="3 4 8 5" onUnlock={this.goNext}/>;
			break;
		}
		return <div ref="root" className="magic-goggles">
			<div>
				{dialogue}
				<ReactCSSTransitionGroup className="transition-root" transitionName="fade" transitionEnterTimeout={1500} transitionLeaveTimeout={1500}>
					{display}
				</ReactCSSTransitionGroup>
			</div>
		</div>;
	}
});

module.exports = MagicGoggles;
