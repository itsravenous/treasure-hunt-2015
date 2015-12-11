// General dependencies
var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var config = require('./config');

// Load remote deps
var switchClient = require('./switch-client');
switchClient.getSwitches();

// Components
var ChapterIntro = require('../components/chapter-intro/chapter-intro');
var Prayer = require('../components/prayer/prayer');

var Home = React.createClass({
	render: function () {
		return <div id="home">
			<Link to="/chapter/1">Begin</Link>
			{this.props.children}
		</div>;
	}
});

var NoMatch = React.createClass({
	render: function () {
		return <h1>Oops, something is wrong...</h1>;
	}
});

ReactDOM.render((
  <Router>
    <Route path="/" component={Home} />
		<Route path="/chapter/:chapter" component={ChapterIntro}/>
		<Route path="/prayer" component={Prayer}/>
		<Route path="*" component={NoMatch}/>
  </Router>
), 	document.getElementById('app'));
