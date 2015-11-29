var React = require('react');

var Toggle = React.createClass({
	stifleLabelClick: function (e) {
		e.stopPropagation();
	},
	render: function() {
		return (
			<div className="toggle">
				<input type="radio" id={this.props.id} name={this.props.name} disabled={this.props.disabled}/>
				<label htmlFor={this.props.id} onClick={this.stifleLabelClick}> {this.props.label} </label>
			</div>
		);
	}
});

module.exports = Toggle;
