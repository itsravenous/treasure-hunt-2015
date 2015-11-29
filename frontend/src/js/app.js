// General dependencies
var React = require('react');
var ReactDOM = require('react-dom');
var config = require('./config');
// Components
var ChapterIntro = require('../components/chapter-intro/chapter-intro');

ReactDOM.render(
	<ChapterIntro image="/img/chapter1.png" chapter="1" title="water, water, everywhere" />,
	document.getElementById('app')
);
