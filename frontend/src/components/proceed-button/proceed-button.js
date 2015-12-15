var React = require('react');
var Link = require('react-router').Link;

var ProceedButton = React.createClass({
	getDisplayName: function () {
		return 'ProceedButton';
	},
	render: function () {
		return <Link className="proceed-button" to={this.props.to} style={this.props.style}>{this.props.children}</Link>;
	}
});

module.exports = ProceedButton;
