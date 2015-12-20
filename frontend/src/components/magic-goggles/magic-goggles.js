var React = require('react');
// Import PSV here when it supports commonJS loading

var MagicGoggles = React.createClass({
	getDisplayName: function () {
		return 'MagicGoggles';
	},

	componentDidMount: function () {
		var psv = new PhotoSphereViewer({
				panorama: 'http://tassedecafe.org/wp-content/uploads/2013/01/parc-saint-pierre-amiens.jpg',
				container: this.refs.root,
				navbar: true,
				navbar_style: {
					backgroundColor: 'rgba(58, 67, 77, 0.7)'
				},
				onready: function () {
					psv.toggleStereo();
				}
			});
	},

	render: function () {
		return <div ref="root" className="magic-goggles">

		</div>;
	}
});

module.exports = MagicGoggles;
