var React = require('react');

var ChapterIntro = React.createClass({
	getInitialState: function () {
		return {
			ready: false
		};
	},

	componentDidMount: function() {
		setTimeout(function () {
			this.setState({
				ready: true
			});
		}.bind(this), 100);
	},

	render: function () {
		var bgStyle = {
			backgroundImage: 'url("'+this.props.image+'")'
		};
		return <div data-state={this.state.ready ? 'ready' : 'unready'} className="chapter-intro">
			<div className="bg" style={bgStyle} />
			<h1>
				<span className="number">{this.props.chapter}.</span>
				{this.props.title}
			</h1>
		</div>;
	}
});

module.exports = ChapterIntro;
