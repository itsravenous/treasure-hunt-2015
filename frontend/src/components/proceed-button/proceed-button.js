var React = require('react');
var Link = require('react-router').Link;

var ProceedButton = React.createClass({
	getDisplayName: function () {
		return 'ProceedButton';
	},
	render: function () {
		var onClick = this.props.to ? null : (e) => {
			e.preventDefault();
			if (this.props.onClick) this.props.onClick();
		};
		return <Link onClick={onClick} className="proceed-button" to={this.props.to} style={this.props.style}>{this.props.children}</Link>;
	}
});

module.exports = ProceedButton;
