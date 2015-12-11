var React = require('react');
var Link = require('react-router').Link;
var ProceedButton = require('../proceed-button/proceed-button');
var chapters = require('../../data/chapters');

var ChapterIntro = React.createClass({

	getInitialState: function () {
		return {
			ready: false
		};
	},

	componentDidUpdate: function(prevProps, prevState) {
		if (prevProps.params.chapter !== this.props.params.chapter) {
			this.reanimate();
		}
	},

	componentDidMount: function() {
		this.reanimate();
	},

	reanimate: function () {
		this.setState({
			ready: false
		});
		setTimeout(function () {
			this.setState({
				ready: true
			});
		}.bind(this), 1000);
	},

	render: function () {
		var chapter = chapters[this.props.params.chapter - 1];
		var bgStyle = {
			backgroundImage: 'url("'+chapter.image+'")'
		};
		var link = chapter.link ? <ProceedButton to={chapter.link}>{chapter.linkText}</ProceedButton> : '';
		return <div data-state={this.state.ready ? 'ready' : 'unready'} className="chapter-intro">
			<div className="bg" style={bgStyle} />
			<h1>
				<span className="number">{chapter.number}.</span>
				{chapter.title}
			</h1>
			{link}
		</div>;
	}
});

module.exports = ChapterIntro;
