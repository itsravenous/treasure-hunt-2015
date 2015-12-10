var http = require('http');
var express = require('express');

app = express();

app.use(express.static('frontend/dist'));

app.get('/treasure', function (req, res, next) {
	res.send('treasure!');
});

server = http.createServer(app);
server.listen(8080);
