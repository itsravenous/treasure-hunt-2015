var React = require('react');
var Dialogue = require('../dialogue/dialogue');
var ProceedButton = require('../proceed-button/proceed-button');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
// Import PSV here when it supports commonJS loading

var STAGE_INTRO = 0;
var STAGE_BUTTON = 1;
var STAGE_PSV = 2;
var DIALOGUE = [
	'As you know, things are not always as they seem.',
	'Sometimes, you need to look',
	'beyond.'
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

	render: function () {
		var display;
		switch (this.state.stage) {
			case STAGE_INTRO:
				display = <Dialogue lines={DIALOGUE} onComplete={this.setState.bind(this, { stage: STAGE_BUTTON })}/>;
			break;
			case STAGE_BUTTON:
			display = <ProceedButton onClick={this.setState.bind(this, { stage: STAGE_PSV })}/>;
			break;
			case STAGE_PSV:
				display = <div ref="psv" className="psv"/>;
			break;
		}
		return <div ref="root" className="magic-goggles">
			<ReactCSSTransitionGroup class="transition-root" transitionName="fade" transitionEnterTimeout={1500} transitionLeaveTimeout={1500}>
				{display}
			</ReactCSSTransitionGroup>
		</div>;
	}
});

module.exports = MagicGoggles;
