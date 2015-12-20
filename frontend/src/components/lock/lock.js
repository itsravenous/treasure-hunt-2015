var React = require('react');

var DOT_STYLE = {
	fill: 'transparent',
	stroke: '#b0a080',
	strokeWidth: '1px',
	transition: 'transform 750ms, fill 750ms',
	transformOrigin: '50% 50%',
	transform: 'scale(1) rotate(45deg)'
};
var DOT_STYLE_ACTIVE = {
	fill: '#b0a080',
	transition: 'transform 750ms, fill 750ms',
	transformOrigin: '50% 50%',
	transform: 'scale(2) rotate(135deg)'
};
var LINE_STYLE = {
	stroke: '#b0a080',
	strokeWidth: '1px',
	fill: 'none'
};
var DOT_SIZE = 5;
var HIT_TOLERANCE = 30;

var Lock = React.createClass({
	getDisplayName: function () {
		return 'Lock';
	},

	getInitialState: function () {
		return {
			touching: false
		};
	},

	/**
	 * Determines the dot, if any, in which a point falls
	 * @param  {Number} x
	 * @param  {Number} y
	 * @return {SVGRectElement}
	 */
	getDotFromPoint: function (x, y) {
		var dots = this.refs.root.getElementsByTagName('rect');
		var matchedDot = null;
		Array.from(dots).forEach(function (dot) {
			var rx = dot.x.baseVal.value;
			var ry = dot.y.baseVal.value;
			var rs = DOT_SIZE;
			if (x > rx - HIT_TOLERANCE && x < rx + DOT_SIZE + HIT_TOLERANCE && y > ry - HIT_TOLERANCE && y < ry + DOT_SIZE + HIT_TOLERANCE) {
				matchedDot = dot;
			}
		});

		return matchedDot;
	},

	/**
	 * Determines the centroid of a dot
	 * @param  {SVGRectElement}
	 * @return {Object} with x/y keyed coords
	 */
	getDotCenter: function (dot) {
		var cx = dot.x.baseVal.value + DOT_SIZE / 2;
		var cy = dot.y.baseVal.value + DOT_SIZE / 2;
		return {
			x: cx,
			y: cy
		};
	},

	/**
	 * Handles initial touch on the lock, setting start dot if hit
	 * @param  {Event} e
	 */
	handleStart: function (e) {
		// If touch is on a dot, start path
		var x = e.targetTouches[0].pageX - this.refs.root.offsetLeft;
		var y = e.targetTouches[0].pageY - this.refs.root.offsetTop;
		var dot = this.getDotFromPoint(x, y);
		if (dot) {
			this.setState({
				touching: true,
				touchedDots: [
					dot
				],
				x: x,
				y: y
			});
		}
	},

	/**
	 * Handles touchmove on the lock, adding the dot (if any) at the coords to list
	 * @param  {Event} e
	 */
	handleMove: function (e) {
		// Get coords
		var x = e.targetTouches[0].pageX - this.refs.root.offsetLeft;
		var y = e.targetTouches[0].pageY - this.refs.root.offsetTop;

		// Check for intersection with another, thus far untouched, dot
		var touchedDots = this.state.touchedDots;
		var dot = this.getDotFromPoint(x, y);
		if (dot && this.state.touchedDots.indexOf(dot) === -1) {
			touchedDots.push(dot);
		}

		var newState = {
			x: x,
			y: y
		};
		if (dot) newState.touchedDots = touchedDots;
		this.setState(newState);
	},

	/**
	 * Handles touchend on the lock, resetting it
	 * @param  {Event} e
	 */
	handleEnd: function (e) {
		// Reset path
		this.setState({
			touching: false,
			touchedDots: null
		});
	},

	render: function () {
		var path = null;
		// If drawing, build path definition
		if (this.state.touching && this.state.touchedDots) {
			var lastTouchedDot = this.state.touchedDots[this.state.touchedDots.length - 1];
			var lastTouchedDotC = this.getDotCenter(lastTouchedDot);
			var points = [];
			// SVG path defs are an initial coord followed by a series of translations
			this.state.touchedDots.forEach(function (dot, i) {
				var dotC = this.getDotCenter(dot);
				var x = dotC.x;
				var y = dotC.y;
				if (i > 0) {
					var lastDotC = this.getDotCenter(this.state.touchedDots[i - 1]);
					x -= lastDotC.x;
					y -= lastDotC.y;
				}
				points.push(x + ',' + y);
			}.bind(this));
			// Add current touch coords
			points.push((this.state.x - lastTouchedDotC.x) + ',' + (this.state.y - lastTouchedDotC.y));
			pathDef = 'm ' + points.join(' ');
			path = <path d={pathDef} style={LINE_STYLE} />;
		}

		// Touched dots by ID, for matching below
		var touchedDotsById = this.state.touchedDots ? this.state.touchedDots.map(function (dot) {
			return dot.id;
		}) : [];

		return <div>
			<svg ref="root" onTouchStart={this.handleStart} onTouchMove={this.handleMove} onTouchEnd={this.handleEnd} width="256" height="256" viewBox="0 0 256 256" id="lock" version="1.1">
				<rect width={DOT_SIZE} height={DOT_SIZE} id="dot1" x="28" y="28" style={touchedDotsById.indexOf('dot1') > -1 ? DOT_STYLE_ACTIVE : DOT_STYLE} />
				<rect width={DOT_SIZE} height={DOT_SIZE} id="dot2" x="128" y="28" style={touchedDotsById.indexOf('dot2') > -1 ? DOT_STYLE_ACTIVE : DOT_STYLE} />
				<rect width={DOT_SIZE} height={DOT_SIZE} id="dot3" x="228" y="28" style={touchedDotsById.indexOf('dot3') > -1 ? DOT_STYLE_ACTIVE : DOT_STYLE} />
				<rect width={DOT_SIZE} height={DOT_SIZE} id="dot4" x="28" y="128" style={touchedDotsById.indexOf('dot4') > -1 ? DOT_STYLE_ACTIVE : DOT_STYLE} />
				<rect width={DOT_SIZE} height={DOT_SIZE} id="dot5" x="128" y="128" style={touchedDotsById.indexOf('dot5') > -1 ? DOT_STYLE_ACTIVE : DOT_STYLE} />
				<rect width={DOT_SIZE} height={DOT_SIZE} id="dot6" x="228" y="128" style={touchedDotsById.indexOf('dot6') > -1 ? DOT_STYLE_ACTIVE : DOT_STYLE} />
				<rect width={DOT_SIZE} height={DOT_SIZE} id="dot7" x="28" y="228" style={touchedDotsById.indexOf('dot7') > -1 ? DOT_STYLE_ACTIVE : DOT_STYLE} />
				<rect width={DOT_SIZE} height={DOT_SIZE} id="dot8" x="128" y="228" style={touchedDotsById.indexOf('dot8') > -1 ? DOT_STYLE_ACTIVE : DOT_STYLE} />
				<rect width={DOT_SIZE} height={DOT_SIZE} id="dot9" x="228" y="228" style={touchedDotsById.indexOf('dot9') > -1 ? DOT_STYLE_ACTIVE : DOT_STYLE} />
				{path}
			</svg>
		</div>;
	},
});

module.exports = Lock;
