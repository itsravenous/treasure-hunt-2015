var React = require('react');

var ChapterIntro = React.createClass({
	render: function () {
		var bgStyle = {
			backgroundImage: 'url("'+this.props.image+'")'
		};
		return <div className="chapter-intro" style={bgStyle}>
			<h1>
				<span className="number">{this.props.chapter}.</span>
				{this.props.title}
			</h1>
		</div>;
	}
});

module.exports = ChapterIntro;
