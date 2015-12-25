var config = require('../../js/config');
var React = require('react');
var Dialogue = require('../dialogue/dialogue');
var ProceedButton = require('../proceed-button/proceed-button');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var HIDDEN = {
	opacity: 0,
	pointerEvents: 'none'
};
var STAGE_INTRO = 0;
var STAGE_LOCK = 1;
var STAGE_OUTRO = 2;
var STAGE_BUTTON = 3;
var STAGE_EXITING = 4;
var SHARK_NAME = config.sharkName;
console.log(SHARK_NAME)
var DIALOGUE_INTRO = [
	'Ah, the fish.',
	'Before he was taken',
	'my son would often swim far out to sea.',
	'He used to tell me stories of a fish he often saw',
	'a big fish; too big to describe with his arm span.',
	'I didn\'t believe him, of course',
	'but now, I wonder.',
	'What did he say the fish\'s name was?',
	'No, I can\'t remember.',
	'He drew the picture you hold now - all covered in spots',
	'I heard there was someone who could find a fish\'s name from its spots.',
	'I wonder if they\'re still around?'
];
var DIALOGUE_OUTRO = [
	'That was it: ' + SHARK_NAME + '!',
	SHARK_NAME + ' was the name of someone else, too.',
	'Someone I worked with, a long time ago.',
	'When I retired, he gave me a present',
	'Something that let one see things that can\'t be seen.',
];

var Intro = React.createClass({
	getInitialState: function () {
		return {
			stage: STAGE_INTRO
		};
	},

	handleButtonClick: function () {
		this.setState({
			stage: STAGE_LOCK
		});
	},

	handleInputChange: function () {
		// Check corretc name
		if (this.refs.name.value.toLowerCase() === SHARK_NAME.toLowerCase()) {
			// Blur input
			if (document.activeElement === this.refs.name) {
				document.activeElement = null;
			}
			// Exit
			setTimeout(() => {
				this.setState({
					stage: STAGE_OUTRO
				});
			}, 1000);
		}
	},
	goNext: function () {
		this.setState({
			stage: STAGE_EXITING
		});
	},

	render: function () {
		var dialogue = [];
		var dialogueKey = 'dialogue-intro';
		var dialogueNext = null;
		var display = null;

		switch (this.state.stage) {
			case STAGE_INTRO:
				dialogue = DIALOGUE_INTRO;
				dialogueNext = STAGE_LOCK;
			break;
			case STAGE_OUTRO:
				dialogue = DIALOGUE_OUTRO;
				dialogueKey = 'dialogue-outro';
				dialogueNext = STAGE_BUTTON;
			break;
			case STAGE_LOCK:
				display = <input ref="name" type="text" placeholder="The shark's name is" onKeyUp={this.handleInputChange} onChange={this.handleInputChange}/>;
			break;
			case STAGE_BUTTON:
				dialogue = DIALOGUE_OUTRO;
				dialogueKey = 'dialogue-outro';
				display = <ProceedButton to="/chapter/3"/>;
			break;
		}

		console.log(this.state.stage, display)

		return <div className="big-fish">
			<Dialogue key={dialogueKey} lines={dialogue} onComplete={this.setState.bind(this, { stage: dialogueNext})}/>
			<ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={1500} transitionLeaveTimeout={1500}>
				{display}
			</ReactCSSTransitionGroup>
		</div>;
	}
});

module.exports = Intro;
