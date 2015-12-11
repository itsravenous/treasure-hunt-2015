var React = require('react');
var Link = require('react-router').Link;

var ProceedButton = React.createClass({
	getDisplayName: function () {
		return 'ProceedButton';
	},
	render: function () {
		console.log(this.props.to)
		return <Link className="proceed-button" to={this.props.to}>{this.props.children}</Link>;
	}
});

module.exports = ProceedButton;
