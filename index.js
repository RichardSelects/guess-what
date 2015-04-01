// Setup
var express = require('express'),
	app = express(),
	http = require('http').Server(app),
	io = require('socket.io')(http),
	port = 3000;

// Routes
app.get('/', function(req, res){ res.sendFile(__dirname + '/game.html'); });

// Static folders for public files
['css', 'img', 'js'].forEach(function(dir) {
	app.use('/public/' + dir, express.static(__dirname + '/public/' + dir));
});

// Socket.io

io.on('connection', function(socket) {

	socket.join(roomName(), function() {
		//console.log(socket.rooms);
	});

	socket.on('send question', function(question) {
		io.emit('send question', question);
	});
	socket.on('disconnect', function() {
		console.log('a user disconnected');
	});
});

// Run
http.listen(port, function() {
	console.log('listening on *:' + port);
});

function roomName() {
	var length = 16,
		chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    	result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return "testRoom";
    return result;
}