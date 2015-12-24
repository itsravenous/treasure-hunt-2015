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
var Sailing = require('../components/sailing/sailing');
var MagicGoggles = require('../components/magic-goggles/magic-goggles');
var BigFish = require('../components/big-fish/big-fish');
var Intro = require('../components/intro/intro');

var NoMatch = React.createClass({
	render: function () {
		return <h1>Oops, something is wrong...</h1>;
	}
});

ReactDOM.render((
  <Router>
    <Route path="/" component={Intro} />
		<Route path="/chapter/:chapter" component={ChapterIntro}/>
		<Route path="/prayer" component={Prayer}/>
		<Route path="/sailing" component={Sailing}/>
		<Route path="/big-fish" component={BigFish}/>
		<Route path="/magic-goggles" component={MagicGoggles}/>
		<Route path="*" component={NoMatch}/>
  </Router>
), 	document.getElementById('app'));
