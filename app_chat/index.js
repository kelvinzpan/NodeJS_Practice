var express = require('express');
var socket = require('socket.io');

// App setup
var app = express();
var server = app.listen(4000, function(){
	console.log('Listening to requests on port 4000.');
});


// Static files
app.use( express.static('public') );

// Socket setup
var io = socket(server);

// Listen for a connection from a browser
io.on('connection', function(socket){
	console.log('Made a socket connection from:', socket.id);

	// Listen for a chat message
	socket.on('chat', function(data){
		// Send message back to all clients
		io.sockets.emit('chat', data);
	});

	// Listen for a user typing
	socket.on('typing', function(data){
		socket.broadcast.emit('typing', data);
	})
});