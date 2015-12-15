var React = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var Dialogue = React.createClass({

	getDisplayName: function () {
		return 'Dialogue';
	},

	getInitialState: function () {
		return {
			message: -1,
		};
	},

	getDefaultProps: function () {
		return {
			lines: []
		};
	},

	componentDidMount: function () {
		this.startDialogue();
	},

	startDialogue: function () {
		setTimeout(this.nextDialogue, 100);
		this.interval = setInterval(this.nextDialogue, 6000);
	},

	shouldComponentUpdate: function (nextProps, nextState) {
		// Prevent update if no change in lines (otherwise we get current line anim repeated)
		var identical = true;
		this.props.lines.forEach(function (line, i) {
			if (nextProps.lines[i] !== line) {
				identical = false;
			}
		});
		identical = (identical && this.state.message === nextState.message);
		return !identical;
	},

	nextDialogue: function () {
		var nextMessage = this.props.lines[this.state.message + 1];
		if (nextMessage) {
			this.setState({
				message: this.state.message + 1
			});
		} else {
			clearInterval(this.interval);
			if (typeof this.props.onComplete === 'function') {
				this.props.onComplete();
			}
		}
	},

	render: function () {
		var display = null;
		if (this.state.message > -1) {
			display = <p className="line" key={new Date().getTime()}>{this.props.lines[this.state.message]}</p>;
		}
		return <div className="dialogue">
			<ReactCSSTransitionGroup transitionName="dialogue" transitionEnterTimeout={1500} transitionLeaveTimeout={1500}>
				{display}
			</ReactCSSTransitionGroup>
		</div>;
	}
});

module.exports = Dialogue;
